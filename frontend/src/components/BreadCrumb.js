import { FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./Breadcrumb.css"

export const Breadcrumb = ({ items }) => {
    return (
        <div className="custom-breadcrumb ml-1">
            {items.map((item, index) => (
                <div key={index} className="custom-breadcrumb-item">
                    {index === 0 ? (
                        <Link to={item.link}>
                            <span className="breadcrumb-active-name"><FaAngleLeft color='rgb(0, 0, 0)' />Home</span>
                        </Link>
                    ) : item.active ? (
                        <span className="ml-3 breadcrumb-active-name">{item.name}</span>
                    ) : (
                        <Link className="ml-3 breadcrumb-active-name" to={item.link}>{item.name}</Link>
                    )}
                </div>
            ))}
        </div>
    );
};