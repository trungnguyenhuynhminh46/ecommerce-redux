import React, { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import useDocumentQuery from "../hooks/useDocumentQuery";
import useCollectionQuery from "../hooks/useCollectionQuery";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { serverTimestamp } from "firebase/firestore";
// Assets
import Layout from "../components/Layout";
import { db } from "../share/firebase";
import { Category } from "../share/types";
import InputImage, { useInputImage } from "../components/InputImage";
import { toast } from "react-toastify";
import Label from "../components/Label";
import Input from "../components/Input";
// Components

const schema = yup.object({
  productName: yup.string().required("Please enter the product name"),
});
const UpdateProduct = () => {
  const { id: product_id } = useParams();
  const navigate = useNavigate();
  const {
    data: categoriesSnapshot,
    loading: categoriesIsLoading,
    error: categoriesHaveError,
  } = useCollectionQuery(
    "all-categories",
    query(collection(db, "categories"), orderBy("createdAt", "desc"))
  );
  const {
    data: productSnapshot,
    loading: productIsLoading,
    error: productHasError,
  } = useDocumentQuery(
    `product-${product_id}`,
    doc(db, "products", product_id || "")
  );
  // States
  const [product, setProduct] = useState<any>();
  const [categories, setCategories] = useState<Category[]>([]);
  // Effect
  useEffect(() => {
    if (productSnapshot?.exists()) {
      setProduct({ id: productSnapshot.id, ...productSnapshot.data() });
    }
    if (!productSnapshot?.exists()) {
      setProduct(null);
    }
  }, [productSnapshot]);

  useEffect(() => {
    if (categoriesSnapshot) {
      const catsList: any[] = [];
      categoriesSnapshot?.forEach((doc) => {
        catsList.push({ id: doc.id, ...doc.data() });
      });
      setCategories(catsList);
    }
  }, [categoriesSnapshot]);

  // useEffect(() => {
  //   console.log(product);
  // }, [product]);
  // useEffect(() => {
  //   console.log(categories);
  // }, [categories]);

  // React hook form
  const {
    watch,
    setValue,
    reset,
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
  // Default values
  useEffect(() => {
    if (product) {
      let defaultValues: any = {};
      defaultValues.productName = product.productName;
      defaultValues.shortDesc = product.shortDesc;
      defaultValues.imageURL = product.imgURL;
      defaultValues.description = product.description;
      defaultValues.price = product.price;
      defaultValues.categoryID = product.category?.id;
      reset(defaultValues);
    }
  }, [product]);
  // Handlers
  const onSubmit = handleSubmit(async (data: FieldValues) => {
    try {
      if (product_id) {
        // console.log(data);
        const {
          productName,
          shortDesc,
          description,
          categoryID,
          price,
          imageURL,
        } = data;
        // update product
        const categoryDoc = await getDoc(doc(db, "categories", categoryID));
        await updateDoc(doc(db, "products", product_id), {
          productName,
          imgURL: imageURL,
          category: { id: categoryDoc.id, ...categoryDoc.data() },
          price,
          shortDesc,
          description,
          avgRating: 0,
          updatedAt: serverTimestamp(),
        });
        // Alert
        toast.success("Update product successfully!");
        navigate("/dashboard/products");
      }
    } catch (err: any) {
      const message = err.message;
      toast.error(message);
    }
  });

  return (
    <Layout>
      {productIsLoading && (
        <div className="h-[300px] flex justify-center items-center">
          <div className="w-[30px] h-[30px] rounded-[50%] border-4 border-deep-blue border-t-transparent animate-spin"></div>
        </div>
      )}
      {!productIsLoading && !product && (
        <div className="h-[300px] text-2xl font-bold flex justify-center items-center">
          Sorry, but there's no product with id: {product_id}
        </div>
      )}
      {!productIsLoading && product && (
        <div className="container">
          <h1 className="text-2xl font-bold my-12">
            Update product with id: {product_id}
          </h1>
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
                  type="text"
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
                Update product
              </button>
            </div>
          </form>
        </div>
      )}
    </Layout>
  );
};

export default UpdateProduct;
