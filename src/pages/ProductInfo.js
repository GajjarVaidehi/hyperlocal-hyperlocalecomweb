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
      {/* <h1 className="mt-5">Product Info</h1> */}
      <h2 className="mt-5 md-5 shop-class"><span>&nbsp;&nbsp; Product Info &nbsp;&nbsp; </span></h2>
      <div className="container d-flex justify-content-evenly ">
        <div className="justify-content-evenly w-100">
          <div className="d-flex align-items-center justify-content-evenly">
            {product && (
              <>
                <div>
                  <img src={product.imageURL} style={{ height: "60vmin" }} />
                </div>
                <div>
                  <h2>

                    <b>{product.name}</b>


                  </h2>
                  <h3>Rs.{product.price}/-</h3>

                  <div className="d-flex flex-column align-items-center justify-content-center my-3">
                    <button onClick={() => addToCart(product)}>ADD TO CART</button>
                  </div>

                  <br />
                  <br />

                  <hr />

                  <br />

                  <h3>Product Description</h3>
                  <h5>{product.description}</h5>


                </div>
              </>
            )}

          </div>
          {product && (
            <div className="d-flex flex-column align-items-center justify-content-center">


            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default ProductInfo;
