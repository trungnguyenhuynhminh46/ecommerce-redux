import React from "react";
import { useDispatch } from "react-redux";
// Types
import { Product } from "../share/types";
// Assets
import { addOneItem } from "../redux/slices/cartSlice";
// Components
import { Link } from "react-router-dom";

interface PropsProductCard {
  product: Product;
}

const ProductCard: React.FC<PropsProductCard> = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div className="basis-1/4 flex flex-col">
      <div className="mx-2 mb-10">
        <Link
          to={`/shop/${product.id}`}
          className="block h-[240px] sm:h-[300px] w-auto mb-5 overflow-hidden"
        >
          <img
            src={product.imgUrl}
            alt=""
            className="object-cover transition-all duration-300 ease-linear hover:scale-110"
          />
        </Link>
        <div>
          <Link to={`/shop/${product.id}`}>
            <h2 className="font-semibold leading-tight">
              {product.productName}
            </h2>
          </Link>
          <span className="text-sm">{product.category}</span>
          <div className="mt-5 flex justify-between px-4">
            <span className="font-medium">${product.price}</span>
            <button
              className="w-6 h-6 rounded-[50%] flex justify-center items-center bg-black text-white text-xl"
              onClick={() => {
                dispatch(addOneItem(product));
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
