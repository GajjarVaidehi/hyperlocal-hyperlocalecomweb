import "./App.css";
import HomePage from "./pages/HomePage";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPassword from "./pages/ForgotPassword";
import ProfilePage from "./pages/ProfilePage";
import ProductInfo from "./pages/ProductInfo";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import FirstPage from "./pages/FirstPage";
import PaymentPage from "./pages/PaymentPage";
import ShopInfo from "./pages/ShopInfo";
import AdminLoginPage from "./pages/AdminLoginPage";

import ShopkeeperLoginPage from "./pages/ShopkeeperLoginPage";
import ShopkeeperRegisterPage from "./pages/ShopkeeperRegisterPage";
import ShopkeeperProfilePage from "./pages/ShopkeeperProfilePage";

import "./stylesheets/layout.css";
import "./stylesheets/products.css";
import "./stylesheets/authentication.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrdersPage from "./pages/OrdersPage";
import AdminPage from "./pages/AdminPage";
import ShopkeeperPage from "./pages/ShopkeeperPage";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/login" exact element={<LoginPage />} />
          <Route path="/first" exact element={<FirstPage />} />
          <Route path="/register" exact element={<RegisterPage />} />
          <Route path="/forgot-password" exact element={<ForgotPassword />} />
          /////CUSTOMER
          <Route
            path="/"
            exact
            element={
              <ProtectedRoutes>
                <HomePage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/profile"
            exact
            element={
              <ProtectedRoutes>
                <ProfilePage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/productinfo/:productid"
            exact
            element={
              <ProtectedRoutes>
                <ProductInfo />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/cart"
            exact
            element={
              <ProtectedRoutes>
                <CartPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/orders"
            exact
            element={
              <ProtectedRoutes>
                <OrdersPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/wishlist"
            exact
            element={
              <ProtectedRoutes>
                <WishlistPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/payment"
            exact
            element={
              <ProtectedRoutes>
                <PaymentPage />
              </ProtectedRoutes>
            }
          />
          //// ADMIN
          <Route
            path="/admin"
            exact
            element={
              <ProtectedAdminRoutes>
                <AdminPage />
              </ProtectedAdminRoutes>
            }
          />
          <Route path="/adminlogin" exact element={<AdminLoginPage />} />
          ////SHOPKEEPER
          <Route path="/shopkeeper" exact element={<ShopkeeperPage />} />
          <Route
            path="/shopkeeper/profile"
            exact
            element={<ShopkeeperProfilePage />}
          />
          <Route
            path="/shopkeeper/forgot-password"
            exact
            element={<ForgotPassword />}
          />
          <Route
            path="/shopkeeper/register"
            exact
            element={<ShopkeeperRegisterPage />}
          />
          <Route
            path="/shopkeeper/login"
            exact
            element={<ShopkeeperLoginPage />}
          />
          <Route
            path="/shopinfo/:shopkeeperid"
            exact
            element={
              <ProtectedRoutes>
                <ShopInfo />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem("currentUser")) {
    return children;
  } else {
    return <Navigate to="/first" />;
  }
};
export const ProtectedShopkeeperRoutes = ({ children }) => {
  if (localStorage.getItem("currentShopUser")) {
    return children;
  } else {
    return <Navigate to="/first" />;
  }
};

export const ProtectedAdminRoutes = ({ children }) => {
  if (localStorage.getItem("currentAdmin")) {
    return children;
  } else {
    return <Navigate to="/first" />;
  }
};
