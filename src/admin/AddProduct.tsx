import React, { ChangeEvent, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
// Assets
import { storage } from "../share/firebase";

// Components
import Label from "../components/Label";
import Input from "../components/Input";
import InputImage, { useInputImage } from "../components/InputImage";

const schema = yup.object({
  productName: yup.string().required("Please enter the product name"),
});
const AddProduct = () => {
  const [progress, setProgress] = useState<number>(0);
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
  const { handleSelectImage, handleDeleteImageFromURL } = useInputImage(
    watch,
    setValue,
    setProgress,
    watchProductName
  );
  // Handlers
  const onSubmit = handleSubmit(async (data: FieldValues) => {
    try {
      // console.log(data);
      const { productName, shortDesc, description, category, price, imageURL } =
        data;
      // Add product
      // ...
    } catch (err: any) {
      const message = err.message;
    }
  });

  return (
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
              <select id="category" {...register("category")}>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
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
  );
};

export default AddProduct;
