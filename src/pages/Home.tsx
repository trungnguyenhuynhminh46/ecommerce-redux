import React, { useEffect, useState } from "react";
// Assets
import heroImg from "../assets/images/hero-img.png";
// Components
import Layout from "../components/Layout";
import Services from "./modules/home/Services";
import Trending from "./modules/home/Trending";
import BestSeller from "./modules/home/BestSeller";
import NewArrivals from "./modules/home/NewArrivals";
import Counter from "./modules/home/Counter";
import Popular from "./modules/home/Popular";
import useCollectionQuery from "../hooks/useCollectionQuery";
import { collection, query, where } from "firebase/firestore";
import { db } from "../share/firebase";

const Home = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-hero">
        <div className="container">
          <div className="flex flex-col gap-6 py-10 md:flex-row">
            {/* content */}
            <div className="basis-1/2 flex flex-col gap-5">
              <p className="text-sm text-gray-400">Trending product in 2023</p>
              <h1 className="text-4xl font-semibold">
                Make Your Interior More Minimalistic & Modern
              </h1>
              <p className="text-sm text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit laboriosam omnis, ex repellat commodi id
                voluptatibus cum impedit delectus quam.
              </p>
              <div>
                <button className="py-2 px-4 text-white font-medium bg-gray-800 rounded">
                  SHOP NOW
                </button>
              </div>
            </div>
            {/* image */}
            <div className="basis-1/2 w-[80%] mx-auto md:w-full">
              <img src={heroImg} alt="" />
            </div>
          </div>
        </div>
      </section>
      {/* Service */}
      <div className="container">
        <Services />
      </div>
      {/* Trending products */}
      <div className="container">
        <Trending />
      </div>
      {/* Best Sellers products */}
      <div className="container">
        <BestSeller />
      </div>
      {/* Count down */}
      <section className="bg-deep-blue">
        <div className="container">
          <Counter />
        </div>
      </section>
      {/* New arrivals */}
      <div className="container">
        <NewArrivals />
      </div>
      {/* Popular */}
      <div className="container">
        <Popular />
      </div>
    </Layout>
    //
  );
};

export default Home;
