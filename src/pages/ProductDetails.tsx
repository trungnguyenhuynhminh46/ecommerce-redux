import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addOneItem } from "../redux/slices/cartSlice";
// Assets
import allProducts from "../assets/data/products";
// Types
import { Product } from "../share/types";
// Components
import Common from "../components/Common";
import CustomRating from "../components/Rating";
import { Rating } from "react-simple-star-rating";
import { Link } from "react-router-dom";
import ProductsList from "../components/ProductsList";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // States
  const [tabName, setTabName] = useState("description");
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [sameCategory, setSameCategory] = useState<Product[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [text, setText] = useState<string>("");

  useEffect(() => {
    const chosenProduct = allProducts.find((product) => product.id === id);
    setProduct(chosenProduct);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Get the products with same category
    let filteredProducts = allProducts.filter((item) => {
      return item.category === product?.category && item.id !== product.id;
    });
    setSameCategory(filteredProducts);
  }, [product]);
  // Handlers
  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleSubmitReview = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const review = {
      name,
      rating,
      text,
    };
    console.log(review);
    // Clear state
    setName("");
    setText("");
    setRating(0);
    // Alert
  };

  return (
    <>
      {product ? (
        <>
          <Common title="Product info" />
          <div className="container">
            {/* Product detail */}
            <div className="grid gap-20 grid-cols-1 mb-24 md:grid-cols-2">
              <div className="w-[80%] md:w-full mx-auto md:min-h-[540px]">
                <img
                  src={product?.imgUrl}
                  alt=""
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="text-2xl font-semibold">
                  {product?.productName}
                </h1>
                <div className="flex gap-5 mb-5">
                  <CustomRating avgRating={product?.avgRating} />
                  <span>({product?.avgRating} ratings)</span>
                </div>
                <div className="font-medium text-xl">${product?.price}</div>
                <p className="mb-5">{product?.description}</p>
                <div>
                  <button
                    className="py-2 px-4 rounded-md text-white bg-deep-blue"
                    onClick={() => {
                      dispatch(addOneItem(product));
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
            {/* Desscription and reviews */}
            <div className="flex mb-8">
              <h1
                className={`tab ${tabName === "description" && "active"}`}
                onClick={() => {
                  setTabName("description");
                }}
              >
                Description
              </h1>
              <h1
                className={`tab ${tabName === "reviews" && "active"}`}
                onClick={() => {
                  setTabName("reviews");
                }}
              >
                Reviews ({product.reviews.length})
              </h1>
            </div>
            <div>
              {/* Description */}
              {tabName === "description" && <p>{product?.description}</p>}

              {/* Reviews */}
              {tabName === "reviews" && (
                <div className="flex flex-col gap-10">
                  {/* reviews */}
                  <div className="px-10 flex flex-col gap-4">
                    {product.reviews.map((review, index) => {
                      return (
                        <div key={index}>
                          <div className="flex gap-4">
                            <CustomRating avgRating={review.rating} />
                            <p className="text-[#f39c12] font-medium">
                              {review.rating} (rating)
                            </p>
                          </div>
                          <p>{review.text}</p>
                        </div>
                      );
                    })}
                  </div>
                  {/* write reviews */}
                  <form
                    action=""
                    className="w-full max-w-[800px] mx-auto flex flex-col gap-4"
                    onSubmit={handleSubmitReview}
                  >
                    <h4 className="text-lg font-semibold">
                      Leave your experience
                    </h4>
                    <input
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter your name"
                      className="w-full outline-none border border-solid border-gray-300 p-5"
                    />
                    <Rating
                      initialValue={rating}
                      size={20}
                      transition
                      allowFraction
                      onClick={handleRating}
                    />
                    <textarea
                      value={text}
                      onChange={(e) => {
                        setText(e.target.value);
                      }}
                      rows={10}
                      placeholder="What do you wnat to say about this product?"
                      className="w-full outline-none border border-solid border-gray-300 p-5"
                    ></textarea>
                    <div className="mt-4">
                      <button className="rounded bg-deep-blue text-white py-2 px-4">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
            {/* Products with the sam category */}
            <h1 className="header">You may also like</h1>
            <div className="grid-layout">
              <ProductsList products={sameCategory} />
            </div>
          </div>
        </>
      ) : (
        <div className="py-32 text-center text-3xl font-semibold max-w-[800px] mx-auto flex flex-col items-center gap-10">
          It seems that the product your are looking for does not exist or has
          been removed
          <Link
            to="/shop"
            className="py-2 px-4 rounded outline-none border-none bg-deep-blue text-lg font-semibold text-white flex justify-center items-center"
          >
            Back to shop
          </Link>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
