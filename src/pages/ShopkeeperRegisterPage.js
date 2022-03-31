import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import fireDB from "../fireConfig";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

function ShopkeeperRegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shopName, setShopName] = useState("");
  const [name, setName] = useState("");
  const [cno, setcNumber] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const data = JSON.parse(localStorage.getItem("currentShopUser"));
  const auth = getAuth();


  const register = async () => {
    try {
      setLoading(true);
      const user = await addDoc(collection(fireDB, "shopkeepers"), {
        email,
        // password,
        shopName,
        name,
        cno,
        shopAddress,
        imageURL,


      });
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(result);
      setLoading(false);
      toast.success("Registration Successful");
      setEmail("");
      setName("");
      setShopName("");
      setImageURL("");
      setShopAddress("");
      setcNumber("");
      // setPassword("");
      window.location.href = "/shopkeeper/login";
    } catch (error) {
      console.log(error);
      toast.error("Registration Failed");
      setLoading(false);
    }
  };

  return (
    <div className="register-parent">
      {loading && <Loader />}
      <div className="register-top"></div>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <lottie-player
            src="https://assets9.lottiefiles.com/packages/lf20_IcvJ1B.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className="col-md-4 z1">
          <div className="register-form">
            <h2>Register</h2>
            <hr />
            <input
              type="text"
              className="form-control"
              placeholder="Shop Name"
              value={shopName}
              onChange={(e) => {
                setShopName(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Owner Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <input
              className="form-control"
              type="text"
              placeholder="Shop's Image"
              value={imageURL}
              onChange={(e) =>
                setImageURL(e.target.value)
              }
            />

            <input
              type="text-area"
              className="form-control"
              placeholder="Shop Address"
              value={shopAddress}
              onChange={(e) => {
                setShopAddress(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Contact Number"
              value={cno}
              onChange={(e) => {
                setcNumber(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />



            <button className="my-3 " onClick={register}>
              REGISTER
            </button>
            <hr />
            <Link to="/shopkeeper/login">Click Here to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopkeeperRegisterPage;
