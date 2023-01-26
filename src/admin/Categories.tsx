import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, FieldValues } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import useCollectionQuery from "../hooks/useCollectionQuery";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import _ from "lodash";
import { useAuth } from "../context/authContext";
// Types
import { Category } from "../share/types";
// Assets
import { db } from "../share/firebase";
// Components
import Layout from "../components/Layout";
import Label from "../components/Label";
import Input from "../components/Input";
import Swal from "sweetalert2";
import Pagination from "../components/Pagination";

const schema = yup.object({
  categoryName: yup.string().required("Please enter the category name"),
});

const Categories = () => {
  const { currentUser } = useAuth();
  const { data, loading, error } = useCollectionQuery(
    "all-categories",
    query(collection(db, "categories"), orderBy("createdAt", "desc"))
  );
  // States
  const NUMBER_PER_PAGE = 4;
  const [userInfo, setUserInfo] = useState<any>(undefined);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  // Effect
  useEffect(() => {
    (async () => {
      const user_id = currentUser.uid;
      if (user_id) {
        const docSnap = await getDoc(doc(db, "users", user_id));
        setUserInfo({ id: docSnap.id, ...docSnap.data() });
      }
    })();
  }, [currentUser]);
  useEffect(() => {
    if (!data?.empty) {
      setCurrentPage(1);
      if (search != "") {
        const catsList: any[] = [];
        data?.forEach((doc) => {
          const cat: any = { id: doc.id, ...doc.data() };
          if (cat.categoryName.toLowerCase().includes(search.toLowerCase())) {
            catsList.push(cat);
          }
        });
        setCategories(catsList);
      } else {
        const catsList: any[] = [];
        data?.forEach((doc) => {
          const cat: any = { id: doc.id, ...doc.data() };
          catsList.push(cat);
        });
        setCategories(catsList);
      }
    }
    if (data?.empty) {
      setCategories([]);
    }
  }, [data, search]);
  // React hook form
  const { control, handleSubmit, register, watch, setValue } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  // Handlers
  const onSubmit = handleSubmit(async (data: FieldValues) => {
    try {
      const { categoryName } = data;
      const id = uuid();
      await setDoc(doc(db, "categories", id), {
        categoryName,
        createdAt: serverTimestamp(),
      });
      toast.success("Add category successfully");
    } catch (err: any) {
      const message = err.message;
      console.log(message);
    }
  });
  const handleDeleteCategory = async (category_id: string) => {
    try {
      if (userInfo && userInfo.role === "admin") {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });
        if (result.isConfirmed) {
          await deleteDoc(doc(db, "categories", category_id));
          toast.success("The category has been deleted");
        }
      }
      if (userInfo && userInfo.role !== "admin") {
        Swal.fire("You don't have permission to perform this action");
      }
    } catch (error: any) {
      const message = error.message;
      toast.error(message);
    }
  };
  const handleChangeSearch = _.debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    700
  );
  // Pagination
  const indexOfLastItem = currentPage * NUMBER_PER_PAGE - 1;
  const indexOfFirstItem = indexOfLastItem - NUMBER_PER_PAGE + 1;
  const currentCategories = categories.slice(
    indexOfFirstItem,
    indexOfLastItem + 1
  );
  return (
    <Layout>
      <section className="min-h-[300px]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <form action="#" onSubmit={onSubmit}>
              <h1 className="text-2xl font-bold my-12">Add category</h1>
              <div className="input-group">
                <Label htmlFor="categoryName">Category Name</Label>
                <Input
                  type="text"
                  control={control}
                  name="categoryName"
                  id="categoryName"
                  autoComplete="off"
                  placeholder="furniture"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="py-2 px-4 mt-8 rounded bg-black text-white font-semibold flex justify-center items-center"
                >
                  Add category
                </button>
              </div>
            </form>
            <div className="custom-table my-12 overflow-visible">
              {loading && (
                <div className="h-[300px] flex justify-center items-center">
                  <div className="w-[30px] h-[30px] rounded-[50%] border-4 border-deep-blue border-t-transparent animate-spin"></div>
                </div>
              )}
              {!loading && categories && categories.length > 0 && (
                <>
                  <div className="flex justify-center px-10 mb-5">
                    <div className="w-full flex items-center gap-2 p-2 border border-solid border-gray-300 rounded transition-all duration-300 ease-linear focus-within:border-gray-400">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                      <input
                        type="text"
                        className="basis-full border-none outline-none"
                        placeholder="Search by product's name"
                        defaultValue={search}
                        onChange={handleChangeSearch}
                      />
                    </div>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Category Name</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentCategories.map((category) => (
                        <tr key={category.id}>
                          <td className="px-6 py-4">{category.id}</td>
                          <td className="px-6 py-4">{category.categoryName}</td>
                          <td className="px-6 py-4">
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded border-none"
                              onClick={() => {
                                handleDeleteCategory(category.id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-center px-10 mt-5">
                    <Pagination
                      totalItems={categories.length}
                      itemsPerPage={NUMBER_PER_PAGE}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>
                </>
              )}
              {!loading && (!categories || categories?.length === 0) && (
                <div className="flex justify-center items-center">
                  <h1 className="text-2xl font-semibold">
                    There's no category yet
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Categories;
