import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function DeliveryDashboard() {
  const partnerId = localStorage.getItem("userId");
  const [deliveredCount, setDeliveredCount] = useState(0);

  const links = [
    { label: "Dashboard", path: "/delivery/dashboard" },
    { label: "Pending Deliveries", path: "/delivery/pending" },
    { label: "Delivered Orders", path: "/delivery/delivered" },
    { label: "Logout", path: "/" }
  ];

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/delivery/dashboard/${partnerId}`
      );

      setDeliveredCount(res.data || 0);
    } catch (error) {
      console.error("Dashboard API failed", error);
      setDeliveredCount(0);
    }
  };

  return (
    <div>
      <Navbar links={links} />

      <div className="center-box">
        <h1>Welcome Delivery Partner 🚚</h1>
        <h2>Total Orders Delivered: {deliveredCount}</h2>
      </div>
    </div>
  );
}

export default DeliveryDashboard;