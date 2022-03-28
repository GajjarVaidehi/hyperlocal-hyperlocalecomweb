import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Modal, Button } from "react-bootstrap";
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
function ProfilePage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const currentEmail = currentUser.user.email;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const updateInfo = async () => {
    setLoading(true);
    await setDoc(doc(fireDB, "users", id), {
      name: name,
      cno: phoneNo,
      address: address,
      email: email,
    });
    toast.success("Profile Updated");
    setLoading(false);
  };
  const getData = async () => {
    setLoading(true);
    const data = await getDocs(collection(fireDB, "users"));
    data.forEach((doc) => {
      if (doc.data().email === currentEmail) {
        setId(doc.id);
        setName(doc.data().name);
        setPhoneNo(doc.data().cno);
        setAddress(doc.data().address);
        setEmail(doc.data().email);
      }
    });
    console.log(data);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <div className="update-profile">
        <br />
        <h5>Full Name : </h5>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <h5>Email ID :</h5>
        <input
          type="email"
          readOnly
          className="form-control"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />

        <h5>Contact Number :</h5>
        <input
          type="text"
          className="form-control"
          value={phoneNo}
          onChange={(e) => {
            setPhoneNo(e.target.value);
          }}
        />

        <br />

        <h5>Address :</h5>
        <textarea
          type="text"
          rows={3}
          className="form-control"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <hr />
        <Button variant="primary" onClick={updateInfo}>
          UPDATE
        </Button>

      </div>
    </Layout>
  );
}

export default ProfilePage;
