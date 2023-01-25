import React, { useEffect, useState } from "react";
// Assets
import products from "../../../assets/data/products";
import { Product } from "../../../share/types";
// Components
import ProductsList from "../../../components/ProductsList";
import useCollectionQuery from "../../../hooks/useCollectionQuery";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../../share/firebase";

const BestSeller = () => {
  const {
    data: bestSellProductsSnapshot,
    loading: productsIsLoading,
    error: productsHaveError,
  } = useCollectionQuery(
    "bestsell-products",
    query(
      collection(db, "products"),
      where("category.categoryName", "==", "sofa")
    )
  );
  const [bestSellProducts, setBestSellProducts] = useState<Product[]>([]);
  useEffect(() => {
    const trendsList: any[] = [];
    if (bestSellProductsSnapshot && !bestSellProductsSnapshot?.empty) {
      bestSellProductsSnapshot.forEach((doc) => {
        trendsList.push({ id: doc.id, ...doc.data() });
      });
      setBestSellProducts(trendsList);
    }
    if (bestSellProductsSnapshot?.empty || !bestSellProductsSnapshot) {
      setBestSellProducts([]);
    }
  }, [bestSellProductsSnapshot]);
  return (
    <>
      <h1 className="header">Best Sales</h1>

      {productsIsLoading && (
        <div className="h-[300px] flex justify-center items-center">
          <div className="w-[30px] h-[30px] rounded-[50%] border-4 border-deep-blue border-t-transparent animate-spin"></div>
        </div>
      )}
      {!productsIsLoading && bestSellProducts.length > 0 && (
        <div className="grid-layout">
          <ProductsList products={bestSellProducts} />
        </div>
      )}
      {!productsIsLoading && bestSellProducts.length == 0 && (
        <div className="text-xl font-semibold text-center h-[300px] flex items-center justify-center">
          Sorry, but there aren't any Best Seller products
        </div>
      )}
    </>
  );
};

export default BestSeller;
