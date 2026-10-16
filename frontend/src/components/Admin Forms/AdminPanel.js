import React, { useState } from "react";
import { Container, Row, Col, CardImg, Form, FormGroup, Label, Input, Button } from "reactstrap";
import ClothesForm from '../Admin Forms/ClothUpdateForm';
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { baseUrl } from "../../Redux/shared/baseurl";

const BestList = ({ clothes }) => {
  return (
    <>
      <h3 className="pt-4 pb-2" style={{ color: "rgb(255, 153, 0)" }}>Best Deals</h3>
      <Row>
        {clothes.flatMap((category) =>
          category.items
            .filter((item) => item.best)
            .map((item, index) => {
              const firstColorKey = item.images ? Object.keys(item.images)[0] : null;
              const firstImage = firstColorKey ? item.images[firstColorKey]?.[0] : null;

              return (
                <ItemCard
                  key={item._id || index}
                  item={item}
                  image={firstImage}
                  category={category.category}
                />
              );
            })
        )}
      </Row>
    </>
  );
};

const VoucherList = ({ vouchers }) => {
  const [newVoucherName, setNewVoucherName] = useState('');
  const [newVoucherValue, setNewVoucherValue] = useState('');

  const handleDelete = async (name) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${baseUrl}voucher/remove`, { name }, {
        headers: {
          Authorization: `bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Failed to delete voucher:', error);
    }
  };

  const handleAdd = async () => {
    if (!newVoucherName || !newVoucherValue) return;
    const token = localStorage.getItem("token");
    try {
      await axios.post(`${baseUrl}voucher/add`, {
        name: newVoucherName,
        value: newVoucherValue
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNewVoucherName('');
      setNewVoucherValue('');
    } catch (error) {
      console.error('Failed to add voucher:', error);
    }
  };

  return (
    <>
      <Col md={12}>
        {vouchers.map((voucher, idx) => (
          <Col md="4" key={idx} className="mb-4">
            <div className="p-3 border rounded">
              <h5>Name: {voucher.name}</h5>
              <p>Value: {voucher.value}%</p>
              <Button color="danger" onClick={() => handleDelete(voucher.name)}>
                Delete
              </Button>
            </div>
          </Col>
        ))}
      </Col>

      <div className="mt-4 p-4">
        <h5>Add New Voucher</h5>
        <FormGroup className="d-flex flex-column flex-md-row align-items-stretch gap-2 mt-2">
          <Input
            className="mt-2"
            type="text"
            placeholder="Voucher name"
            value={newVoucherName}
            onChange={(e) => setNewVoucherName(e.target.value)}
          />
          <Input
            className="mr-2 mt-2"
            type="number"
            placeholder="Value (%)"
            value={newVoucherValue}
            onChange={(e) => setNewVoucherValue(e.target.value)}
          />
          <div className="butt mt-2" onClick={handleAdd}>
            Add
          </div>
        </FormGroup>
      </div>
    </>
  );
};

const CategoriesList = ({ data }) => {
  const handleDelete = async (category, id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;
  
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${baseUrl}clothes/${category}/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      alert("Selected product has been deleted.");
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
    }
  };  

  const handleBest = async (category, id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${baseUrl}clothes/${category}/${id}/best`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      alert("Best deals edited");
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
    }
  };

  const handleDiscount = async (category, id, discount) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${baseUrl}clothes/${category}/${id}/newdiscount`,
        { newdiscount: discount },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      alert("Discount Edited");
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
    }
  };

  return (
    <Col md={12}>
      {data.map((categoryEntry) => (
        <div key={categoryEntry.category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4 capitalize" style={{ color: "rgb(255, 153, 0)" }}>
            {categoryEntry.category}
          </h2>
          <Row>
            {[...categoryEntry.items]
              .sort((a, b) => b.ordered - a.ordered)
              .map((item, index) => (
                <ItemCard
                  key={index}
                  item={item}
                  category={categoryEntry.category}
                  onDelete={() => handleDelete(categoryEntry.category, item._id)}
                  onBest={() => handleBest(categoryEntry.category, item._id)}
                  onDiscount={(discount) => handleDiscount(categoryEntry.category, item._id, discount)}
                />
              ))}
          </Row>
        </div>
      ))}
    </Col>
  );
};

