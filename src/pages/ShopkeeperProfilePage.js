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
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
function ShopkeeperProfilePage() {
    const auth = getAuth();
    const [name, setName] = useState("");
    const [shopName, setShopName] = useState("");
    const [address, setAddress] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [phoneNo, setPhoneNo] = useState("");

    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const currentShopUser = JSON.parse(localStorage.getItem("currentShopUser"));
    const currentEmail = currentShopUser.user.email;
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const updateInfo = async () => {
        setLoading(true);
        await setDoc(doc(fireDB, "shopkeepers", id), {
            name: name,
            shopName: shopName,
            cno: phoneNo,
            shopAddress: address,
            email: email,
            imageURL: imageURL,
        });
        toast.success("Profile Updated");
        setLoading(false);
    };

    const sendPasswordReset = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            alert("Password reset link sent!");
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    const getData = async () => {
        setLoading(true);
        const data = await getDocs(collection(fireDB, "shopkeepers"));
        data.forEach((doc) => {
            if (doc.data().email === currentEmail) {
                setId(doc.id);
                setName(doc.data().name);
                setPhoneNo(doc.data().cno);
                setShopName(doc.data().shopName)
                setAddress(doc.data().shopAddress);
                setEmail(doc.data().email);
                setImageURL(doc.data().imageURL);
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
                <h5 className="mt-5">Shop Name:</h5>
                <input
                    type="text"
                    className="form-control"
                    value={shopName}
                    onChange={(e) => {
                        setShopName(e.target.value);
                    }}
                />
                <br />
                <h5>Owner Name : </h5>
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
                <h5>Shop Image:</h5>
                <input
                    type="text"
                    className="form-control"
                    value={imageURL}
                    onChange={(e) => {
                        setImageURL(e.target.value);
                    }}
                />
                <br />

                <h5>Shop Address :</h5>
                <textarea
                    type="text"
                    rows={3}
                    className="form-control"
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


                <br />

                <button className="my-3 " onClick={() => sendPasswordReset(email)}>
                    Reset Password
                </button>
                <hr />
                <button variant="primary" onClick={updateInfo}>
                    UPDATE
                </button>

            </div>
        </Layout>
    );
}

export default ShopkeeperProfilePage;