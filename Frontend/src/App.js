import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerHome from "./pages/CustomerHome";
import FoodMenu from "./pages/FoodMenu";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import OrderHistory from "./pages/OrderHistory";
import ManagerDashboard from "./pages/ManagerDashboard";
import AddRestaurant from "./pages/AddRestaurant";
import ManagerRestaurants from "./pages/ManagerRestaurants";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import PendingDeliveries from "./pages/PendingDeliveries";
import DeliveredOrders from "./pages/DeliveredOrders";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customer/home" element={<CustomerHome />} />
        <Route path="/foods/:restaurantId" element={<FoodMenu />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/history" element={<OrderHistory />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/manager/add-restaurant" element={<AddRestaurant />} />
        <Route path="/manager/restaurants" element={<ManagerRestaurants />} />
        <Route path="/delivery/dashboard" element={<DeliveryDashboard />} />
        <Route path="/delivery/pending" element={<PendingDeliveries />} />
        <Route path="/delivery/delivered" element={<DeliveredOrders />} />
      </Routes>
    </Router>
  );
}

export default App;