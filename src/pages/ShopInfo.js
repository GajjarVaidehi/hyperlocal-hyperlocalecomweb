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

function ShopInfo() {

    const [products, setProducts] = useState([]);
    const [shop, setShop] = useState();
    const { cartItems } = useSelector((state) => state.cartReducer);
    const { wishlistItems } = useSelector((state) => state.wishlistReducer);
    const [loading, setLoading] = useState(false);
    const [searchKey, setSearchKey] = useState("");
    const [filterType, setFilterType] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const params = useParams();


    useEffect(() => {
        getShopData();
        getData();
    }, []);

    async function getShopData() {
        try {
            setLoading(true);
            const currentShop = await getDoc(
                doc(fireDB, "shopkeepers", params.shopkeeperid)
            );


            console.log(currentShop.data());
            setShop(currentShop.data());
        } catch (error) {
            console.log(error);
        }
    }
    async function getData() {
        try {
            setLoading(true);

            const productsArray = [];
            const productsData = await getDocs(
                (collection(fireDB, "products"))
            )
            productsData.forEach((doc) => {
                const obj = {
                    id: doc.id,
                    ...doc.data(),
                };
                console.log(obj.ownerShop);
                console.log(shop.shopName);

                productsArray.push(obj);
                setLoading(false);
            });

            setProducts(productsArray);

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    useEffect(
        () => {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
        },
        [cartItems],
        [wishlistItems]
    );

    const addToCart = (product) => {
        dispatch({ type: "ADD_TO_CART", payload: product });
        toast.success("Added to Cart");

    };

    const addToWishlist = (product) => {
        dispatch({ type: "ADD_TO_WISHLIST", payload: product });
        toast.success("Added to Wishlist");
    };

    return (
        <Layout loading={loading}>
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

                {shop && <div className="row">
                    {products

                        // .filter((obj) => obj.name.toLowerCase().includes(searchKey))
                        // .filter((obj) => obj.category.toLowerCase().includes(filterType))
                        .map((product) => {
                            return (
                                <div className="col-md-4">
                                    <div className="m-2 p-1 product position-relative">
                                        <div className="contents">
                                            <p>{product.name}</p>
                                            <p>{product.ownerShop}</p>
                                            <div className="text-center">
                                                <img
                                                    // src={product.imageURL}

                                                    alt=""
                                                    className="product-img"
                                                />
                                            </div>
                                        </div>
                                        <div className="product-actions">
                                            <h2>Rs.{product.price} /-</h2>

                                            <div className="d-flex">
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


                                            </div>
                                            <button
                                                className="view-button"
                                                onClick={() => {
                                                    navigate(`/productinfo/${product.id}`);
                                                }}
                                            >
                                                VIEW
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
                }
            </div>


        </Layout>
    );
}

export default ShopInfo;
