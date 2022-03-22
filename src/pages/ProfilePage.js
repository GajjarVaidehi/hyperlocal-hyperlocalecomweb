import React, { useState } from "react";
import Layout from "../components/Layout";
import { Modal, Button } from "react-bootstrap";

function ProfilePage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Layout >
      <div className="text-field">
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
          className="form-control"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <h5>Address :</h5>
        <textArea
          className="form-control"
          rows={3}
          type="text"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
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
        <hr />
        <hr />



        <Button variant="primary" onClick={ProfilePage}>
          UPDATE
        </Button>
        <hr />
      </div>
    </Layout>
  );
}

export default ProfilePage;
