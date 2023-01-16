import React, { useEffect, useState, ChangeEvent } from "react";
// Assets
import allProducts from "../assets/data/products";
// Types
import { Product } from "../share/types";
// Components
import Common from "../components/Common";
import Icons from "../components/Icons";
import ProductsList from "../components/ProductsList";

const Shop = () => {
  // States
  const [category, setCategory] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [productsList, setProductsList] = useState<Product[]>(allProducts);
  // Effects
  useEffect(() => {
    let filteredProductsList = [...allProducts];
    if (!!category) {
      filteredProductsList = filteredProductsList.filter(
        (product) => product.category === category
      );
    }

    if (!!sort) {
      if (sort === "asc") {
        filteredProductsList.sort((product1, product2) => {
          if (product1.productName < product2.productName) {
            return -1;
          }
          if (product1.productName > product2.productName) {
            return 1;
          }
          // Two name is equal
          return 0;
        });
      }
      if (sort === "desc") {
        filteredProductsList.sort((product1, product2) => {
          if (product1.productName > product2.productName) {
            return -1;
          }
          if (product1.productName < product2.productName) {
            return 1;
          }
          // Two name is equal
          return 0;
        });
      }
    }

    if (!!search) {
      filteredProductsList = filteredProductsList.filter((product) =>
        product.productName.toLowerCase().includes(search.toLowerCase())
      );
    }

    setProductsList(filteredProductsList);
  }, [category, sort, search]);

  // Handlers
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <section>
      <Common title="Products" />
      {/* Actions */}
      <div className="container flex flex-col gap-10 py-20 md:flex-row md:gap-40">
        <div className="flex gap-10 justify-between md:justify-start">
          {/* category */}
          <select
            name="category"
            id="category"
            className="custom-select"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">Filter By Category</option>
            <option value="sofa">Sofa</option>
            <option value="mobile">Mobile</option>
            <option value="chair">Chair</option>
            <option value="watch">Watch</option>
            <option value="wireless">Wireless</option>
          </select>
          {/* asc, desc */}
          <select
            name="sort"
            id="sort"
            className="custom-select"
            value={sort}
            onChange={handleSortChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        {/* search */}
        <div className="relative flex-1 p-4 rounded border border-solid border-gray-200">
          <input
            type="text"
            placeholder="Search"
            className="w-full border-none outline-none"
            value={search}
            onChange={handleSearchChange}
          />
          <button className="absolute right-0 top-1/2 -translate-y-1/2 p-4">
            <Icons.Search className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* List items */}
      <div className="container">
        {productsList.length > 0 ? (
          <div className="grid-layout">
            <ProductsList products={productsList} />
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="text-2xl">No products found!</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;
