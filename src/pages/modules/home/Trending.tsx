import React, { useEffect, useState } from "react";
// Assets
import products from "../../../assets/data/products";
import { Product } from "../../../share/types";
// Components
import ProductsList from "../../../components/ProductsList";

const Trending = () => {
  // States
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  // Effect
  useEffect(() => {
    let filter = products.filter((product) => product.category === "chair");
    setFilteredProducts(filter.slice(0, 4));
  }, []);
  return (
    <>
      <h1 className="header">Trending Products</h1>
      <div className="grid-layout">
        <ProductsList products={filteredProducts} />
      </div>
    </>
  );
};

export default Trending;
