
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import GooglePayButton from '@google-pay/button-react';
import { addDoc, collection } from "firebase/firestore";
import ProductInfo from "./ProductInfo";
import fireDB from "../fireConfig";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function PaymentPage() {
    const { cartItems } = useSelector((state) => state.cartReducer);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [loading, setLoading] = useState(false);

    const [pincode, setPincode] = useState("");
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

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
            document.getElementById('continue-shopping-id').style.visibility = 'visible';
            document.getElementById('thanks').className = "show";

            toast.success('Order Placed Successfully');



            handleClose();

        } catch (error) {
            setLoading(false);
            toast.error("Order failed");
        }
    };


    return (
        <Layout loading={loading} >

            <h1 className="mt-5">Choose Payment Mode</h1>
            <br />
            <div className="d-flex justify-content-center">


                <button onClick={handleShow} className="mx-2 payment-button">Cash on Delivery</button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>ADD YOUR ADDRESS DETAILS</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {" "}
                        <div className="register-form">
                            <hr />

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                            <textArea
                                className="form-control"
                                rows={3}
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                }}
                            />

                            <input
                                type="number"
                                className="form-control"
                                placeholder="Pincode"
                                value={pincode}
                                onChange={(e) => {
                                    setPincode(e.target.value);
                                }}
                            />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Contact No"
                                value={phoneNo}
                                onChange={(e) => {
                                    setPhoneNo(e.target.value);
                                }}
                            />
                            <hr />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary place-order" onClick={placeOrder}>
                            PLACE ORDER
                        </Button>
                    </Modal.Footer>
                </Modal>




                <GooglePayButton className="mx-2 "
                    environment='TEST'
                    paymentRequest={{
                        apiVersion: 2,
                        apiVersionMinor: 0,
                        allowedPaymentMethods: [
                            {
                                type: 'CARD',
                                parameters: {
                                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                    allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                },
                                tokenizationSpecification: {
                                    type: 'PAYMENT_GATEWAY',
                                    parameters: {
                                        gateway: 'example',
                                        gatewayMerchantId: 'exampleGatewayMerchantId',
                                    },
                                },
                            },
                        ],
                        merchantInfo: {
                            merchantId: '12345678901234567890',
                            merchantName: 'Demo Merchant',

                        },
                        transactionInfo: {
                            totalPriceStatus: 'FINAL',
                            totalPriceLabel: 'Total',
                            totalPrice: '1',
                            currencyCode: 'INR',
                            countryCode: 'IN',

                        },
                        shippingAddressRequired: true,
                        callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
                    }}
                    onLoadPaymentData={paymentRequest => {
                        console.log('Success', paymentRequest);
                    }}
                    onPaymentAuthorized={paymentData => {
                        console.log('Payment Authorised Success', paymentData);
                        return { transactionState: 'SUCCESS' }
                    }}
                    onPaymentDataChanged={paymentData => {
                        console.log('On Payment Data Changed', paymentData);
                        return {}
                    }}
                    existingPaymentMethodRequired='false'
                    buttonColor='black'
                    buttonType='Buy'
                />


            </div>
            <div className='justify-content-center '>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <h3 id="thanks" className="hide">Thanks for shopping!</h3>
                <br />
                <button
                    className="continue-shopping hide" id="continue-shopping-id"
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    CONTINUE SHOPPING
                </button>

            </div>


        </Layout>


    )
}

export default PaymentPage