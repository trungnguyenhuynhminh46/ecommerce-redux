import React from "react";
import { useSelector } from "react-redux";
import { selectFavoriteItems } from "../redux/selectors";
import Layout from "../components/Layout";
import Common from "../components/Common";
import ProductsList from "../components/ProductsList";
import { Link } from "react-router-dom";

const WishList = () => {
  const favoriteProducts = useSelector(selectFavoriteItems);
  return (
    <Layout>
      <section>
        <Common title="Wish List" />
        <div className="container">
          {favoriteProducts.length === 0 && (
            <div className="min-h-[300px] py-[200px] flex flex-col items-center justify-start gap-10">
              <span className="text-xl font-semibold text-center ">
                Your favorite products list is empty
              </span>
              <Link
                to="/"
                className="bg-deep-blue text-white font-semibold p-4 rounded"
              >
                Continue shopping
              </Link>
            </div>
          )}

          {favoriteProducts.length > 0 && (
            <div className="grid-layout mt-10">
              <ProductsList products={favoriteProducts} />
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default WishList;
