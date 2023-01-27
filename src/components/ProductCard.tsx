import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFavoriteItems } from "../redux/selectors";
import { addProduct, deleteProduct } from "../redux/slices/favoriteSlice";
// Types
import { Product } from "../share/types";
// Assets
import { addOneItem } from "../redux/slices/cartSlice";
// Components
import { Link } from "react-router-dom";
import Rating from "./Rating";

interface PropsProductCard {
  product: Product;
}

const ProductCard: React.FC<PropsProductCard> = ({ product }) => {
  const dispatch = useDispatch();
  const favoriteProducts = useSelector(selectFavoriteItems);
  const [inFavorite, setInFavorite] = useState<boolean>(
    !!favoriteProducts.find((item) => item.id === product.id)
  );

  return (
    <div className="basis-1/4 flex flex-col relative">
      {!inFavorite && (
        <button
          className="absolute top-[20px] right-[20px] bg-gray-50 rounded-[50%] w-[30px] h-[30px] text-red-600 z-20"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addProduct(product));
            setInFavorite(true);
          }}
        >
          <i className="fa-regular fa-heart"></i>
        </button>
      )}
      {inFavorite && (
        <button
          className="absolute top-[20px] right-[20px] bg-gray-50 rounded-[50%] w-[30px] h-[30px] text-red-600 z-20"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(deleteProduct(product.id));
            setInFavorite(false);
          }}
        >
          <i className="fa-solid fa-heart"></i>
        </button>
      )}
      <div className="mx-2 mb-10">
        <Link
          to={`/shop/${product.id}`}
          className="block h-[240px] sm:h-[300px] w-auto mb-5 overflow-hidden"
        >
          <img
            src={product.imgURL}
            alt=""
            className="object-cover transition-all duration-300 ease-linear hover:scale-110"
          />
        </Link>
        <div className="flex gap-2">
          <Rating avgRating={product.avgRating} />{" "}
          <span className="text-sm font-normal">({product.avgRating})</span>
        </div>
        <div>
          <Link to={`/shop/${product.id}`}>
            <h2 className="font-semibold leading-tight">
              {product.productName}
            </h2>
          </Link>
          <span className="text-sm">{product.category.categoryName}</span>
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
