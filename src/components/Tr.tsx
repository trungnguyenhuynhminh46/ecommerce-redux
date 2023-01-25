import React, { useEffect, useState } from "react";
import { CartItem } from "../share/types";
import {
  addOneItem,
  deleteOneItem,
  deleteItem,
} from "../redux/slices/cartSlice";
// Assets
import type { Product } from "../share/types";
import allProducts from "../assets/data/products";
import { useDispatch } from "react-redux";
import useDocumentQuery from "../hooks/useDocumentQuery";
import { db } from "../share/firebase";
import { doc } from "firebase/firestore";
import { toast } from "react-toastify";

interface PropsTr {
  cartItem: CartItem;
}

const Tr: React.FC<PropsTr> = ({ cartItem }) => {
  const dispatch = useDispatch();
  const product_id = cartItem.id;
  const {
    data: productSnapshot,
    loading: productIsLoading,
    error: productHasError,
  } = useDocumentQuery(
    `product-${product_id}`,
    doc(db, "products", product_id)
  );
  const [product, setProduct] = useState<Product | null>(null);
  useEffect(() => {
    if (productSnapshot?.exists()) {
      const prod: any = { id: productSnapshot.id, ...productSnapshot.data() };
      setProduct(prod);
    }
    if (!productSnapshot?.exists()) {
      setProduct(null);
    }
  }, [productSnapshot]);
  return (
    <tr className="border-b border-solid border-gray-200">
      <td>
        <img
          src={cartItem.image}
          alt=""
          className="w-[80px] h-auto min-h-[100px] mx-auto"
        />
      </td>
      <td className="text-center">{cartItem.productName}</td>
      <td className="text-center">${cartItem.price}</td>
      <td className="text-center">
        <div className="w-[90px] h-[30px] flex border boder-solid border-gray-200 mx-auto">
          <div
            className="basis-1/3 flex justify-center items-center border-r border-solid border-gray-200 cursor-pointer bg-gray-200"
            onClick={() => {
              if (product) {
                dispatch(deleteOneItem(product));
              } else {
                toast.error("Product doesn't exist in the database");
              }
            }}
          >
            -
          </div>
          <div className="basis-1/3 flex justify-center items-center border-r border-solid border-gray-200">
            {cartItem.quantity}
          </div>
          <div
            className="basis-1/3 flex justify-center items-center cursor-pointer bg-gray-200"
            onClick={() => {
              if (product) {
                dispatch(addOneItem(product));
              } else {
                toast.error("Product doesn't exist in the database");
              }
            }}
          >
            +
          </div>
        </div>
      </td>
      <td>
        <div
          className="flex justify-center cursor-pointer"
          onClick={() => {
            if (product) {
              dispatch(deleteItem(product));
            } else {
              toast.error("Product doesn't exist in the database");
            }
          }}
        >
          <i className="ri-delete-bin-line"></i>
        </div>
      </td>
      <td className="text-center font-bold min-w-[90px]">
        ${cartItem.totalPrice}
      </td>
    </tr>
  );
};

export default Tr;
