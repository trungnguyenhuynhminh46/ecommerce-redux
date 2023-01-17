import React from "react";
import { useSelector } from "react-redux";
// Assets
import {
  selectCartItems,
  selectTotalAmount,
  selectTotalPayment,
} from "../redux/selectors";
// Components
import Common from "../components/Common";
import Tr from "../components/Tr";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const totalPayment = useSelector(selectTotalPayment);
  return (
    <div>
      <Common title="Shop cart" />
      {/* Cart */}
      <div className="container flex flex-col md:flex-row py-10">
        <table className="basis-2/3">
          <thead>
            <tr className="py-4 border-b border-solid border-gray-200">
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Delete</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((cartItem) => {
              return <Tr key={cartItem.id} cartItem={cartItem} />;
            })}
          </tbody>
        </table>
        <div className="basis-1/3 flex flex-col gap-5 mt-10 ml-10">
          <div className="flex justify-between">
            <span className="text-lg font-semibold">Subtotal</span>
            <span className="text-2xl font-bold">${totalPayment}</span>
          </div>
          <p className="text-sm text-gray-400">Taxes and shipping</p>
          <div className="flex justify-between">
            <button className="py-2 px-4 bg-deep-blue text-white rounded">
              Continue Shopping
            </button>
            <button className="py-2 px-4 bg-deep-blue text-white rounded">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
