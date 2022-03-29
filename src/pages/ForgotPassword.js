import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, } from "firebase/auth";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";
import Loader from "../components/Loader";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const auth = getAuth();

    const sendPasswordReset = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            alert("Password reset link sent!");
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };


    return (
        <div className="login-parent">

            <div className="row justify-content-center">
                <div className="col-md-4 z1">
                    <div className="login-form">
                        <h4>Forgot password?
                            Don't worry!</h4>
                        <br />
                        <p>Enter your email-id below to receive a verification link!</p>


                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />

                        <button className="my-3 " onClick={() => sendPasswordReset(email)}>
                            Reset Password
                        </button>
                        <hr />
                        <Link to="/login">Click Here to Login</Link>
                    </div>
                </div>
                <div className="col-md-5 z1">
                    <lottie-player
                        src="https://assets9.lottiefiles.com/packages/lf20_IcvJ1B.json"
                        background="transparent"
                        speed="1"
                        loop
                        autoplay
                    ></lottie-player>
                </div>
            </div>

            <div className="login-bottom"></div>
        </div>
    );
}

export default ForgotPassword;
