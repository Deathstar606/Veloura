import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StaggeredText } from "../Animations";

function Success(props) {
  const { tranId } = useParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    props.resetOrders();
  }, []);

  useEffect(() => {
    props.resetOrders();
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
          <StaggeredText text={"Payment Successful"} />
        </h1>
        <p>Transaction Id: {tranId}</p>
        <p>Thank you for your order. Your payment has been processed successfully.</p>
        <p>You will receive a confirmation email shortly.</p>
        <p>If you haven't received an email please check your spam</p>
        <p>Please <strong>DO NOT</strong> close this page and let the redirection complete itself</p>
        <p className="mt-5 text-sm text-gray-500">Redirecting to home in {countdown}...</p>
      </div>
    </div>
  );
}

export default Success;
