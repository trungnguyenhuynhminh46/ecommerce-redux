import React, { useEffect, useState } from "react";
import useCollectionQuery from "../../../hooks/useCollectionQuery";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../../share/firebase";
// Assets
import products from "../../../assets/data/products";
import { Product } from "../../../share/types";
// Components
import ProductCard from "../../../components/ProductCard";
import ProductsList from "../../../components/ProductsList";

const Popular = () => {
  const {
    data: popularProductsSnapshot,
    loading: productsIsLoading,
    error: productsHaveError,
  } = useCollectionQuery(
    "popular-products",
    query(
      collection(db, "products"),
      where("category.categoryName", "==", "watch")
    )
  );
  const [popuplarProducts, setPopularProducts] = useState<Product[]>([]);
  useEffect(() => {
    const popularsList: any[] = [];
    if (popularProductsSnapshot && !popularProductsSnapshot?.empty) {
      popularProductsSnapshot.forEach((doc) => {
        popularsList.push({ id: doc.id, ...doc.data() });
      });
      setPopularProducts(popularsList);
    }
    if (popularProductsSnapshot?.empty || !popularProductsSnapshot) {
      setPopularProducts([]);
    }
  }, [popularProductsSnapshot]);
  return (
    <>
      <h1 className="header">Popular Products</h1>

      {productsIsLoading && (
        <div className="h-[300px] flex justify-center items-center">
          <div className="w-[30px] h-[30px] rounded-[50%] border-4 border-deep-blue border-t-transparent animate-spin"></div>
        </div>
      )}
      {!productsIsLoading && popuplarProducts.length > 0 && (
        <div className="grid-layout">
          <ProductsList products={popuplarProducts} />
        </div>
      )}
      {!productsIsLoading && popuplarProducts.length == 0 && (
        <div className="text-xl font-semibold text-center h-[300px] flex items-center justify-center">
          Sorry, but there aren't any Best Seller products
        </div>
      )}
    </>
  );
};

export default Popular;
