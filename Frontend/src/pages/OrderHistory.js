import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function OrderHistory() {
  const customerId = localStorage.getItem("userId");
  const [orders, setOrders] = useState([]);

  const customerLinks = [
    { label: "Home", path: "/customer/home" },
    { label: "Cart", path: "/cart" },
    { label: "Order History", path: "/history" },
    { label: "Logout", path: "/" }
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get(
      `http://localhost:8080/api/customer/orders/${customerId}`
    );
    setOrders(res.data);
  };

  return (
    <div>
      <Navbar links={customerLinks} />

      <h2 className="page-title">Order History</h2>

      <div className="grid">
        {orders.map((order) => (
          <div className="card" key={order.id}>
            <h3>Ordered Items</h3>
            <p>{order.orderedItems}</p>

            <h4 style={{ marginTop: "10px" }}>Order Address</h4>
            <p>{order.deliveryAddress}</p>

            <p style={{ marginTop: "10px" }}>
              Total: ₹ {order.totalAmount}
            </p>

            {order.status !== "DELIVERED" && (
              <div className="otp-box">
                Delivery OTP: <strong>{order.otp}</strong>
                <p>
                  Share this OTP with delivery partner at delivery time.
                </p>
              </div>
            )}

            <div className="tracking-bar">
              <div
                className={`step ${
                  ["PLACED", "OUT_FOR_DELIVERY", "DELIVERED"].includes(
                    order.status
                  )
                    ? "active"
                    : ""
                }`}
              >
                PLACED
              </div>

              <div
                className={`step ${
                  ["OUT_FOR_DELIVERY", "DELIVERED"].includes(
                    order.status
                  )
                    ? "active"
                    : ""
                }`}
              >
                OUT FOR DELIVERY
              </div>

              <div
                className={`step ${
                  order.status === "DELIVERED" ? "active" : ""
                }`}
              >
                DELIVERED
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;