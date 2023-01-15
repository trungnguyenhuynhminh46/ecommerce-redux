import React from "react";
// Types
import { Product } from "../share/types";
// Components
import ProductCard from "./ProductCard";

interface PropsProductsList {
  products: Product[];
}

const ProductsList: React.FC<PropsProductsList> = ({ products }) => {
  return (
    <>
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </>
  );
};

export default ProductsList;
