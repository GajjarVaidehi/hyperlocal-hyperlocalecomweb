import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getDoc, doc } from "firebase/firestore";
import fireDB from "../fireConfig";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function ProductInfo() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);

  const params = useParams();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const productTemp = await getDoc(
        doc(fireDB, "products", params.productid)
      );
      setProduct(productTemp.data());
      console.log(productTemp.data());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const addToCart = (product) => {
    console.log(product);
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout loading={loading}>
      <h1>Product Info</h1>
      <div className="container d-flex">
        <div className="d-flex flex-column justify-content-center">
          <div className="col-md-8">
            {product && (
              <div>
                <h2>
                  <b>{product.name}</b>
                </h2>

                <img src={product.imageURL} className="product-info-img" />
                <hr />
              </div>
            )}
          </div>
          {product && (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <h5>{product.description}</h5>
              <div className="d-flex flex-column align-items-center justify-content-center my-3">
                <button onClick={() => addToCart(product)}>ADD TO CART</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default ProductInfo;
