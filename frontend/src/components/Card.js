import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import MediaQuery from "react-responsive";
import "./card.css";

export const Product = ({ category, child }) => {
    const [defCol, setDefCol] = useState(child.color[0]);
    const dem1 = child.images[defCol][0];
    const dem2 = child.images[defCol][1];
    const [imgSrc, setImgSrc] = useState("");

    useEffect(() => {
        setImgSrc(dem1);
    }, [defCol]);

    const changeCol = (col) => {
        setDefCol(col);
    };

    const discountedPrice = child.discount ? 
        (child.price - (child.price * (child.discount / 100))).toFixed(2) : 
        null;

    return (
        <div className="d-flex flex-column h-100">
            {/* Image section stays in curd */}
            <div className="curd">
                {child.discount && (
                    <span 
                        className="badge bg-danger position-absolute" 
                        style={{ top: '15px', right: '22px', zIndex: 2, scale: "1.2" }}
                    >
                        {child.discount}% OFF
                    </span>
                )}
                <Link to={`/home/${category}/${child._id}`}>
                    <div className="pro-img-container">
                        <div>
                            <img className="pro-img primary" src={dem1} alt={child.name} />
                            <img className="pro-img secondary" src={dem2} alt={child.name} />
                        </div>
                        <MediaQuery minWidth={640}>
                            <div className="pro-img-butt">
                                <div style={{ display: "inline-block" }} className="butt">Details</div>
                            </div>
                        </MediaQuery>
                    </div>            
                </Link>
            </div>

            {/* Content + mobile button section */}
            <div className="p-2 pt-2 d-flex flex-column text-center flex-grow-1">
                <div>
                    <h5
                        className="mb-3 mt-2"
                        style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                    >
                        {child.name}
                    </h5>

                    <div className="color-options d-flex justify-content-center mb-2">
                        {child.color.map((col, index) => (
                            <div
                                key={index}
                                className="color-box"
                                style={{
                                    backgroundColor: col,
                                    width: '23px',
                                    height: '23px',
                                    marginRight: '12px',
                                    marginBottom: "5px",
                                    borderRadius: '50%',
                                    cursor: 'pointer'
                                }}
                                onClick={() => changeCol(col)}
                            />
                        ))}
                    </div>

                    <div className="d-flex justify-content-center align-items-center">
                        {child.discount ? (
                            <>
                                <span className="text-muted me-2 mr-2" style={{ textDecoration: 'line-through', whiteSpace: 'nowrap' }}>
                                    {child.price} TK
                                </span>
                                <span className="text-danger fw-bold" style={{ whiteSpace: 'nowrap' }}>
                                    {discountedPrice} TK
                                </span>
                            </>
                        ) : (
                            <div>
                                <span className="fw-bold">{child.price} TK</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile-only button at bottom */}
                <MediaQuery maxWidth={639}>
                    <Link to={`/home/${category}/${child._id}`} className="mt-auto">
                        <div style={{ display: "inline-block" }} className="butt mt-3">Details</div>
                    </Link>
                </MediaQuery>
            </div>
        </div>
    );
};