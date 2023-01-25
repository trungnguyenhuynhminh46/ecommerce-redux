import React, { useEffect, useState } from "react";
import useCollectionQuery from "../hooks/useCollectionQuery";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../share/firebase";
// Components
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Products = () => {
  const navigate = useNavigate();
  const {
    data: productsSnapshot,
    loading: productsIsLoading,
    error: productsHaveError,
  } = useCollectionQuery(
    "all-products",
    query(collection(db, "products"), orderBy("createdAt", "desc"))
  );
  // States
  const [products, setProducts] = useState<any[]>([]);
  // Effects
  useEffect(() => {
    if (productsSnapshot) {
      const prodsList: any[] = [];
      productsSnapshot?.forEach((doc) => {
        prodsList.push({ id: doc.id, ...doc.data() });
      });
      setProducts(prodsList);
    }
    if (!products) {
      setProducts([]);
    }
  }, [productsSnapshot]);
  // Handlers
  const getPathStorageFromURL = (url: String) => {
    const baseUrl = import.meta.env.VITE_FIREBASE_STORAGE || "";

    let imagePath: string = url.replace(baseUrl, "");

    const indexOfEndPath = imagePath.indexOf("?");

    imagePath = imagePath.substring(0, indexOfEndPath);

    imagePath = decodeURIComponent(imagePath);

    return imagePath;
  };

  const handleDeleteImageFromURL = async (url: string) => {
    try {
      const imagePath = getPathStorageFromURL(url);
      // console.log(imagePath);
      const imageRef = ref(storage, imagePath);
      // Delete the file
      await deleteObject(imageRef);
    } catch (err: any) {
      const message = err.message;
      toast.error(message);
    }
  };

  const handleDeleteProduct = async (product_id: string) => {
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
        const docSnap = await getDoc(doc(db, "products", product_id));
        const product: any = { id: docSnap.id, ...docSnap.data() };
        // Delete product picture
        if (product.imgURL) {
          await handleDeleteImageFromURL(product.imgURL);
        }
        // Delete product
        await deleteDoc(doc(db, "products", product_id));
        toast.success("The product has been deleted");
      }
    } catch (error: any) {
      const message = error.message;
      toast.error(message);
    }
  };
  const handleUpdateProduct = (product_id: string) => {
    navigate(`/dashboard/products/${product_id}`);
  };
  return (
    <Layout>
      <section>
        <div className="container my-10">
          {/* Operation: paginate, filter, search */}
          <div>
            <Link
              to="/dashboard/products/add_product"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Add product
            </Link>
          </div>
          {/* Products table */}
          <div className="custom-table mt-12">
            {productsIsLoading && (
              <div className="h-[300px] flex justify-center items-center">
                <div className="w-[30px] h-[30px] rounded-[50%] border-4 border-deep-blue border-t-transparent animate-spin"></div>
              </div>
            )}
            {!productsIsLoading && products && products.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3 hidden sm:table-cell">
                      Product info
                    </th>
                    <th className="px-6 py-3 hidden md:table-cell">Price</th>
                    <th className="px-6 py-3 hidden lg:table-cell">
                      Short Description
                    </th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    return (
                      <tr key={product.id}>
                        <td className="px-6 py-4">
                          {product.id.slice(0, 10) + "..."}
                        </td>
                        <td className="px-6 py-4 hidden sm:table-cell">
                          <div className="flex gap-4">
                            <div className="flex justify-center items-center">
                              <img
                                src={product.imgURL}
                                alt=""
                                className="w-[60px] h-auto"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <span className="text-lg font-semibold">
                                {product.productName}
                              </span>
                              <span>{product.category?.categoryName}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          ${product.price}
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          {product.shortDesc.slice(0, 20) + "..."}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-5">
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => {
                                handleUpdateProduct(product.id);
                              }}
                            >
                              Update
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => {
                                handleDeleteProduct(product.id);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            {!productsIsLoading && (!products || products?.length === 0) && (
              <div className="h-[300px] flex justify-center items-center">
                <h1 className="text-2xl font-semibold">
                  There's no product yet
                </h1>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
