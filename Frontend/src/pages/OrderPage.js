import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function OrderPage() {
  const [address, setAddress] = useState("");
  const [paymentMode, setPaymentMode] = useState("COD");
  const customerId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const placeOrder = async () => {
    await axios.post(
      `http://localhost:8080/api/customer/order/place?customerId=${customerId}&address=${address}&paymentMode=${paymentMode}`
    );

    alert("Order placed successfully");
    navigate("/history");
  };

  return (
    <div>
      <Navbar links={[{ label: "Home", path: "/customer/home" }]} />

      <div className="form-container">
        <h2>Place Order</h2>

        <input
          placeholder="Enter address"
          onChange={(e) => setAddress(e.target.value)}
        />

        <select onChange={(e) => setPaymentMode(e.target.value)}>
          <option value="COD">Cash On Delivery</option>
          <option value="ONLINE">Online</option>
        </select>

        <button className="btn" onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default OrderPage;