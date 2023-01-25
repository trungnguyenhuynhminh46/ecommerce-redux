import React, { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuid } from "uuid";
import {
  collection,
  doc,
  getDoc,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../share/firebase";
import useCollectionQuery from "../hooks/useCollectionQuery";
import { useNavigate } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";
// Assets

// Components
import Layout from "../components/Layout";
import Label from "../components/Label";
import Input from "../components/Input";
import InputImage, { useInputImage } from "../components/InputImage";
import { Category } from "../share/types";
import { toast } from "react-toastify";

const schema = yup.object({
  productName: yup.string().required("Please enter the product name"),
});
const AddProduct = () => {
  const navigate = useNavigate();
  const {
    data: categoriesSnapshot,
    loading: categoriesIsLoading,
    error: categoriesHaveError,
  } = useCollectionQuery(
    "all-categories",
    query(collection(db, "categories"), orderBy("createdAt", "desc"))
  );
  // States
  const [categories, setCategories] = useState<Category[]>([]);
  // Effect
  useEffect(() => {
    if (categoriesSnapshot) {
      const catsList: any[] = [];
      categoriesSnapshot?.forEach((doc) => {
        catsList.push({ id: doc.id, ...doc.data() });
      });
      setCategories(catsList);
    }
  }, [categoriesSnapshot]);
  // React hook form
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const watchProductName = watch("productName");
  // Use Image input
  const { handleSelectImage, handleDeleteImageFromURL, progress } =
    useInputImage(watch, setValue, watchProductName);
  // Handlers
  const onSubmit = handleSubmit(async (data: FieldValues) => {
    try {
      // console.log(data);
      const {
        productName,
        shortDesc,
        description,
        categoryID,
        price,
        imageURL,
      } = data;
      // Add product
      const productID = uuid();
      const categoryDoc = await getDoc(doc(db, "categories", categoryID));
      await setDoc(doc(db, "products", productID), {
        productName,
        imgURL: imageURL,
        category: { id: categoryDoc.id, ...categoryDoc.data() },
        price,
        shortDesc,
        description,
        avgRating: 0,
        createdAt: serverTimestamp(),
      });
      toast.success("Add product successfully!");
      navigate("/dashboard/products");
    } catch (err: any) {
      const message = err.message;
      toast.error(message);
    }
  });

  return (
    <Layout>
      <section>
        <div className="container">
          <h1 className="text-2xl font-bold my-12">Add product</h1>
          <form action="#" onSubmit={onSubmit}>
            <div className="input-group">
              <Label htmlFor="productName">Product Name</Label>
              <Input
                type="text"
                name="productName"
                id="productName"
                placeholder="Iphone 13 pro max"
                control={control}
              />
              <div className="min-h-[20px]">
                <p className="text-sm text-red-600">
                  {errors.productName?.message?.toString()}
                </p>
              </div>
            </div>
            <div className="input-group">
              <Label htmlFor="shortDesc">Short Description</Label>
              <Input
                type="text"
                name="shortDesc"
                id="shortDesc"
                placeholder="Lorem, ipsum dolor..."
                control={control}
              />
              <div className="min-h-[20px]">
                <p className="text-sm text-red-600">
                  {errors.shortDesc?.message?.toString()}
                </p>
              </div>
            </div>
            <div className="input-group">
              <Label htmlFor="description">Description</Label>
              <Input
                type="text"
                name="description"
                id="description"
                placeholder="Lorem, ipsum dolor..."
                control={control}
              />
              <div className="min-h-[20px]">
                <p className="text-sm text-red-600">
                  {errors.description?.message?.toString()}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div className="input-group">
                <Label htmlFor="price">Price</Label>
                <Input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Lorem, ipsum dolor..."
                  control={control}
                />
                <div className="min-h-[20px]">
                  <p className="text-sm text-red-600">
                    {errors.price?.message?.toString()}
                  </p>
                </div>
              </div>
              <div className="input-group">
                <Label htmlFor="price">Price</Label>
                <select id="categoryID" {...register("categoryID")}>
                  {categories.map((category) => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.categoryName}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="input-group">
              <Label htmlFor="image">Product Image</Label>
              <InputImage
                name="image"
                id="image"
                className="h-[250px] w-auto max-w-[300px]"
                progress={progress}
                onChange={handleSelectImage}
                onDelete={handleDeleteImageFromURL}
                watch={watch}
                setValue={setValue}
              />
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="py-2 px-4 rounded bg-black text-white font-semibold flex justify-center items-center"
              >
                Add product
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default AddProduct;
