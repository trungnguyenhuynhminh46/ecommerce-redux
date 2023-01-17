import React, { useState } from "react";
import { Link } from "react-router-dom";
import resetImage from "../assets/images/forgot.png";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
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
  // States
  const [email, setEmail] = useState("");
  // Handlers
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);
    } catch (err) {
      console.log(err);
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
              <Input
                type="text"
                name="email"
                id="email"
                defaultValue={email}
                onChange={handleChangeEmail}
                control={control}
              />
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
