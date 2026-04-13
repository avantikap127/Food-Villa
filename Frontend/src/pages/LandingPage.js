import React from "react";
import Navbar from "../components/Navbar";

function Home() {
  const links = [
    { label: "Home", path: "/" },
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" }
  ];

  return (
    <div>
      <Navbar links={links} />

      <div className="hero-section">
        <img
          src="https://cdn-icons-png.flaticon.com/512/5787/5787016.png"
          alt="Burger"
          className="floating-food burger"
        />

        <img
          src="https://cdn-icons-png.flaticon.com/512/3132/3132693.png"
          alt="Pizza"
          className="floating-food pizza"
        />

        <img
          src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
          alt="Momos"
          className="floating-food momos"
        />

        <div className="hero-content">
          <h1>Delicious moments, delivered faster</h1>
          <p>
            From your favorite restaurants to your doorstep —
            hot, fresh, and just a click away.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;