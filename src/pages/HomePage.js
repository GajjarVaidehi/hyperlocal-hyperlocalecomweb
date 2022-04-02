import React, { useEffect, useLayoutEffect, useState } from "react";
import Layout from "../components/Layout";
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import { async } from "@firebase/util";
import { fireproducts } from "../hyperlocal-products";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function HomePage() {
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);
  const { cartItems } = useSelector((state) => state.cartReducer);
  const { wishlistItems } = useSelector((state) => state.wishlistReducer);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [filterType, setFilterType] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);

      const users = await getDocs(collection(fireDB, "products"));
      const shops = await getDocs(collection(fireDB, "shopkeepers"));
      const shopsArray = [];
      const productsArray = [];

      shops.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };

        shopsArray.push(obj);
        setLoading(false);
      });

      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };

        productsArray.push(obj);
        setLoading(false);
      });

      setShops(shopsArray);
      setProducts(productsArray);
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
      <h2 className="mt-5 md-5 shop-class">
        <span>&nbsp;&nbsp; Shops Near You &nbsp;&nbsp; </span>
      </h2>
      <div className="container">
        <div className="row">
          {shops.map((shop) => {
            return (
              <div className="col-md-4">
                <div className="m-3 md-4 p-1 product position-relative">
                  <div className="contents d-flex flex-column align-items-center">
                    <div className="text-center">
                      <img src={shop.imageURL} alt="" className="product-img" />
                    </div>
                    <p style={{ fontSize: "3vmin" }}>{shop.shopName}</p>
                    <p style={{ fontSize: "2vmin" }}>{shop.shopAddress}</p>

                    <div className="d-flex align-items-center">
                      <button
                        className="view-button "
                        onClick={() => {
                          navigate("/shopproducts");
                        }}
                      >
                        VIEW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          className="view-button "
          style={{ float: "right" }}
          onClick={() => {
            navigate("/allshops");
          }}
        >
          VIEW MORE
        </button>

        <br />

        <h2 className="mt-5 md-5 shop-class">
          <span>&nbsp;&nbsp; Products &nbsp;&nbsp; </span>
        </h2>

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
            <option value="sports">Sports</option>
            <option value="toys/games">Toys/Games</option>
            <option value="grocery">Grocery</option>
            <option value="fashion">Fashion</option>
            <option value="dairy">Dairy</option>
            <option value="footwear">Footwear</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>

        <div className="row">
          {products
            .filter((obj) => obj.name.toLowerCase().includes(searchKey))
            .filter((obj) => obj.category.toLowerCase().includes(filterType))
            .map((product) => {
              return (
                <div className="col-md-4">
                  <div className="m-4 p-1 product position-relative">
                    <div className="contents">
                      <h5>
                        <b>{product.name}</b>
                      </h5>
                      <h5>{product.ownerShop}</h5>
                      <div className="text-center">
                        <img
                          src={product.imageURL}
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
      </div>
    </Layout>
  );
}

export default HomePage;
