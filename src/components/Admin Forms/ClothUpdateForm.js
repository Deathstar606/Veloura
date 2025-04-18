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
    price: '',
    discount: '',
    new: false,
    best: false,
    sizes: [],
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
    setFormData((prev) => {
      const sizes = prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes };
    });
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
    try {
      if (!formData.name) {
        alert("Please enter a clothing name.");
        return;
      }
    
      const imageUploadResults = {};
      const colorList = [];
    
      // 3. Iterate over colors and upload images
      for (const colorBlock of formData.colors) {
        const color = colorBlock.colorCode;
        if (!color) continue;

        colorList.push(color);

        const uploadPromises = colorBlock.images.map((file) =>
          typeof file === "string" ? Promise.resolve(file) : uploadToCloudinary(file, formData.name)
        );

        const uploadedUrls = await Promise.all(uploadPromises);

        // Filter out nulls from failed uploads
        imageUploadResults[color] = uploadedUrls.filter(Boolean);
      }
    
      const payload = {
        category: formData.category,
        name: formData.name,
        new: formData.new,
        best: formData.best,
        images: imageUploadResults,
        color: colorList,
        size: formData.sizes,
        price: parseFloat(formData.price),
        discount: formData.discount ? parseFloat(formData.discount) : null,
      };

      const response = await axios.post("http://localhost:9000/" + "clothes", payload, {
          headers: {
            "Content-Type": "application/json",
          },
      });
      console.log("Success:", response.data);

    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
    }
  };
  

  return (
    <div className="p-3">
      <Button onClick={handleToggle} color="primary" className="mb-3">
        {showForm ? 'Hide Form' : 'Add Clothing Item'}
      </Button>
  
      {showForm && (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Category</Label>
            <ButtonGroup className="mb-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  color={formData.category === cat ? 'primary' : 'secondary'}
                  onClick={() => handleCategorySelect(cat)}
                  active={formData.category === cat}
                >
                  {cat}
                </Button>
              ))}
            </ButtonGroup>
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
  
            <FormGroup check>
                <Label check>
                    <Input
                    type="switch"
                    id="newSwitch"
                    checked={formData.new}
                    onChange={(e) => setFormData({ ...formData, new: e.target.checked })}
                    />
                    New
                </Label>
            </FormGroup>

            <FormGroup check>
            <Label check>
                <Input
                type="switch"
                id="bestSwitch"
                checked={formData.best}
                onChange={(e) => setFormData({ ...formData, best: e.target.checked })}
                />
                Best
            </Label>
            </FormGroup>
  
          <FormGroup>
            <Label>Sizes</Label>
            <ButtonGroup className="mb-2">
              {sizes.map((size) => (
                <Button
                  key={size}
                  color={formData.sizes.includes(size) ? 'primary' : 'secondary'}
                  onClick={() => handleSizeToggle(size)}
                  active={formData.sizes.includes(size)}
                >
                  {size}
                </Button>
              ))}
            </ButtonGroup>
          </FormGroup>
  
          <FormGroup>
            <Label>Colors & Images</Label>
            {formData.colors.map((colorBlock, i) => (
              <div key={i} className="mb-3 border p-2 rounded">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <Input
                    type="text"
                    placeholder="Color code"
                    value={colorBlock.colorCode}
                    onChange={(e) => handleColorChange(i, e.target.value)}
                  />
                  <Button color="danger" onClick={() => removeColorBlock(i)}>✕</Button>
                </div>
  
                {colorBlock.images.map((img, j) => (
                  <div key={j} className="d-flex align-items-center gap-2 mb-1">
                    <Input
                      type="file"
                      onChange={(e) => handleImageChange(i, j, e.target.files[0])}
                    />
                    {colorBlock.images.length > 1 && (
                      <Button color="danger" size="sm" onClick={() => removeImageInput(i, j)}>✕</Button>
                    )}
                  </div>
                ))}
  
                <Button size="sm" color="secondary" onClick={() => addImageInput(i)}>
                  Add More Images
                </Button>
              </div>
            ))}
  
            <Button color="info" onClick={addColorBlock}>Add Color</Button>
          </FormGroup>
  
          <Button type="submit" color="success" className="mt-3">
            Submit
          </Button>
        </Form>
      )}
    </div>
  );  
}
