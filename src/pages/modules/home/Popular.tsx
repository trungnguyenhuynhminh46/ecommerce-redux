import React, { useEffect, useState } from "react";
// Assets
import products from "../../../assets/data/products";
import { Product } from "../../../share/types";
// Components
import ProductCard from "../../../components/ProductCard";
import ProductsList from "../../../components/ProductsList";

const Popular = () => {
  // States
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  // Effect
  useEffect(() => {
    let filter = products.filter((product) => product.category === "watch");
    setFilteredProducts(filter.slice(0, 8));
  }, []);
  return (
    <>
      <h1 className="header">Popular</h1>
      <div className="grid-layout">
        <ProductsList products={filteredProducts} />
      </div>
    </>
  );
};

export default Popular;
