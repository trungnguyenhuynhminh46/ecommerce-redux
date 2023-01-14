import React, { useEffect, useState } from "react";
// Assets
import products from "../../../assets/data/products";
import { Product } from "../../../share/types";
// Components
import ProductCard from "../../../components/ProductCard";

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
        {filteredProducts.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </>
  );
};

export default Trending;
