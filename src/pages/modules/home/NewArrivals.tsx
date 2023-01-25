import React, { useEffect, useState } from "react";
import useCollectionQuery from "../../../hooks/useCollectionQuery";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../../share/firebase";
// Assets
import products from "../../../assets/data/products";
import { Product } from "../../../share/types";
// Components
import ProductsList from "../../../components/ProductsList";

const NewArrivals = () => {
  const {
    data: newProductsSnapshot,
    loading: productsIsLoading,
    error: productsHaveError,
  } = useCollectionQuery(
    "new-products",
    query(
      collection(db, "products"),
      where("category.categoryName", "==", "wireless")
    )
  );
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  useEffect(() => {
    const newsList: any[] = [];
    if (newProductsSnapshot && !newProductsSnapshot?.empty) {
      newProductsSnapshot.forEach((doc) => {
        newsList.push({ id: doc.id, ...doc.data() });
      });
      setNewProducts(newsList);
    }
    if (newProductsSnapshot?.empty || !newProductsSnapshot) {
      setNewProducts([]);
    }
  }, [newProductsSnapshot]);
  return (
    <>
      <h1 className="header">New Arrivals</h1>

      {productsIsLoading && (
        <div className="h-[300px] flex justify-center items-center">
          <div className="w-[30px] h-[30px] rounded-[50%] border-4 border-deep-blue border-t-transparent animate-spin"></div>
        </div>
      )}
      {!productsIsLoading && newProducts.length > 0 && (
        <div className="grid-layout">
          <ProductsList products={newProducts} />
        </div>
      )}
      {!productsIsLoading && newProducts.length == 0 && (
        <div className="text-xl font-semibold text-center h-[300px] flex items-center justify-center">
          Sorry, but there aren't any Best Seller products
        </div>
      )}
    </>
  );
};

export default NewArrivals;
