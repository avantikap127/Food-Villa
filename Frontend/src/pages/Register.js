import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ // default values for form fields that will be sent to backend. useState is a hook in React that allows us to add state to functional components. Here we are initializing the user state with an object that has properties for name, phone, email, password and role. These properties will be updated as the user fills out the registration form. State is used to store data that can change over time and affect the rendering of the component. In this case, we are storing the user input in the state so that we can send it to the backend when the user clicks the register button.
  // user is the current state value, setUser is the function that we can use to update the user state. 
    name: "",
    phone: "",
    email: "",
    password: "",
    role: "SELECT ROLE"
  });

  const handleRegister = async () => {// in this function we will send the user data to backend and handle the response accordingly. If registration is successful, we will navigate to login page, otherwise we will show an alert with the error message.
    try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/register",
      user
    );

    alert(response.data);// response.data is the message sent by backend after registration attempt

    if (response.data === "User registered successfully") {
      navigate("/login");
    }
  } catch (error) {
    alert("Registration failed");
  }
  };
 
  //JSX code for rendering the registration form. We have input fields for name, phone, email, password and a dropdown for role selection. On change of each input field, we update the corresponding property in the user state object. On click of the register button, we call the handleRegister function to attempt registration.
  //JSX - JavaScript XML is used to write HTML code in React.
  return (
    <div className="auth-page">
    <div className="form-container">
      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={(e) => setUser({ ...user, name: e.target.value })}// we are using spread operator to copy the existing properties of user object and then updating the name property with the value from input field. This way we can maintain the state of all properties in user object while updating one property at a time.Purane object ki sari values copy karta hai. sirf name update hota hai.
      />

      <input
        placeholder="Phone"
        onChange={(e) => setUser({ ...user, phone: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <select
        onChange={(e) => setUser({ ...user, role: e.target.value })}
      >
        <option value="CUSTOMER">Customer</option>
        <option value="MANAGER">Manager</option>
        <option value="DELIVERY_PARTNER">Delivery Partner</option>
      </select>

      <button className="btn" onClick={handleRegister}>
        Register
      </button>
    </div>
    </div>
  );
}

export default Register;// it is used to export the Register component so that it can be imported and used in other parts of the application, such as in App.js where we define our routes.