import React, { ChangeEvent, Fragment } from "react";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { storage } from "../share/firebase";

interface Props {
  name: string;
  id: string;
  className?: string;
  onChange?: any;
  onDelete?: any;
  watch: UseFormWatch<FieldValues>;
}

export const useInputImage = (
  watch: UseFormWatch<FieldValues>,
  setValue: UseFormSetValue<FieldValues>,
  setProgress: React.Dispatch<React.SetStateAction<number>>,
  imagePrefix: ""
) => {
  const getPathStorageFromURL = (url: String) => {
    const baseUrl =
      "https://firebasestorage.googleapis.com/v0/b/ecommerse-redux.appspot.com/o/";

    let imagePath: string = url.replace(baseUrl, "");

    const indexOfEndPath = imagePath.indexOf("?");

    imagePath = imagePath.substring(0, indexOfEndPath);

    imagePath = decodeURIComponent(imagePath);

    return imagePath;
  };
  const handleDeleteImageFromURL = async (url: string) => {
    try {
      const imagePath = getPathStorageFromURL(url);
      const imageRef = ref(storage, imagePath);
      // Delete the file
      await deleteObject(imageRef);
      // Reset fields
      setValue("image", null);
      setValue("imageURL", "");
      setProgress(0);
    } catch (err: any) {
      const message = err.message;
      console.log(message);
    }
  };

  const handleUploadImage = (image: any) => {
    const storageRef = ref(
      storage,
      `image/${
        imagePrefix ? imagePrefix + new Date().toISOString() : image.name
      }`
    );
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercentage);
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          setValue("imageURL", downloadURL);
        });
      }
    );
  };
  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    let image;
    if (e.target.files) {
      image = e.target.files[0];
    }
    if (image) {
      setValue("image", image);
      handleUploadImage(image);
    }
  };
  return {
    handleSelectImage,
    handleDeleteImageFromURL,
  };
};

const InputImage: React.FC<any> = ({
  name,
  id,
  className = "",
  progress = 0,
  onChange = () => {},
  onDelete = () => {},
  watch,
  ...props
}) => {
  const watchImageURL = watch("imageURL");
  return (
    <label
      className={`flex justify-center items-center cursor-pointer w-full min-h-[200px] rounded-lg border border-dashed bg-gray-100 ${className} relative overflow-hidden group`}
    >
      <input
        type="file"
        name={name}
        className="hidden-input"
        {...props}
        onChange={onChange}
      />
      {/* Display */}
      {progress !== 0 && !watchImageURL && (
        <div className="absolute z-10 w-16 h-16 rounded-full border-8 border-solid border-green-500 border-t-transparent animate-spin"></div>
      )}

      {progress === 0 && !watchImageURL && (
        <div className="flex flex-col items-center text-center pointer-events-none">
          <img src="/img-upload.png" alt="" className="max-w-[80px] mb-5" />
          <p className="font-semibold">Choose photo</p>
        </div>
      )}
      {!watchImageURL && (
        <div
          className={`absolute left-0 bottom-0 h-1 bg-green-500`}
          style={{ width: `${Math.ceil(progress)}%` }}
        ></div>
      )}
      {watchImageURL && (
        <Fragment>
          <img
            src={watchImageURL}
            className="object-cover w-full h-full"
            alt=""
          />
          <button
            type="button"
            className="absolute left-0 top-0 w-full h-full flex justify-center items-center"
            onClick={() => {
              //Delete image
              onDelete(watchImageURL);
            }}
          >
            <div className="absolute z-10 flex items-center justify-center invisible w-16 h-16 text-red-500 transition-all bg-white rounded-full opacity-0 cursor-pointer group-hover:opacity-100 group-hover:visible">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
          </button>
        </Fragment>
      )}
    </label>
  );
};

export default InputImage;
