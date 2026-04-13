import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function DeliveredOrders() {
  const partnerId = localStorage.getItem("userId");
  const [orders, setOrders] = useState([]);

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
      `http://localhost:8080/api/delivery/partner/${partnerId}`
    );

    const delivered = res.data.filter(
      (order) => order.status === "DELIVERED"
    );

    setOrders(delivered);
  };

  return (
    <div>
      <Navbar links={links} />

      <h2 className="page-title">Delivered Orders</h2>

      <div className="grid">
        {orders.map((order) => (
          <div className="card" key={order.id}>
            <h3>{order.orderedItems}</h3>
            <p>{order.deliveryAddress}</p>
            <p>₹ {order.totalAmount}</p>
            <p className="delivered-badge">Order Delivered</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeliveredOrders;