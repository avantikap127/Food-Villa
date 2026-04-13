import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function AddRestaurant() {
  const navigate = useNavigate();
  const managerId = localStorage.getItem("userId");

  const [restaurant, setRestaurant] = useState({
    name: "",
    location: "",
    contactNo: "",
    imageUrl: ""
  });

  const links = [
    { label: "Add Restaurant", path: "/manager/add-restaurant" },
    { label: "Restaurants", path: "/manager/restaurants" },
    { label: "Logout", path: "/" }
  ];

  const addRestaurant = async () => {
    try {
    await axios.post(
    "http://localhost:8080/api/manager/restaurants",
    {
        ...restaurant,
        managerId: managerId
    }
    );

      alert("Restaurant added successfully");
      navigate("/manager/restaurants");
    } catch (error) {
      console.error(error);
      alert("Backend not reachable or API URL mismatch");
    }
  };

  return (
    <div>
      <Navbar links={links} />

      <div className="form-container">
        <h2>Add Restaurant</h2>

        <input
          placeholder="Name"
          onChange={(e) =>
            setRestaurant({ ...restaurant, name: e.target.value })
          }
        />

        <input
          placeholder="Location"
          onChange={(e) =>
            setRestaurant({ ...restaurant, location: e.target.value })
          }
        />

        <input
          placeholder="Contact"
          onChange={(e) =>
            setRestaurant({
              ...restaurant,
              contactNo: e.target.value
            })
          }
        />

        <input
          placeholder="Image URL"
          onChange={(e) =>
            setRestaurant({
              ...restaurant,
              imageUrl: e.target.value
            })
          }
        />

        <button className="action-btn" onClick={addRestaurant}>
          Add Restaurant
        </button>
      </div>
    </div>
  );
}

export default AddRestaurant;