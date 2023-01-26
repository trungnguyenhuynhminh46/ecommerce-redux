import React, { useState } from "react";
import loginImg from "../assets/images/login.png";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FieldValues, useForm } from "react-hook-form";
import { auth, db } from "../share/firebase";
import { toast } from "react-toastify";
// Components
import Layout from "../components/Layout";
import Icons from "../components/Icons";
import Input from "../components/Input";
import {
  AuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Please enter your email")
      .email("The email you enter in a wrong format!"),
    password: yup
      .string()
      .required("Please enter your password")
      .min(9, "Password must have at least 9 characters"),
  })
  .required();

const Login = () => {
  const navigate = useNavigate();
  const handleSignInWithProvider = async (provider: AuthProvider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      // Create user in database
      await setDoc(doc(db, "users", result.user.uid), {
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        role: "normal",
      });
      toast.success("Login successfully");
      navigate("/");
    } catch (err: any) {
      const errorCode = err.code;
      const errorMessage = err.message;
    }
  };

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

  const onSubmit = handleSubmit(async (data: FieldValues) => {
    try {
      const { email, password } = data;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.success("Login successfully");
      navigate("/");
    } catch (err: any) {
      const errorCode = err.code;
      const errorMessage = err.message;
      toast.error(errorMessage);
    }
  });

  return (
    <Layout>
      <section>
        <div className="container">
          <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 py-16">
            <div className="flex items-center">
              <img
                src={loginImg}
                alt=""
                className="max-w-[80%] md:max-w-full max-auto"
              />
            </div>
            {/* Form */}
            <form
              action="#"
              className="flex flex-col justify-center"
              onSubmit={onSubmit}
            >
              <h1 className="text-2xl font-bold mb-2">Hey, hello👋</h1>
              <p className="text-sm text-gray-300 mb-4">
                Enter the information you entered while registering
              </p>
              <p className="text-sm text-gray-300 mb-4">
                You don't have account yet?{" "}
                <Link to="/register" className="font-semibold text-black">
                  Create one
                </Link>
              </p>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <Input type="text" name="email" id="email" control={control} />
                <div className="min-h-[20px]">
                  <p className="text-sm text-red-600">
                    {errors.email?.message?.toString()}
                  </p>
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  control={control}
                />
                <div className="min-h-[20px]">
                  <p className="text-sm text-red-600">
                    {errors.password?.message?.toString()}
                  </p>
                </div>
              </div>
              <div className="flex justify-end py-2">
                <Link to="/reset">Forgot password?</Link>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 rounded bg-deep-blue text-white font-medium outline-none"
              >
                Login
              </button>
              {/* Spacer */}
              <div className="flex justify-center py-2">--or--</div>
              <button
                type="button"
                className="w-full py-2 px-4 rounded border border-solid border-gray-400 bg-white flex gap-4 justify-center"
                onClick={() => {
                  handleSignInWithProvider(new GoogleAuthProvider());
                }}
              >
                <Icons.Google className="w-5 h-5" />
                <span className="text-black font-medium">
                  Sign in with google
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
