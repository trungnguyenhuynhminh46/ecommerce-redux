import React, { useState } from "react";
import { Link } from "react-router-dom";
import resetImage from "../assets/images/forgot.png";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { auth } from "../share/firebase";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
// Components
import Input from "../components/Input";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Please enter your email")
      .email("The email you enter in a wrong format!"),
  })
  .required();

const Reset = () => {
  // React hook form
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { email } = data;
      await sendPasswordResetEmail(auth, email);
      toast.success(
        "Reset email was sent. Follow the direction in the email to reset your password."
      );
    } catch (err: any) {
      const message = err.message;
      toast.error(message);
    }
  });
  return (
    <section>
      <div className="container">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 py-16">
          {/* Image */}
          <div>
            <img
              src={resetImage}
              alt=""
              className="max-w-[80%] md:max-w-full max-auto"
            />
          </div>
          {/* Form */}
          <form
            action="#"
            className="flex flex-col justify-center gap-2"
            onSubmit={onSubmit}
          >
            <h1 className="text-2xl font-bold">Register</h1>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <Input type="text" name="email" id="email" control={control} />
              <div className="min-h-[20px]">
                <p className="text-sm text-red-600">
                  {errors.email?.message?.toString()}
                </p>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 mt-2 rounded bg-deep-blue text-white font-medium outline-none"
            >
              Reset password
            </button>
            <div className="flex justify-between p-4">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Reset;
