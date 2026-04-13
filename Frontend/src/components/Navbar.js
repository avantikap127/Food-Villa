import React from "react";
import { Link } from "react-router-dom";

function Navbar({ links }) {
  return (
    <div className="navbar">
      {links.map((link, index) => (
        <Link key={index} to={link.path}>
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export default Navbar;