import React, { useState } from "react";
import { Link } from "react-router-dom";

function FirstPage() {

    return (
        <div className="login-parent">

            <div className="row justify-content-center ">
                <div className="col-md-4 first z1 choose">
                    <div className="register-choice">
                        <h4>Getting groceries, accessories, clothes, and every other day-to-day stuff made easy! Register yourself and enjoy shopping with HypLocStore!</h4>


                        <Link to="/register">
                            <button className="my-3">
                                REGISTER AS USER
                            </button>
                        </Link>

                        <br />

                        <Link to="/login">Already registered? Click Here to Login</Link>
                        <hr />

                        <h4>Increase your revenue with one-click and attract the local customers better!</h4>


                        <Link to="/shopkeeper/register">
                            <button className="my-3">
                                REGISTER AS SHOPKEEPER
                            </button>
                        </Link>

                        <br />
                        <Link to="/shopkeeper/login">Already registered? Click Here to Login</Link>

                    </div>
                </div>


                <div className="col-md-5 z1">
                    <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_uwqxebhb.json"
                        background="transparent"
                        speed="1"
                        loop
                        autoplay>

                    </lottie-player>
                </div>
            </div>

            <div className="login-bottom"></div>
        </div>
    );
}

export default FirstPage;
