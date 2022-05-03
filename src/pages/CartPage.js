import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiMinus, BiPlus } from "react-icons/bi";
import { Modal, Button } from "react-bootstrap";
import "react-bootstrap";

import { addDoc, collection } from "firebase/firestore";
import ProductInfo from "./ProductInfo";
import fireDB from "../fireConfig";
import { toast } from "react-toastify";

function CartPage() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [qty, setQty] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [loading, setLoading] = useState(false);

  const [pincode, setPincode] = useState("");
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItems) => {
      temp = temp + parseInt(cartItems.price);
    });
    setTotalAmount(temp);
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  const deleteFromCart = (product) => {
    dispatch({ type: "DELETE_FROM_CART", payload: product });
  };

  const placeOrder = async () => {
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNo,
    };

    console.log(addressInfo);
    const orderInfo = {
      cartItems,
      addressInfo,
      email: JSON.parse(localStorage.getItem("currentUser")).user.email,
      userid: JSON.parse(localStorage.getItem("currentUser")).user.uid,
      ownerIds: cartItems.map((item) => item.ownerId),
    };
    try {
      setLoading(true);
      const result = await addDoc(collection(fireDB, "orders"), orderInfo);
      setLoading(false);
      //delete all items from cartItems
      cartItems.forEach((item) => {
        dispatch({ type: "DELETE_FROM_CART", payload: item });
      });

      window.location.href = "/payment";
      handleClose();
    } catch (error) {
      setLoading(false);
      toast.error("Order failed");
    }
  };

  return (
    <Layout loading={loading}>
      <div className="table-responsive">
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>

              <th>Shop</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => {
              return (
                <tr>
                  <td>
                    <img src={item.imageURL} height="80" width="80" />
                  </td>
                  <td>{item.name}</td>
                  {/* <td>{item.price}</td> */}
                  <td>Rs.{parseFloat(item.price)}/-</td>

                  <td>{item.ownerShop}</td>

                  <td>
                    <FaTrash onClick={() => deleteFromCart(item)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="d-flex justify-content-end">
          <h4 className="total-amount">Total Amount = Rs.{totalAmount} /-</h4>
        </div>

        <div className="d-flex justify-content-end mt-3">
          <Link to="/payment">
            <button>CONTINUE</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
