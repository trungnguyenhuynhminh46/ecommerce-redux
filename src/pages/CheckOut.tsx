import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectTotalAmount,
  selectTotalPayment,
} from "../redux/selectors";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { deleteAllItem } from "../redux/slices/cartSlice";
import { getDoc, serverTimestamp } from "firebase/firestore";
// Components
import Layout from "../components/Layout";
import Input from "../components/Input";
import Swal from "sweetalert2";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../share/firebase";
import { useAuth } from "../context/authContext";

const tax_ratio = 0.1; // 10%
const schema = yup.object({
  fullName: yup
    .string()
    .required("Please enter your full name")
    .min(5, "Full name must have at least 5 characters"),
  email: yup
    .string()
    .required("Please enter your email")
    .email("The email you enter in a wrong format!"),
  phoneNumber: yup
    .string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    ),
  streetAddress: yup
    .string()
    .required("Please enter your street address")
    .min(5, "Street address must have at least 5 characters"),
  city: yup
    .string()
    .required("Please enter your city")
    .min(5, "Your city name must have at least 5 characters"),
  postalCode: yup
    .string()
    .length(5)
    .matches(/^[0-9]{5}/, "Postal code is not valid")
    .required("Please enter your Postal code"),
  country: yup
    .string()
    .required("Please enter your country")
    .min(5, "Your country name must have at least 5 characters"),
});

const CheckOut = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef<any>();
  const subTotal = useSelector(selectTotalPayment);
  const quantity = useSelector(selectTotalAmount);
  const taxing = tax_ratio * subTotal;
  const total_cost = subTotal + taxing;
  const cart_items = useSelector(selectCartItems);
  // Check if cart have any item
  useEffect(() => {
    if (quantity === 0) {
      navigate("/");
      toast.error("No items in cart");
    }
  }, []);
  // States
  const [userInfo, setUserInfo] = useState<any>(undefined);
  useEffect(() => {
    (async () => {
      if (currentUser.uid) {
        const user_id = currentUser.uid;
        const docSnap = await getDoc(doc(db, "users", user_id));
        if (docSnap.exists()) {
          setUserInfo({ id: docSnap.id, ...docSnap.data() });
        }
      }
    })();
  }, [currentUser]);

  // Handlers
  // React hooks form
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (userInfo) {
      let defaultValues: any = {};
      defaultValues.email = userInfo.email;
      reset(defaultValues);
    }
  }, [userInfo]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (userInfo) {
        const {
          order_id,
          total_payment,
          email,
          fullName,
          phoneNumber,
          streetAddress,
          city,
          postalCode,
          country,
        } = data;
        // set order document
        await setDoc(doc(db, "orders", order_id), {
          cart_items,
          quantity,
          total_payment,
          email,
          fullName,
          phoneNumber,
          streetAddress,
          city,
          postalCode,
          country,
          createdAt: serverTimestamp(),
          status: "waiting",
        });
        // Send email
        emailjs.sendForm(
          "service_wigfx2t",
          "template_mtng3lb",
          formRef.current,
          "UacrM18BertjSOKq8"
        );
        // Success: clear cart, alert (OK), redirect (OK)

        const result = await Swal.fire({
          icon: "success",
          title: "Order confirmed, please check the email",
          timer: 3000,
          confirmButtonText: "OK",
        });
        if (result.isConfirmed) {
          dispatch(deleteAllItem(undefined));
          navigate("/");
        }
        navigate("/");
      }
    } catch (err: any) {
      const mesage = err.message;
    }
  });
  return (
    <Layout>
      <section>
        <div className="container">
          <form
            ref={formRef}
            action="#"
            onSubmit={onSubmit}
            className="flex flex-col lg:flex-row gap-10 py-10"
          >
            {/* Customer info */}
            <div className=" basis-2/3">
              <h4 className="font-bold mb-5">Billing information</h4>
              <input
                type="hidden"
                id="order_id"
                value={uuid()}
                {...register("order_id")}
              />
              <input
                type="hidden"
                id="total_payment"
                value={total_cost}
                {...register("total_payment")}
              />
              <div className="input-group">
                <Input
                  type="text"
                  name="fullName"
                  id="fullName"
                  control={control}
                  placeholder="Please enter your full name"
                />
                <div className="min-h-[20px]">
                  <p className="text-sm text-red-600">
                    {errors.fullName?.message?.toString()}
                  </p>
                </div>
              </div>
              <div className="input-group">
                <Input
                  type="text"
                  name="email"
                  id="email"
                  control={control}
                  placeholder="Please enter your email"
                  readOnly={true}
                />
                <div className="min-h-[20px]">
                  <p className="text-sm text-red-600">
                    {errors.email?.message?.toString()}
                  </p>
                </div>
              </div>
              <div className="input-group">
                <Input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  control={control}
                  placeholder="Please enter your phone number"
                />
                <div className="min-h-[20px]">
                  <p className="text-sm text-red-600">
                    {errors.phoneNumber?.message?.toString()}
                  </p>
                </div>
              </div>
              <div className="input-group">
                <Input
                  type="text"
                  name="streetAddress"
                  id="streetAddress"
                  control={control}
                  placeholder="Please enter your street address"
                />
                <div className="min-h-[20px]">
                  <p className="text-sm text-red-600">
                    {errors.streetAddress?.message?.toString()}
                  </p>
                </div>
              </div>
              <div className="input-group">
                <Input
                  type="text"
                  name="city"
                  id="city"
                  control={control}
                  placeholder="Please enter your city"
                />
                <div className="min-h-[20px]">
                  <p className="text-sm text-red-600">
                    {errors.city?.message?.toString()}
                  </p>
                </div>
              </div>
              <div className="input-group">
                <Input
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  control={control}
                  placeholder="Please enter your postal Code"
                />
                <div className="min-h-[20px]">
                  <p className="text-sm text-red-600">
                    {errors.postalCode?.message?.toString()}
                  </p>
                </div>
              </div>
              <div className="input-group">
                <Input
                  type="text"
                  name="country"
                  id="country"
                  control={control}
                  placeholder="Please enter your country"
                />
                <div className="min-h-[20px]">
                  <p className="text-sm text-red-600">
                    {errors.country?.message?.toString()}
                  </p>
                </div>
              </div>
            </div>
            {/* Bill info */}
            <div className="basis-1/3 p-5 bg-deep-blue rounded text-white text-sm flex flex-col gap-4 h-[300px]">
              <div className="flex justify-between">
                <span>Total Qty:</span>
                <span>{quantity}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxing:</span>
                <span>${taxing}</span>
              </div>
              <div className="flex justify-between p-5 border-y border-y-solid border-y-gray-200 text-2xl">
                <span>Total Cost:</span>
                <span>${total_cost}</span>
              </div>
              <button className="py-2 my-4 text-sm text-black font-semibold flex justify-center items-center w-full bg-white rounded">
                <span>Place an order</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default CheckOut;
