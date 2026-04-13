import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function ManagerRestaurants() {
  const managerId = localStorage.getItem("userId");

  const [restaurants, setRestaurants] = useState([]);
  const [foods, setFoods] = useState({});
  const [foodInputs, setFoodInputs] = useState({});

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    const res = await axios.get(
      `http://localhost:8080/api/manager/restaurants/${managerId}`
    );

    setRestaurants(res.data);

    res.data.forEach((restaurant) => {
      fetchFoods(restaurant.id);
    });
  };

  const fetchFoods = async (restaurantId) => {
    const res = await axios.get(
      `http://localhost:8080/api/manager/foods/${restaurantId}`
    );

    setFoods((prev) => ({
      ...prev,
      [restaurantId]: res.data
    }));
  };

  const handleInputChange = (restaurantId, field, value) => {
    setFoodInputs((prev) => ({
      ...prev,
      [restaurantId]: {
        ...prev[restaurantId],
        [field]: value
      }
    }));
  };

  const addFood = async (restaurantId) => {
    const input = foodInputs[restaurantId];

    const payload = {
      restaurantId: restaurantId,
      foodName: input.foodName,
      availableQuantity: parseInt(input.availableQuantity),
      price: parseFloat(input.price),
      imageUrl: input.imageUrl
    };

    await axios.post("http://localhost:8080/api/manager/foods", payload);

    alert("Food added successfully");

    fetchFoods(restaurantId);

    setFoodInputs((prev) => ({
      ...prev,
      [restaurantId]: {
        foodName: "",
        availableQuantity: "",
        price: "",
        imageUrl: ""
      }
    }));
  };

  const deleteFood = async (restaurantId, foodId) => {
    await axios.delete(
      `http://localhost:8080/api/manager/foods/${foodId}`
    );

    alert("Food deleted");
    fetchFoods(restaurantId);
  };

  const deleteRestaurant = async (restaurantId) => {
    await axios.delete(
      `http://localhost:8080/api/manager/restaurants/${restaurantId}`
    );

    alert("Restaurant deleted successfully");
    fetchRestaurants();
  };

  const links = [
    { label: "Add Restaurant", path: "/manager/add-restaurant" },
    { label: "Restaurants", path: "/manager/restaurants" },
    { label: "Logout", path: "/" }
  ];

  return (
    <div>
      <Navbar links={links} />

      <h2 className="page-title">Your Restaurants</h2>

      <div className="grid">
        {restaurants.map((restaurant) => (
          <div className="card" key={restaurant.id}>
            <h3>{restaurant.name}</h3>
            <p>{restaurant.location}</p>

            <button
              className="action-btn"
              onClick={() => deleteRestaurant(restaurant.id)}
            >
              Delete Restaurant
            </button>

            <div className="food-form">
              <input
                placeholder="Food Name"
                value={foodInputs[restaurant.id]?.foodName || ""}
                onChange={(e) =>
                  handleInputChange(
                    restaurant.id,
                    "foodName",
                    e.target.value
                  )
                }
              />

              <input
                placeholder="Quantity"
                value={foodInputs[restaurant.id]?.availableQuantity || ""}
                onChange={(e) =>
                  handleInputChange(
                    restaurant.id,
                    "availableQuantity",
                    e.target.value
                  )
                }
              />

              <input
                placeholder="Price"
                value={foodInputs[restaurant.id]?.price || ""}
                onChange={(e) =>
                  handleInputChange(
                    restaurant.id,
                    "price",
                    e.target.value
                  )
                }
              />

              <input
                placeholder="Food Image URL"
                value={foodInputs[restaurant.id]?.imageUrl || ""}
                onChange={(e) =>
                  handleInputChange(
                    restaurant.id,
                    "imageUrl",
                    e.target.value
                  )
                }
              />

              <button
                className="action-btn"
                onClick={() => addFood(restaurant.id)}
              >
                Add Food
              </button>
            </div>

            <div className="food-list">
              {(foods[restaurant.id] || []).map((food) => (
                <div className="food-row" key={food.id}>
                  <span>
                    {food.foodName} - ₹{food.price}
                  </span>
                  <button
                    onClick={() =>
                      deleteFood(restaurant.id, food.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManagerRestaurants;