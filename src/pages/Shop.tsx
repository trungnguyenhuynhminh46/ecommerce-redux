import React, { useEffect, useState, ChangeEvent } from "react";
import useCollectionQuery from "../hooks/useCollectionQuery";
// Assets
import { db } from "../share/firebase";
// Types
import { Category } from "../share/types";
import { Product } from "../share/types";
// Components
import Layout from "../components/Layout";
import Common from "../components/Common";
import Icons from "../components/Icons";
import ProductsList from "../components/ProductsList";
import { collection, orderBy, query } from "firebase/firestore";

const Shop = () => {
  const {
    data: categoriesSnapshot,
    loading: categoriesIsLoading,
    error: categoriesHaveError,
  } = useCollectionQuery(
    "all-categories",
    query(collection(db, "categories"), orderBy("createdAt", "desc"))
  );
  const {
    data: productsSnapshot,
    loading: productsIsLoading,
    error: productsHaveError,
  } = useCollectionQuery("all-products", collection(db, "products"));
  // States
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryID, setCategoryID] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  // Effects
  // Get data
  useEffect(() => {
    if (!categoriesSnapshot?.empty) {
      const catsList: any[] = [];
      categoriesSnapshot?.forEach((doc) => {
        catsList.push({ id: doc.id, ...doc.data() });
      });
      setCategories(catsList);
    }
    if (categoriesSnapshot?.empty) {
      setCategories([]);
    }
  }, [categoriesSnapshot]);
  useEffect(() => {
    if (!productsSnapshot?.empty) {
      const prodsList: any[] = [];
      productsSnapshot?.forEach((doc) => {
        prodsList.push({ id: doc.id, ...doc.data() });
      });
      setProducts(prodsList);
    }
    if (productsSnapshot?.empty) {
      setProducts([]);
    }
  }, [productsSnapshot]);
  // Filter
  useEffect(() => {
    let filteredProductsList = [...products];
    if (!!categoryID) {
      filteredProductsList = filteredProductsList.filter(
        (product) => product.category.id === categoryID
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

    setFilteredProducts(filteredProductsList);
  }, [categoryID, sort, search, products]);

  // Handlers
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategoryID(e.target.value);
  };
  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Layout>
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
              value={categoryID}
              onChange={handleCategoryChange}
            >
              <option value="">Filter By Category</option>
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.categoryName}
                  </option>
                );
              })}
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
          {productsIsLoading && (
            <div className="h-[300px] flex justify-center items-center">
              <div className="w-[30px] h-[30px] rounded-[50%] border-4 border-deep-blue border-t-transparent animate-spin"></div>
            </div>
          )}
          {!productsIsLoading && filteredProducts.length > 0 && (
            <div className="grid-layout">
              <ProductsList products={filteredProducts} />
            </div>
          )}
          {!productsIsLoading && filteredProducts.length === 0 && (
            <div className="h-[300px] flex justify-center">
              <span className="text-2xl text-center font-semibold">
                No products found!
              </span>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
