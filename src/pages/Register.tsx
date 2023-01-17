import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import registerImg from "../assets/images/register.png";
import { Link } from "react-router-dom";
import Icons from "../components/Icons";
import { useForm, FieldValues } from "react-hook-form";
import Input from "../components/Input";
import { storage } from "../share/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

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

const Register = () => {
  // State
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  // Handlers
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const image = e.target.files[0];

    const storageRef = ref(storage, "avatars/" + image.name);
    const uploadTask = uploadBytesResumable(storageRef, image);
    // Handle upload image
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          setImageURL(downloadURL);
        });
      }
    );
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
      console.log(data, imageURL);
    } catch (err) {}
  });
  return (
    <section>
      <div className="container">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 py-16">
          {/* Form */}
          <form
            action="#"
            className="flex flex-col justify-center gap-2"
            onSubmit={onSubmit}
          >
            <h1 className="text-2xl font-bold">Register</h1>
            <p className="text-sm text-gray-300 mb-4">
              Already have an account,{" "}
              <Link to="/login" className="font-semibold text-black">
                Login
              </Link>
            </p>
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
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                name="password"
                id="password"
                defaultValue={password}
                onChange={handleChangePassword}
                control={control}
              />
              <div className="min-h-[20px]">
                <p className="text-sm text-red-600">
                  {errors.password?.message?.toString()}
                </p>
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="avatar">Avatar</label>
              <input
                type="file"
                accept="image/*"
                name="avatar"
                id="avatar"
                onChange={handleUploadImage}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 mt-2 rounded bg-deep-blue text-white font-medium outline-none"
            >
              Register
            </button>
          </form>
          {/* Image */}
          <div>
            <img
              src={registerImg}
              alt=""
              className="max-w-[80%] md:max-w-full max-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
