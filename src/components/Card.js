import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { baseUrl } from "../Redux/shared/baseurl";
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
        <>
            <div className="curd">
                    <div className="pro-img-container">
                        <div>
                            <img className="pro-img primary" src={dem1} alt={child.name} />
                            <img className="pro-img secondary" src={dem2} alt={child.name} />
                        </div>
                        <MediaQuery minWidth={640}>
                            <Link to={`/home/${category}/${child._id}`}>
                                <div className="pro-img-butt">
                                    <div style={{display: "inline-block"}} className="butt">Details</div>
                                </div>
                            </Link>
                        </MediaQuery>
                    </div>
            </div>
            <div className="p-2 pt-2 d-flex justify-content-center text-center">
                <div>
  
                    <h5 style={{whiteSpace: 'nowrap'}} className="mb-2">{child.name}</h5>

                    <div className="color-options d-flex justify-content-center mb-3">
                    {child.color.map((col, index) => (
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
                        onClick={() => changeCol(col)}
                        />
                    ))}
                    </div>

                    <div className="d-flex justify-content-center align-items-center">
                    {child.discount ? (
                        <>
                            <span className="text-muted me-2 mr-2" style={{ textDecoration: 'line-through', whiteSpace: 'nowrap' }}>
                            {child.price}&nbsp;Tk
                            </span>
                            <span className="text-danger fw-bold me-2 mr-2" style={{ whiteSpace: 'nowrap' }}>
                            {discountedPrice}&nbsp;Tk
                            </span>
                            <span className="badge bg-danger">{child.discount}% OFF</span>
                        </>
                    ) : (
                        <div>
                            <span className="fw-bold">{child.price} Tk</span>
                        </div>
                        
                    )}
                    </div>
                        <MediaQuery maxWidth={639}>
                            <Link to={`/home/${category}/${child._id}`}>
                                <div style={{display: "inline-block"}} className="butt mt-3">Details</div>
                            </Link>
                        </MediaQuery>
                </div>
            </div>
        </>
    );
};