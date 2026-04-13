import React from "react";
import Navbar from "../components/Navbar";

function ManagerDashboard() {
  const links = [
    { label: "Add Restaurant", path: "/manager/add-restaurant" },
    { label: "Restaurants", path: "/manager/restaurants" },
    { label: "Logout", path: "/" }
  ];

  return (
    <div>
      <Navbar links={links} />
      <div className="center-box">
        <h1 className="title">Welcome Manager</h1>
      </div>
    </div>
  );
}

export default ManagerDashboard;