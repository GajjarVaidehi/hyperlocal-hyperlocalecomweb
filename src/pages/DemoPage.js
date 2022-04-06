import React, { useEffect, useLayoutEffect, useState } from "react";
import Layout from "../components/Layout";
import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";
import fireDB from "../fireConfig";
import { async } from "@firebase/util";
import { fireproducts } from "../hyperlocal-products";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function DemoPage() {


    const [searchKey, setSearchKey] = useState("");
    const [filterType, setFilterType] = useState("");
    const navigate = useNavigate();

    var id1 =
        'NaxQFXI2gnPO3PIna3Fe';

    return (

        <Layout >
            <div className="container">
                <div className="d-flex w-50 align-items-center my-3 justify-content-center">
                    <input
                        type="text"
                        value={searchKey}
                        onChange={(e) => {
                            setSearchKey(e.target.value);
                        }}
                        className="form-control mx-2"
                        placeholder="'Search Items"
                    />
                    <select
                        className="form-control mt-3"
                        value={filterType}
                        onChange={(e) => {
                            setFilterType(e.target.value);
                        }}
                    >
                        <option value="">All</option>
                        <option value="sports" >Sports</option>
                        <option value="toys/games">Toys/Games</option>
                        <option value="grocery" >Grocery</option>
                        <option value="fashion">Fashion</option>
                        <option value="dairy">Dairy</option>
                        <option value="footwear">Footwear</option>
                        <option value="electronics">Electronics</option>
                    </select>
                </div>

                <div className="row">

                    <div className="col-md-4">
                        <div className="m-2 p-1 product position-relative">
                            <div className="contents">
                                <h5>Amul Pure Ghee</h5>
                                <h2>Rs. 485 /-</h2>
                                <div className="text-center">
                                    <img

                                        src="https://m.media-amazon.com/images/I/91iqQ225TVL._SY679_.jpg"
                                        alt=""
                                        className="product-img"
                                    />
                                </div>
                            </div>
                            <div className="product-actions">


                                {/* <div className="d-flex">
                                    <button
                                        className="mx-2"
                                        onClick={() => addToCart(product)}
                                    >
                                        ADD TO CART
                                    </button>
                                    <button
                                        className="mx-2"
                                        onClick={() => addToWishlist(product)}
                                    >
                                        ADD TO WISHLIST
                                    </button>


                                </div> */}
                                <button
                                    className="view-button"
                                    onClick={() => {
                                        navigate('/productinfo/{id1}')
                                    }}
                                >
                                    VIEW
                                </button>
                            </div>
                        </div>


                    </div>




                </div>

            </div>


        </Layout>

    )
}

export default DemoPage