import React, { useState } from 'react';
import { Col, CardImg } from "reactstrap";
import { Link } from "react-router-dom";

const Catlist = ({ child }) => {
  const [shirtColor, setShirtColor] = useState(child.colors[0]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleShirtColorChange = (color) => {
    setShirtColor(color);
    setSelectedColor(selectedColor === color ? null : color);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const colors = child.colors.map((color) => {
    const isSelected = color === selectedColor;
    const opacity = isSelected ? 0.5 : 1;

    return (
      <div
        className="rounded-circle mx-1 color-circle"
        onClick={() => handleShirtColorChange(color)}
        style={{
          width: '30px',
          height: '30px',
          backgroundColor: color,
          opacity,
        }}
      />
    );
  });

  return (
    <Col md={3}>
      <Link to={`/${child._id}`}>
        <div className="cat-img-container">
          <CardImg
            src={
              isHovered
                ? child.images[shirtColor][1]
                : child.images[shirtColor][0]
            }
            style={{ borderRadius: "15px" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <div className="heart-icon">
            <i className="fa fa-heart-o" aria-hidden="true"></i>
          </div>
        </div>
      </Link>
      <div className="pl-1 pr-1 pt-2 d-flex justify-content-between align-items-start">
        <div>
          <h5>{child.name}</h5>
          <h6 className="text-muted">{child.price} $</h6>
        </div>
        <div className="d-flex">{colors}</div>
      </div>
    </Col>
  );
};

export default Catlist;