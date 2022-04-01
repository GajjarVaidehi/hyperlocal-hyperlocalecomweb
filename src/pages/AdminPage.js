import React, { useEffect, useLayoutEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import fireDB from "../fireConfig";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Button, Tabs, Tab } from "react-bootstrap";
import { toast } from "react-toastify";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [shopkeepers, setShopkeepers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);

      const users = await getDocs(collection(fireDB, "users"));
      const usersArray = [];

      const shopkeepers = await getDocs(collection(fireDB, "shopkeepers"));
      const shopkeepersArray = [];

      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        usersArray.push(obj);

        setLoading(false);
      });

      shopkeepers.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        shopkeepersArray.push(obj);

        setLoading(false);
      });


      setUsers(usersArray);
      setShopkeepers(shopkeepersArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <Layout loading={loading}>
      <Tabs
        defaultActiveKey="products"
        id="uncontrolled-tab-example"
        className="mb-3 mt-3"
      >


        <Tab eventKey="user" title="User" >



          <table className="table mt-3 order">
            <thead>
              <tr>
                <th>Name</th>

                <th>Email Id</th>
                <th>Contact No</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (

                  <tr >
                    <td className="text-center">
                      {user.name}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.cno}</td>

                  </tr>



                );

              })}

            </tbody>
          </table>


        </Tab>
        <Tab eventKey="shop" title="Shop" >

          <table className="table mt-3 order">
            <thead>
              <tr>
                <th>Shop</th>
                <th>Shop Name</th>
                <th>Shopkeeper Name</th>
                <th>Email Id</th>
                <th>Contact No</th>
              </tr>
            </thead>
            <tbody>
              {shopkeepers.map((shop) => {
                return (

                  <tr >
                    <td className="text-center">
                      <img src={shop.imageURL} height="80" width="80" />
                    </td>
                    <td>{shop.shopName}</td>
                    <td>{shop.name}</td>
                    <td>{shop.email}</td>
                    <td>{shop.cno}</td>

                  </tr>



                );

              })}

            </tbody>
          </table>


        </Tab>
      </Tabs>
    </Layout >
  );
}

export default AdminPage;
//hello
