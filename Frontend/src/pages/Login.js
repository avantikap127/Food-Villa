import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:8080/api/auth/login", user);

    localStorage.setItem("userId", res.data.id);// localStorage is a web storage API that allows us to store data in the browser. Here we are storing the userId. This data can be used later to check if the user is logged in and to determine the user's role for authorization purposes. Without saving userId, frontend would not know:kis user ka cart/order fetch karna hai
    localStorage.setItem("role", res.data.role);// we are storing the role of the user in localStorage so that we can use it to determine which dashboard to navigate to after login. For example, if the role is CUSTOMER, we will navigate to the customer

    if (res.data.role === "CUSTOMER") {
      navigate("/customer/home");
    } else if (res.data.role === "MANAGER") {
      navigate("/manager");
    }
        else if (res.data.role === "DELIVERY_PARTNER") {
        navigate("/delivery/dashboard");
        }
  };

  return (
    <div className="auth-page">
    <div className="form-container">
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button className="btn" onClick={handleLogin}>
        Login
      </button>
    </div>
    </div>
  );
}

export default Login;