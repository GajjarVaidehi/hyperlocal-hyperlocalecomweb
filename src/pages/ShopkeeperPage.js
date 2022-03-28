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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const data = JSON.parse(localStorage.getItem("currentShopUser"));
  const email = data.user.email;
  const ownerShop = data.user.shopName;
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    imageURL: "",
    category: "",
    ownerId: data.user.uid,
    ownerShop: ownerShop,
  });
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [orders, setOrders] = useState([]);

  useEffect(async () => {
    const users = await getDocs(collection(fireDB, "shopkeepers"));
    users.forEach((doc) => {
      if (doc.data().email === email) {
        setProduct({
          ...product,
          ownerShop: doc.data().shopName,
        });
      }
    });
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

  useEffect(() => {
    getOrdersData();
  }, []);

  async function getOrdersData() {
    try {
      setLoading(true);

      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      setOrders(ordersArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const editHandler = (item) => {
    setProduct(item);

    setShow(true);
  };

  const updateProduct = async () => {
    try {
      setLoading(true);
      await setDoc(doc(fireDB, "products", product.id), product);

      handleClose();
      toast.success("Product Updated Succesfully");
      window.location.reload();
    } catch (error) {
      toast.error("Product Update Failed");
      setLoading(false);
    }
  };

  const addProduct = async () => {
    try {
      setLoading(true);
      await addDoc(collection(fireDB, "products"), product);

      handleClose();
      toast.success("Product Added Succesfully");
      window.location.reload();
    } catch (error) {
      toast.error("Product Add Failed");
      setLoading(false);
    }
  };

  const deleteProduct = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product deleted succesfully");
      getData();
    } catch (error) {
      toast.error("Product deletion failed");
      setLoading(false);
    }
  };

  const addHandler = () => {
    setAdd(true);
    handleShow();
  };

  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  return (
    <Layout loading={loading}>
      <Tabs
        defaultActiveKey="products"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="products" title="Products">
          <div className="d-flex justify-content-between">
            <h3>Products List</h3>
            <button onClick={addHandler}>Add Product</button>
          </div>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter((item) => item.ownerId === data.user.uid)
                .map((item) => {
                  return (
                    <tr>
                      <td>
                        <img src={item.imageURL} height="80" width="80" />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.price}</td>
                      <td>
                        <FaTrash
                          color="red"
                          size={20}
                          onClick={() => deleteProduct(item)}
                        />

                        <FaEdit
                          onClick={() => editHandler(item)}
                          color="blue"
                          size={20}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {add == true ? "Add a product" : "Edit Product"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <div className="register-form">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />
                <input
                  className="form-control"
                  type="text"
                  placeholder="Image URL"
                  value={product.imageURL}
                  onChange={(e) =>
                    setProduct({ ...product, imageURL: e.target.value })
                  }
                />

                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                />
                {/* <input
                  type="text"
                  className="form-control"
                  placeholder="Category"
                  value={product.category}
                  onChange={(e) =>
                    setProduct({ ...product, category: e.target.value })
                  }
                />
                 */}

                <label for="category">&nbsp;&nbsp;&nbsp;Select category:</label>

                <select name="category" id="category" >
                  <option value="sports" >Sports</option>
                  <option value="toys">Toys/Games</option>
                  <option value="grocery" >Grocery</option>
                  <option value="fashion">Fashion</option>
                  <option value="dairy">Dairy</option>
                  <option value="footwear">Footwear</option>
                  <option value="electronics">Electronics</option>

                </select>

                <hr />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              {add ? (
                <button onClick={addProduct}>SAVE</button>
              ) : (
                <button onClick={updateProduct}>SAVE</button>
              )}
            </Modal.Footer>
          </Modal>
        </Tab>
        <Tab eventKey="orders" title="Orders">
          {orders.map((order) => {
            return (
              <table className="table mt-3 order">
                <tbody>
                  {order.cartItems
                    .filter((cartItem) => {
                      return cartItem.ownerId === data.user.uid;
                    })
                    .map((item) => {
                      return (
                        <tr>
                          <td>
                            <img src={item.imageURL} height="80" width="80" />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.price}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            );
          })}
        </Tab>

      </Tabs>
    </Layout>
  );
}

export default AdminPage;
//hello
