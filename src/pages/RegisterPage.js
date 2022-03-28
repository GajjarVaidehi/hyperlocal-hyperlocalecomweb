import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import fireDB from "../fireConfig";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cno, setcNumber] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const register = async () => {
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = {
        name: name,
        cno: cno,
        email: email,
        address: address,
      };
      await addDoc(collection(fireDB, "users"), user);
      setLoading(false);
      toast.success("Registration Successful");

      setEmail("");
      setName("");
      setcNumber("");
      setAddress("");
      setPassword("");
      window.location.href = "/login";

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
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
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
            <textarea
              type="text"
              rows={3}
              className="form-control"
              placeholder="Address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
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
            <Link to="/login">Click Here to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
