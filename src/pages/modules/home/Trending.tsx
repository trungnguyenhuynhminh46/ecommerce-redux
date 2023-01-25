import React, { useEffect, useState } from "react";
// Assets
import products from "../../../assets/data/products";
import { Product } from "../../../share/types";
import useCollectionQuery from "../../../hooks/useCollectionQuery";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../../share/firebase";
// Components
import ProductsList from "../../../components/ProductsList";

const Trending = () => {
  const {
    data: trendingProductsSnapshot,
    loading: productsIsLoading,
    error: productsHaveError,
  } = useCollectionQuery(
    "trending-products",
    query(
      collection(db, "products"),
      where("category.categoryName", "==", "chair")
    )
  );
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  useEffect(() => {
    const trendsList: any[] = [];
    if (trendingProductsSnapshot && !trendingProductsSnapshot?.empty) {
      trendingProductsSnapshot.forEach((doc) => {
        trendsList.push({ id: doc.id, ...doc.data() });
      });
      setTrendingProducts(trendsList);
    }
    if (trendingProductsSnapshot?.empty || !trendingProductsSnapshot) {
      setTrendingProducts([]);
    }
  }, [trendingProductsSnapshot]);
  return (
    <>
      <h1 className="header">Trending Products</h1>

      {productsIsLoading && (
        <div className="h-[300px] flex justify-center items-center">
          <div className="w-[30px] h-[30px] rounded-[50%] border-4 border-deep-blue border-t-transparent animate-spin"></div>
        </div>
      )}
      {!productsIsLoading && trendingProducts.length > 0 && (
        <div className="grid-layout">
          <ProductsList products={trendingProducts} />
        </div>
      )}
      {!productsIsLoading && trendingProducts.length == 0 && (
        <div className="text-xl font-semibold text-center h-[300px] flex items-center justify-center">
          Sorry, but there aren't any Best Seller products
        </div>
      )}
    </>
  );
};

export default Trending;
