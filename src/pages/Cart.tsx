import React from "react";
import { useSelector } from "react-redux";
// Assets
import {
  selectCartItems,
  selectTotalAmount,
  selectTotalPayment,
} from "../redux/selectors";
// Components
import Layout from "../components/Layout";
import Common from "../components/Common";
import Tr from "../components/Tr";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const totalPayment = useSelector(selectTotalPayment);
  return (
    <Layout>
      <Common title="Shop cart" />
      {/* Cart */}
      <div className="container flex flex-col md:flex-row py-10">
        <div className="custom-table basis-2/3">
          <table>
            <thead>
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Qty</th>
                <th className="px-6 py-4">Delete</th>
                <th className="px-6 py-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cartItem) => {
                return <Tr key={cartItem.id} cartItem={cartItem} />;
              })}
            </tbody>
          </table>
        </div>
        <div className="basis-1/3 flex flex-col gap-5 mt-10 ml-10">
          <div className="flex justify-between">
            <span className="text-lg font-semibold">Subtotal</span>
            <span className="text-2xl font-bold">${totalPayment}</span>
          </div>
          <p className="text-sm text-gray-400">Taxes and shipping</p>
          <div className="flex justify-around">
            <Link to="/" className="py-2 px-4 bg-deep-blue text-white rounded">
              Continue Shopping
            </Link>
            <Link
              to="/checkout"
              className="py-2 px-4 bg-deep-blue text-white rounded"
              hidden={!(totalAmount > 0)}
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
