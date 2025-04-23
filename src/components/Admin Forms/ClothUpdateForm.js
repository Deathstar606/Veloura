import React, { useState } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    ButtonGroup
  } from 'reactstrap';
import axios from 'axios';

const categories = ['shirt', 'polo'];
const sizes = ['XS', 'S', 'M', 'L', 'XL'];

const uploadToCloudinary = async (file, clothName) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "veloura_up"); // Your Cloudinary unsigned upload preset
  formData.append("folder", `veloura_clothes/${clothName}`);

  try {
    const response = await fetch("https://api.cloudinary.com/v1_1/dmrazifyy/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.secure_url) {
      return data.secure_url; // Return Cloudinary URL
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};

export default function ClothesForm() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    description: '',
    price: '',
    discount: '',
    sizes: {},
    colors: [
      {
        colorCode: '',
        images: ['']
      }
    ]
  });

  const handleToggle = () => setShowForm(!showForm);

  const handleCategorySelect = (category) => {
    setFormData((prev) => ({ ...prev, category }));
  };

  const handleSizeToggle = (size) => {
    const updatedSizes = { ...formData.sizes };
    if (updatedSizes[size]) {
      delete updatedSizes[size];
    } else {
      updatedSizes[size] = 1; // Default quantity
    }
    setFormData({ ...formData, sizes: updatedSizes });
  };

  const handleSizeQuantityChange = (size, quantity) => {
    if (!Number.isNaN(quantity) && quantity > 0) {
      setFormData({
        ...formData,
        sizes: { ...formData.sizes, [size]: quantity }
      });
    }
  };

  const handleColorChange = (index, value) => {
    const updated = [...formData.colors];
    updated[index].colorCode = value;
    setFormData({ ...formData, colors: updated });
  };

  const handleImageChange = (colorIndex, imageIndex, file) => {
    const updated = [...formData.colors];
    updated[colorIndex].images[imageIndex] = file;
    setFormData({ ...formData, colors: updated });
  };

  const addColorBlock = () => {
    setFormData({
      ...formData,
      colors: [...formData.colors, { colorCode: '', images: [''] }]
    });
  };

  const removeColorBlock = (index) => {
    const updated = [...formData.colors];
    updated.splice(index, 1);
    setFormData({ ...formData, colors: updated });
  };

  const addImageInput = (colorIndex) => {
    const updated = [...formData.colors];
    updated[colorIndex].images.push('');
    setFormData({ ...formData, colors: updated });
  };

  const removeImageInput = (colorIndex, imageIndex) => {
    const updated = [...formData.colors];
    updated[colorIndex].images.splice(imageIndex, 1);
    setFormData({ ...formData, colors: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validateForm = () => {
      if (!formData.name?.trim()) return "Please enter a clothing name.";
      if (formData.description == "") return "Please add some description.";
      if (!formData.category?.trim()) return "Please select or enter a category.";
      if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
        return "Please enter a valid price greater than 0.";
      }
      if (typeof formData.sizes !== 'object' || Object.keys(formData.sizes).length === 0) {
        return "Please select at least one size and quantity.";
      }
      return null;
    };
  
    const errorMessage = validateForm();
    if (errorMessage) {
      alert(errorMessage);
      return;
    }
  
    try {
      const imageUploadResults = {};
      const colorList = [];
  
      for (const colorBlock of formData.colors) {
        const color = colorBlock.colorCode;
        if (!color) continue;
  
        colorList.push(color);
  
        const uploadPromises = colorBlock.images.map((file) =>
          typeof file === "string" ? Promise.resolve(file) : uploadToCloudinary(file, formData.name)
        );
  
        const uploadedUrls = await Promise.all(uploadPromises);
        const validImages = uploadedUrls.filter(Boolean);
  
        if (validImages.length > 0) {
          imageUploadResults[color] = validImages;
        }
      }

      if (Object.keys(imageUploadResults).length === 0) {
        alert("Please upload at least one image.");
        return;
      }
  
      const payload = {
        category: formData.category,
        items: [
          {
            name: formData.name,
            description: formData.description || "",
            best: formData.best || false,
            images: imageUploadResults,
            color: colorList,
            size: formData.sizes,
            price: parseFloat(formData.price),
            discount: formData.discount ? parseFloat(formData.discount) : null,
          }
        ]
      };
      console.log("Payload to be sent:", payload);
      const token = localStorage.getItem("token");

      const response = await axios.post("http://localhost:9000/clothes", payload, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
    }
  };  
  
  return (
    <div className="p-3">
      <div onClick={handleToggle} className="mb-3 butt" style={{display: 'inline-block', cursor: 'pointer'}}>
        {showForm ? 'Hide Form' : 'Add Clothing Item'}
      </div>
  
      {showForm && (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label className='mr-2'>Category</Label>
            <ButtonGroup className="mb-2">
              {categories.map((cat) => (
                <div
                  key={cat}
                  className='butt'
                  style={{ backgroundColor: formData.category === cat ? 'orange' : '' }}
                  onClick={() => handleCategorySelect(cat)}
                  active={formData.category === cat}
                >
                  {cat}
                </div>
              ))}
            </ButtonGroup>

            <div className='mt-2'>
              <Label className='mr-2'>Selected category existing or new</Label>
              <input
                type='text'
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder='New category'
              />
            </div>
          </FormGroup>
  
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="description">Description</Label>
            <Input 
              style={{height: "100px"}} 
              type="textarea" 
              name="description" 
              id="description" 
              value={formData.description} 
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </FormGroup>          
  
          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </FormGroup>
  
          <FormGroup>
            <Label for="discount">Discount</Label>
            <Input
              id="discount"
              type="number"
              value={formData.discount}
              onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
            />
          </FormGroup>
  
          <FormGroup className='pt-3'>
            <Label className='mr-2'>Sizes & Quantities</Label>
            <ButtonGroup className="mb-2">
              {sizes.map((size) => (
                <Button
                  key={size}
                  outline
                  color={formData.sizes[size] ? 'primary' : 'secondary'}
                  onClick={() => handleSizeToggle(size)}
                  active={!!formData.sizes[size]}
                >
                  {size}
                </Button>
              ))}
            </ButtonGroup>

            {Object.entries(formData.sizes).map(([size, quantity]) => (
              <div key={size} className="d-flex align-items-center gap-2 mb-2">
                <span className='mr-2'>{size.toUpperCase()}</span>
                <Input
                  type="number"
                  value={quantity}
                  min={1}
                  onChange={(e) => handleSizeQuantityChange(size, parseInt(e.target.value))}
                  style={{ width: "80px", marginRight: "5px" }}
                />
                <Button size="sm" outline color="secondary" onClick={() => handleSizeToggle(size)}>✕</Button>
              </div>
            ))}
          </FormGroup>
  
          <FormGroup>
            <Label className='mr-2'>Colors & Images</Label>
            {formData.colors.map((colorBlock, i) => (
              <div key={i} className="mb-3 border p-2 rounded">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <Input
                    type="text"
                    placeholder="Color code"
                    value={colorBlock.colorCode}
                    onChange={(e) => handleColorChange(i, e.target.value)}
                  />
                  <Button className='ml-2' outline onClick={() => removeColorBlock(i)}>✕</Button>
                </div>
  
                {colorBlock.images.map((img, j) => (
                  <div key={j} className="d-flex align-items-center gap-2 mb-1">
                    <Input
                      type="file"
                      onChange={(e) => handleImageChange(i, j, e.target.files[0])}
                    />
                    {colorBlock.images.length > 1 && (
                      <Button className='ml-2' outline size="sm" onClick={() => removeImageInput(i, j)}>✕</Button>
                    )}
                  </div>
                ))}
  
                <Button className='mt-2' outline size="sm" color="secondary" onClick={() => addImageInput(i)}>
                  Add More Images
                </Button>
              </div>
            ))}
  
            <Button outline color='secondary' onClick={addColorBlock}>Add Color</Button>
          </FormGroup>
  
          <div onClick={handleSubmit} className="butt" style={{display: 'inline-block', cursor: 'pointer'}}>
            Submit
          </div>
        </Form>
      )}
    </div>
  );  
}
