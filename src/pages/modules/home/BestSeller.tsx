import React, { useEffect, useState } from "react";
// Assets
import products from "../../../assets/data/products";
import { Product } from "../../../share/types";
// Components
import ProductCard from "../../../components/ProductCard";

const BestSeller = () => {
  // States
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  // Effect
  useEffect(() => {
    let filter = products.filter((product) => product.category === "sofa");
    setFilteredProducts(filter.slice(0, 8));
  }, []);
  return (
    <>
      <h1 className="header">Best Sales</h1>
      <div className="grid-layout">
        {filteredProducts.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </>
  );
};

export default BestSeller;
