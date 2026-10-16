import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StaggeredText } from "../Animations";

function Fail() {
  const { tranId } = useParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          navigate("/home", { state: { scrollTo: "deal" } });
        }
        return prev - 1;
      });
    }, 1500);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center vh-100">
      <div className="text-center" style={{ marginTop: "20vh" }}>
        <h1 className="pb-2">
          <StaggeredText text={"Payment Failed"} />
        </h1>
        <p>Transaction Id: {tranId}</p>
        <p className="mt-5 text-sm text-gray-500">Redirecting to home in {countdown}...</p>
      </div>
    </div>
  );
}

export default Fail;
