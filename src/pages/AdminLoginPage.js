import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";
import Loader from "../components/Loader";

function AdminLoginPage() {

    var AdminEmail = "19ituos136@ddu.ac.in"
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const auth = getAuth();

    const login = async () => {
        if (AdminEmail === email) {

            setLoading(true);
            const result = await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem("currentAdmin", JSON.stringify(result));
            setLoading(false);
            toast.success("Login Successful");
            window.location.href = "/admin";
        } else {

            toast.error("Login Failed");
            setLoading(false);
        }
    };

    return (
        <div className="login-parent">
            {loading && <Loader />}
            <div className="row justify-content-center">
                <div className="col-md-4 z1">
                    <div className="login-form">
                        <h2>Login</h2>
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
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <button className="my-3 " onClick={login}>
                            Login
                        </button>
                        <br />
                        <Link to="/register" >Click Here to Register &nbsp;&nbsp;&nbsp;</Link>

                        <Link to="/forgot-password">Forgot Password?</Link>
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

export default AdminLoginPage;
