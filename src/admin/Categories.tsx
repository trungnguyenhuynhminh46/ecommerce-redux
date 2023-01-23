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
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
// Types
import { Category } from "../share/types";
// Assets
import { db } from "../share/firebase";
// Components
import Label from "../components/Label";
import Input from "../components/Input";
import Swal from "sweetalert2";

const schema = yup.object({
  categoryName: yup.string().required("Please enter the category name"),
});

const Categories = () => {
  const { data, loading, error } = useCollectionQuery(
    "all-categories",
    query(collection(db, "categories"), orderBy("createdAt", "desc"))
  );
  // States
  const [categories, setCategories] = useState<Category[]>([]);
  // Effect
  useEffect(() => {
    if (!data?.empty) {
      const catsList: any[] = [];
      data?.forEach((doc) => {
        catsList.push({ id: doc.id, ...doc.data() });
      });
      setCategories(catsList);
    }
    if (data?.empty) {
      setCategories([]);
    }
  }, [data]);
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
    } catch (error: any) {
      const message = error.message;
      toast.error(message);
    }
  };
  return (
    <section className="min-h-[300px]">
      <div className="container">
        <div className="grid grid-cols-2 gap-5">
          <div className="custom-table my-12">
            {loading && (
              <div className="h-[300px] flex justify-center items-center">
                <div className="w-[30px] h-[30px] rounded-[50%] border-4 border-deep-blue border-t-transparent animate-spin"></div>
              </div>
            )}
            {!loading && categories && categories.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">Category Name</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id}>
                      <td className="px-6 py-4">{category.id}</td>
                      <td className="px-6 py-4">{category.categoryName}</td>
                      <td className="px-6 py-4">
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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
            )}
            {!loading && (!categories || categories?.length === 0) && (
              <div className="flex justify-center items-center">
                <h1 className="text-2xl font-semibold">
                  There's no category yet
                </h1>
              </div>
            )}
          </div>
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
        </div>
      </div>
    </section>
  );
};

export default Categories;
