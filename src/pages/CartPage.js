import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { FaTrash } from "react-icons/fa";
import { Modal, Button } from 'react-bootstrap';
import 'react-bootstrap'
import { addDoc, collection } from "firebase/firestore";
import ProductInfo from "./ProductInfo";
import fireDB from "../fireConfig";
import { toast } from "react-toastify";



function CartPage() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [totalAmount, setTotalAmount] = useState(0);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [loading, setLoading] = useState(false)

  const [pincode, setPincode] = useState('');
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach(cartItems => {
      temp = temp + cartItems.price

    })
    setTotalAmount(temp)

  }, [cartItems])

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
      phoneNo
    };

    console.log(addressInfo);

    const orderInfo = {
      cartItems,
      addressInfo,
      email: JSON.parse(localStorage.getItem('currentUser')).user.email,
      userid: JSON.parse(localStorage.getItem('currentUser')).user.uid
    }

    try {
      setLoading(true)
      const result = await addDoc(collection(fireDB, "orders"), orderInfo)
      setLoading(false)
      toast.success('Order Placed Successfully')
      handleClose()
    } catch (error) {
      setLoading(false)
      toast.error('Order failed')
    }
  };

  return (
    <Layout loading={loading}>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
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
                <td>{item.price}</td>
                <td>
                  <FaTrash onClick={() => deleteFromCart(item)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="d-flex justify-content-end">
        <h1 className="total-amount">
          Total Amount = Rs.{totalAmount} /-
        </h1>
      </div>

      <div className="d-flex justify-content-end mt-3">
        <button onClick={handleShow}>
          PLACE ORDER
        </button>
      </div>



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your address</Modal.Title>
        </Modal.Header>
        <Modal.Body> <div className='register-form'>
          <h2>Register</h2>
          <hr />

          <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} />
          <textArea className="form-control" rows={3} type="text" placeholder="Address" value={address} onChange={(e) => { setAddress(e.target.value) }} />

          <input type="number" className="form-control" placeholder="Pincode" value={pincode} onChange={(e) => { setPincode(e.target.value) }} />
          <input type="text" className="form-control" placeholder="Contact No" value={phoneNo} onChange={(e) => { setPhoneNo(e.target.value) }} />
          <hr />


        </div></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={placeOrder}>
            ORDER
          </Button>
        </Modal.Footer>
      </Modal>


    </Layout>
  );
}

export default CartPage;
