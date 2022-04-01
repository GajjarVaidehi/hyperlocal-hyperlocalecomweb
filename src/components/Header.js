import React from "react";
import { Link } from "react-router-dom";
import { FaBars, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaCartPlus, FaHeart } from "react-icons/fa";

function Header() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const { wishlistItems } = useSelector((state) => state.wishlistReducer);
  const { user } =
    localStorage.getItem("currentUser") != null
      ? JSON.parse(localStorage.getItem("currentUser"))
      : "";
  const shopkeeper = JSON.parse(localStorage.getItem("currentShopUser"));
  console.log(shopkeeper);
  const logout = () => {
    if (localStorage.getItem("currentUser")) {
      localStorage.removeItem("currentUser");
    }
    if (localStorage.getItem("currentShopUser")) {
      localStorage.removeItem("currentShopUser");
    }
    window.location.reload();
  };

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            HyperLocal Store
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <FaBars size={25} color="white" />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {!shopkeeper && (
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/profile"
                  >
                    <FaUser />
                    {user && user.email.substring(0, user.email.length - 10)}

                  </Link>
                </li>
              )}

              {!user && (
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/shopkeeper/profile"
                  >
                    <FaUser />

                    {shopkeeper && shopkeeper.user.email}
                  </Link>
                </li>
              )}

              {!shopkeeper && (
                <li className="nav-item">
                  <Link className="nav-link" to="/orders">
                    Orders
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={logout}>
                  Logout
                </Link>
              </li>
              {!shopkeeper && (
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    <FaCartPlus /> {cartItems.length}
                  </Link>
                </li>
              )}
              {!shopkeeper && (
                <li className="nav-item">
                  <Link className="nav-link" to="/wishlist">
                    <FaHeart /> {wishlistItems.length}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
