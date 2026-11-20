import { FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./Breadcrumb.css";

export const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="custom-breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="custom-breadcrumb-item">
          {index === 0 ? (
            <Link to={item.link} className="d-inline-flex align-items-center" style={{ gap: "0.25rem" }}>
              <FaAngleLeft size={12} />
              <span>Home</span>
            </Link>
          ) : item.active ? (
            <span className="breadcrumb-active-name">{item.name}</span>
          ) : (
            <Link className="breadcrumb-active-name text-capitalize" to={item.link}>
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};
