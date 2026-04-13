import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";

function FoodMenu() {
  const { restaurantId } = useParams();
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();
  const customerId = localStorage.getItem("userId");

  useEffect(() => {
    fetchFoods();
  }, [restaurantId]);

  const fetchFoods = async () => {
    const res = await axios.get(
      `http://localhost:8080/api/customer/foods/${restaurantId}`
    );
    setFoods(res.data);
  };

  const addToCart = async (foodId) => {
    await axios.post(
      `http://localhost:8080/api/customer/cart/add?customerId=${customerId}&foodItemId=${foodId}&quantity=1`
    );

    alert("Added to cart");
    fetchFoods();
  };

  return (
    <div>
      <Navbar
        links={[
          { label: "Home", path: "/customer/home" },
          { label: "Cart", path: "/cart" },
          { label: "Order History", path: "/history" },
          { label: "Logout", path: "/" }
        ]}
      />

      <h2 className="page-title">Food Menu</h2>

      <div className="food-grid">
        {foods.map((food) => (
          <div className="food-card" key={food.id}>
            <img
              src={
                food.imageUrl
                  ? food.imageUrl
                  : "https://via.placeholder.com/400x200?text=Food+Image"
              }
              alt={food.foodName}
              className="food-img"
            />

            <h3>{food.foodName}</h3>
            <p>₹ {food.price}</p>
            <p>Available: {food.availableQuantity}</p>

            <button
            className="action-btn"
            onClick={() => addToCart(food.id)}
              disabled={food.availableQuantity === 0}
            >
              {food.availableQuantity === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <button
          className="btn"
          style={{ width: "250px" }}
          onClick={() => navigate("/cart")}
        >
          View Cart
        </button>
      </div>
    </div>
  );
}

export default FoodMenu;