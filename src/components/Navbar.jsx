import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  const numberOfProducts = useSelector((state) => state.cart.totalQuantity);
  return (
    <div className="links">
      <Link to="/" className="link bold">
        e-Shop
      </Link>
      <Link to="/cart" className="link">
        cart {numberOfProducts}
      </Link>
    </div>
  );
};

export default Navbar;
