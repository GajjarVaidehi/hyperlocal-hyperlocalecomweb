import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { FaTrash } from "react-icons/fa";
import fireDB from "../fireConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";

function WishlistPage() {
  const { wishlistItems } = useSelector((state) => state.wishlistReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);
  const deleteFromWishlist = (product) => {
    dispatch({ type: "DELETE_FROM_WISHLIST", payload: product });
  };
  return (
    <Layout>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {wishlistItems.map((item) => {
            return (
              <tr>
                <td>
                  <img src={item.imageURL} height="80" width="80" />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <FaTrash onClick={() => deleteFromWishlist(item)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>


    </Layout>
  );
}

export default WishlistPage;
