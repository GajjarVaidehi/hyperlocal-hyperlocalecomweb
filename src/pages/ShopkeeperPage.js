import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import fireDB from "../fireConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Tabs, Tab, Button } from "react-bootstrap";
import ProfilePage from "./ProfilePage";

function ShopkeeperPage() {
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);

      const users = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };

        productsArray.push(obj);
        setLoading(false);
      });
      setProducts(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <Layout loading={loading}>
      <Tabs
        defaultActiveKey="product"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="product" title="Product"></Tab>
        <Tab eventKey="order" title="Order"></Tab>
        <Tab eventKey="profile" title="Profile">
          <div className="text-field">
            <br />
            <h5>Shop Name : </h5>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br />
            <h5>Shopkeeper's Name : </h5>
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
            <h5> Shop Address :</h5>
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


            <Button variant="primary" onClick={ProfilePage}>
              UPDATE
            </Button>
            <hr />
          </div>
        </Tab>
      </Tabs>
    </Layout>
  );
}

export default ShopkeeperPage;
