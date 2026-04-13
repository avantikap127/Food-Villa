import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const customerId = localStorage.getItem("userId");
  const [cart, setCart] = useState([]);// it is used to store the list of items in the cart fetched from the backend. This state is updated whenever we fetch the cart or make changes to the cart (like increasing/decreasing quantity or deleting an item). The cart state is then used to display the items in the cart and calculate the total price.
  const [foodMap, setFoodMap] = useState({});// it is used to store a mapping of food item IDs to their names. This is necessary because the cart items only contain the food item ID, and we need to display the food name in the cart. We fetch the list of restaurants and their food items from the backend to build this mapping when the component mounts. The foodMap state is then used to display the correct food name for each cart item.
  const navigate = useNavigate();

  const customerLinks = [
    { label: "Home", path: "/customer/home" },
    { label: "Cart", path: "/cart" },
    { label: "Order History", path: "/history" },
    { label: "Logout", path: "/" }
  ];

  useEffect(() => {
    fetchCart();
    fetchFoodNames();
  }, []);

  const fetchCart = async () => {
    const res = await axios.get(
      `http://localhost:8080/api/customer/cart/${customerId}`
    );
    setCart(res.data);
  };

  const fetchFoodNames = async () => {
    const restaurantRes = await axios.get(
      "http://localhost:8080/api/customer/restaurants"
    );

    let map = {};

    for (const restaurant of restaurantRes.data) {
      const foodRes = await axios.get(
        `http://localhost:8080/api/customer/foods/${restaurant.id}`
      );

      foodRes.data.forEach((food) => {
        map[food.id] = food.foodName;
      });
    }

    setFoodMap(map);
  };

  const increaseQuantity = async (cartItemId) => {
    await axios.put(
      `http://localhost:8080/api/customer/cart/increase/${cartItemId}`
    );
    fetchCart();
  };

  const decreaseQuantity = async (cartItemId) => {
    await axios.put(
      `http://localhost:8080/api/customer/cart/decrease/${cartItemId}`
    );
    fetchCart();
  };

  const deleteItem = async (cartItemId) => {
    await axios.delete(
      `http://localhost:8080/api/customer/cart/${cartItemId}`
    );
    fetchCart();
  };

  if (cart.length === 0) {
    return (
      <div>
        <Navbar links={customerLinks} />
        <h2 className="page-title">Your cart is empty 🛒</h2>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <div>
      <Navbar links={customerLinks} />

      <div className="cart-box">
        <h2>Cart</h2>

        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <span>{foodMap[item.foodItemId] || "Loading..."}</span>

            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="qty-box">
                <button
                  className="qty-btn"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </button>

                <div className="qty-value">{item.quantity}</div>

                <button
                  className="qty-btn"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </button>
              </div>

              <button
                className="delete-btn"
                onClick={() => deleteItem(item.id)}
              >
                🗑
              </button>
            </div>

            <span>₹ {item.subtotal}</span>
          </div>
        ))}

        <div className="total">Total: ₹ {total}</div>

        <button
        className="action-btn wide-btn"
        onClick={() => navigate("/order")}
        >
          Proceed to Order
        </button>
      </div>
    </div>
  );
}

export default CartPage;