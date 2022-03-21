import React from "react";
import Layout from "../components/Layout";
import fireDB from "../fireConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

function WishlistPage() {
  return (
    <Layout>
      <div>WISH LIST</div>
    </Layout>
  );
}

export default WishlistPage;