const ItemCard = ({ item, onDelete, onBest, onDiscount, category }) => {
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [discountValue, setDiscountValue] = useState("");

  const [showStockInput, setShowStockInput] = useState(false);
  const [stockValues, setStockValues] = useState({});

  const firstColorKey = item.images ? Object.keys(item.images)[0] : null;
  const firstImage = firstColorKey && item.images[firstColorKey]?.[0];

  const handleDiscountSubmit = () => {
    const numericValue = parseInt(discountValue);
    if (isNaN(numericValue) || numericValue < 0 || numericValue > 100) {
      alert("Please enter a valid discount between 0 and 100.");
      return;
    }
    onDiscount(numericValue);
    setShowDiscountInput(false);
    setDiscountValue("");
  };

  const handleStockChange = (size, value) => {
    setStockValues(prev => ({
      ...prev,
      [size]: parseInt(value) || 0
    }));
  };

  const handleAddStockSubmit = async () => {
    const validSizes = Object.keys(stockValues).filter(size => stockValues[size] > 0);
    if (validSizes.length === 0) {
      alert("Please enter at least one stock value greater than 0.");
      return;
    }
    await addStock(category, item._id, stockValues);
    setShowStockInput(false);
    setStockValues({});
  };

  const addStock = async (category, id, sizes) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${baseUrl}clothes/${category}/${id}/addstock`,
        { sizes },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      alert("Stock added");
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
    }
  };

  return (
    <Col md={3} xs={6} style={{ border: "1px solid black" }} className="mb-4 pt-2 pb-2 pr-2">
      {firstImage && (
        <div>
          <img
            src={firstImage}
            alt={`${item.name} preview`}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      )}
      <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
      {/* <p><strong>Best:</strong> {item.best ? "Yes" : "No"}</p> */}

      <div className="color-options d-flex mb-3">
        {item.color.map((col, index) => (
          <div
            key={index}
            className="color-box"
            style={{
              backgroundColor: col,
              width: '25px',
              height: '25px',
              marginRight: '10px',
              borderRadius: '50%',
              cursor: 'pointer'
            }}
          />
        ))}
      </div>

      <p><strong>Ordered:</strong> {item.ordered} Times</p>
      <p><strong>Price:</strong> {item.price} TK</p>
      <p><strong>Discount:</strong> {item.discount ? `${item.discount}%` : "No Discount"}</p>

      <div className="mb-2">
        <strong>Stock:</strong>
        <ul style={{ paddingLeft: "20px" }}>
          {item.size && Object.keys(item.size).map((sizeKey, idx) => (
            <li key={idx}>
              {sizeKey}: {item.size[sizeKey]}
            </li>
          ))}
        </ul>
      </div>

      <div className="d-flex flex-wrap mb-2">
        {onDiscount && (
          <Button
            outline
            size="sm"
            color="secondary"
            className="mr-2 mb-2"
            onClick={() => setShowDiscountInput(!showDiscountInput)}
          >
            {showDiscountInput ? "Cancel" : "Add Discount"}
          </Button>
        )}

        <Button
          outline
          size="sm"
          color="secondary"
          className="mr-2 mb-2"
          onClick={() => setShowStockInput(!showStockInput)}
        >
          {showStockInput ? "Cancel" : "Add Stock"}
        </Button>

        {onBest && (
          <Button
            onClick={onBest}
            outline
            size="sm"
            color="secondary"
            className="mr-2 mb-2"
          >
            Best
          </Button>
        )}
      </div>

      {showDiscountInput && (
        <div className="mb-3">
          <input
            type="number"
            min="0"
            max="100"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
            className="form-control mb-2"
            placeholder="Enter discount %"
          />
          <Button size="sm" color="primary" onClick={handleDiscountSubmit}>
            Submit Discount
          </Button>
        </div>
      )}

      {showStockInput && (
        <div className="mb-3">
          {item.size && Object.keys(item.size).map((sizeKey, idx) => (
            <div key={idx} className="mb-2">
              <label>{sizeKey}:</label>
              <input
                type="number"
                min="0"
                value={stockValues[sizeKey] || ""}
                onChange={(e) => handleStockChange(sizeKey, e.target.value)}
                className="form-control"
                placeholder={`Add stock for ${sizeKey}`}
              />
            </div>
          ))}
          <Button size="sm" color="primary" onClick={handleAddStockSubmit}>
            Submit Stock
          </Button>
        </div>
      )}
      {onDelete && (
      <Button onClick={onDelete} outline size="sm" color="danger" className="mt-2">
        Remove
      </Button>
      )}
    </Col>
  );
};

const Orders = ({ order }) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    const toggleDetails = () => {
      setIsExpanded(!isExpanded);
    };

  const deleteOrder = async (transactionId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to perform this action.");
        return;
      }

      const response = await fetch(`${baseUrl}orders/delete/${transactionId}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Order deleted successfully refresh please.");
      } else {
        alert(data.message || "Failed to delete order.");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("An unexpected error occurred.");
    }
  };

  const toggleOrderCompletion = async (transactionId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to perform this action.");
        return;
      }

      const response = await fetch(`${baseUrl}orders/colmplete/${transactionId}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Order completion status updated: ${data.completion ? 'Complete' : 'Incomplete'}`);
        // Optionally reload or update UI state
      } else {
        const errorText = await response.text();
        console.error("Failed to toggle completion:", errorText);
        alert("Failed to toggle order completion.");
      }
    } catch (error) {
      console.error("Error toggling completion:", error);
      alert("An unexpected error occurred.");
    }
  };
  
    const dateFormat = (createdAt) => {
      const dateObj = new Date(createdAt);
  
      const date = dateObj.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
      });
  
      const time = dateObj.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
  
      return `Date: ${date} Time: ${time}`;
    };
  
    return (
      <Col md={12}>
        <div
          onClick={toggleDetails}
          style={{
            marginBottom: "10px",
            cursor: "pointer",
            padding: "10px",
            border: "1px solid black",
          }}
        >
          <p className="text-muted">{dateFormat(order.createdAt)}</p>
          <p><strong>Customer:</strong> {order.firstName} {order.lastName}</p>
          <p><strong>Phone:</strong> {order.phoneNumber}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p>Order Type: {order.order_stat}</p>
          {order.payment_stat && order.order_stat === 'partialcod' ? (
            <p>Delivery charge has been paid</p>
          ) : order.payment_stat ? (
            <p>Order has been paid for</p>
          ) : (
            <p>Order will be paid for after arrival</p>
          )}
          <p>Delivery Charge: {order.delivery}TK</p>
          <div>
            {order.items.map((item, index) => (
              <span key={index}>
                {item.name} x {item.quantity}
                {index < order.items.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
          <h5>Total: {order.total} Tk</h5>
          <div className="d-flex justify-content-end">
            <Button onClick={() => toggleOrderCompletion(order.transaction_id)} outline size="sm" color="secondary" className="mr-2">
                Delivered
            </Button>
            <Button outline size="sm" color="secondary" className="mr-2">
                Donwload Invoice
            </Button>
            <Button onClick={() => deleteOrder(order.transaction_id)} outline size="sm" color="danger">
                Delete
            </Button>
          </div>
        </div>
  
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {order.items.map((item, index) => (
                <Row key={index} style={{ marginTop: "10px", marginBottom: "10px" }}>
                  <Col md={3} className="mx-0">
                    <CardImg
                      src={item.image} // full image path assumed to be in `item.image`
                      alt={item.name}
                    />
                  </Col>
                  <Col md={9} className="d-flex align-items-center">
                    <div>
                      <h5>{item.name} x {item.quantity}</h5>
                      <h5>Price: {item.price * parseInt(item.quantity, 10)} Tk</h5>
                    </div>
                  </Col>
                </Row>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Col>
    );
};

function AdminPanel(props) {
    const [isComplete, setIsComplete] = useState("online");
    const [admin, setAdmin] = useState("orders");
    const [credentials, setCredentials] = useState({ username: "", password: "" });

    const ChangeAdminPanel = (select) => {
        setAdmin(select);
    }

    const handleChangeAdmin = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmitAdmin = (e) => {
        e.preventDefault();
        props.loginUser(credentials);
    };

    const handleClick = (select) => {
        setIsComplete(select)
    }

    const online = props.prodreq.map((order) => {
        if (order.order_stat == "online" && !order.completion) {
          return (
            <Orders order={order}/>
          )
        }
    })

    const pcod = props.prodreq.map((order) => {
        if (order.order_stat == "partialcod" && !order.completion) {
          return (
            <Orders order={order}/>
          )
        }
    })

    const cod = props.prodreq.map((order) => {
        if (order.order_stat == "cod" && !order.completion) {
          return (
            <Orders order={order}/>
          )
        }
    })

  const completed = props.prodreq.map((order) => {
    if (order.completion) {
      return (
          <Orders order={order}/>
        )
      }
    })

    return (
        <>
            {props.auth.isAuthenticated ? (
                <>
                    <Container style={{position: "relative"}} className="p-2">
                        <div 
                            style={{
                                position: "absolute",
                                right: "20px", 
                                display: "flex", 
                                alignItems: "center",
                                gap: "10px" 
                            }}
                        >
                            <div className="mt-1 mr-2">{props.auth.user.username}</div>
                            <div 
                                style={{ cursor: "pointer" }} 
                                className="butt" 
                                onClick={props.logoutUser}
                            >
                                Logout
                            </div>
                        </div>
                    </Container>
                    <Container className="mt-4 pt-4">
                      <Row>
                          {/* Left Sidebar - Two Custom Buttons */}
                          <Col md={3} xs={12} className="mb-3">
                              <div className="d-flex justify-content-center mt-3">
                                <button
                                  className="mb-2 butt"
                                  style={{ backgroundColor: admin === 'orders' ? 'orange' : '' }}
                                  onClick={() => ChangeAdminPanel('orders')}
                                >
                                  Orders
                                </button>
                                <button
                                  className="mb-2 butt"
                                  style={{ backgroundColor: admin === 'inventory' ? 'orange' : '' }}
                                  onClick={() => ChangeAdminPanel('inventory')}
                                >
                                  Inventory
                                </button>
                                <button
                                  className="mb-2 butt"
                                  style={{ backgroundColor: admin === 'vouchers' ? 'orange' : '' }}
                                  onClick={() => ChangeAdminPanel('vouchers')}
                                >
                                  Vouchers
                                </button>
                              </div>
                          </Col>

                          {/* Main Content Area */}
                          <Col md={9}>
                            {admin === 'orders' && (
                              <>
                                <div className="d-flex pt-3 pb-3">
                                  <div
                                    className="mr-3 butt"
                                    style={{ backgroundColor: isComplete === 'online' ? 'orange' : '' }}
                                    onClick={() => handleClick('online')}
                                  >
                                    Online
                                  </div>
                                  <button
                                    className="mr-3 butt"
                                    style={{ backgroundColor: isComplete === 'cod' ? 'orange' : '' }}
                                    onClick={() => handleClick('cod')}
                                  >
                                    Cash on Delivery
                                  </button>
                                  <button
                                    className="mr-3"
                                    style={{ backgroundColor: isComplete === 'partialcod' ? 'orange' : '' }}
                                    onClick={() => handleClick('partialcod')}
                                  >
                                    Partial COD
                                  </button>
                                  <button
                                    className="mr-3"
                                    style={{ backgroundColor: isComplete === 'complete' ? 'orange' : '' }}
                                    onClick={() => handleClick('complete')}
                                  >
                                    Completed
                                  </button>
                                </div>
                                <Row>
                                  {isComplete === 'online'
                                    ? online
                                    : isComplete === 'partialcod'
                                    ? pcod
                                    : isComplete === 'cod'
                                    ? cod
                                    : isComplete === 'complete'
                                    ? completed
                                    : null}
                                </Row>
                              </>
                            )}

                            {admin === 'inventory' &&
                              <Row>
                                <Col md={12}>
                                  <ClothesForm
                                    category={[...new Set(props.clothes.map(item => item.category))]}
                                  />
                                </Col>
                                <BestList clothes={props.clothes} />
                                <CategoriesList data={props.clothes} />
                              </Row>                             
                            }
                            {admin === 'vouchers' &&
                              <Row>
                                <VoucherList vouchers={props.vouchers}/>
                              </Row>                             
                            }
                          </Col>
                      </Row>
                    </Container>             
                </>
            ) : (
                <Container className="p-4">
                    <Form onSubmit={handleSubmitAdmin} className="p-4 border rounded shadow">
                        <h2 className="mb-4 text-center">Admin Login</h2>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input
                                type="text"
                                name="username"
                                id="username"
                                value={credentials.username}
                                onChange={handleChangeAdmin}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                value={credentials.password}
                                onChange={handleChangeAdmin}
                                required
                            />
                        </FormGroup>
                        <Button className="butt" type="submit">
                            Login
                        </Button>
                    </Form>
                </Container>
            )}
        </>
    );
}

export default AdminPanel;
