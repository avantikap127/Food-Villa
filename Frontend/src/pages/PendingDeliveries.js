import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function PendingDeliveries() {
  const partnerId = localStorage.getItem("userId");
  const [orders, setOrders] = useState([]);
  const [otpInputs, setOtpInputs] = useState({});

  const links = [
    { label: "Dashboard", path: "/delivery/dashboard" },
    { label: "Pending Deliveries", path: "/delivery/pending" },
    { label: "Delivered Orders", path: "/delivery/delivered" },
    { label: "Logout", path: "/" }
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get(
      "http://localhost:8080/api/delivery/pending"
    );
    setOrders(res.data);
  };

  const acceptOrder = async (orderId) => {
    await axios.put(
      `http://localhost:8080/api/delivery/accept/${orderId}/${partnerId}`
    );
    fetchOrders();
  };

  const verifyOtp = async (orderId) => {
    const otp = otpInputs[orderId];

    await axios.put(
      `http://localhost:8080/api/delivery/verify-otp/${orderId}?otp=${otp}`
    );

    alert("Order delivered successfully");
    fetchOrders();
  };

  return (
    <div>
      <Navbar links={links} />

      <h2 className="page-title">Pending Deliveries</h2>

      <div className="grid">
        {orders.map((order) => (
          <div className="card" key={order.id}>
            <h3>{order.orderedItems}</h3>
            <p>{order.deliveryAddress}</p>
            <p>₹ {order.totalAmount}</p>
            <p>{order.paymentMode}</p>
            <p>Status: {order.status}</p>

            {order.status === "PLACED" ? (
              <button className="action-btn" onClick={() => acceptOrder(order.id)}>
                Accept Delivery
              </button>
            ) : (
              <>
  {order.paymentMode === "CASH_ON_DELIVERY" && (
    <p style={{ color: "green", fontWeight: "bold" }}>
      Collect Cash Before OTP Verification 💵
    </p>
  )}

    <input
        placeholder="Enter Customer OTP"
        className="otp-input"
        onChange={(e) =>
        setOtpInputs({
            ...otpInputs,
            [order.id]: e.target.value
        })
        }
    />

    <button
        className="action-btn"
        onClick={() => verifyOtp(order.id)}
    >
        Verify OTP & Deliver
    </button>
    </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PendingDeliveries;