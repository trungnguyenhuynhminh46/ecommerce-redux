import React, { useState } from "react";
import { Control, FieldValues, useController } from "react-hook-form";
import Icons from "./Icons";

interface InputProps {
  type: string;
  name: string;
  id: string;
  autoComplete?: string;
  placeholder?: string;
  defaultValue: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  control: Control<FieldValues, any>;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  id,
  autoComplete = "off",
  placeholder = "",
  defaultValue,
  onChange,
  control,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { field } = useController({
    name,
    control,
    defaultValue: defaultValue || "",
  });
  //   Effect
  // Handlers
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="w-full outline-none p-2 rounded border border-solid border-gray-300 transition-all duration-300 ease-linear focus-within:border-gray-500 relative">
      <input
        {...field}
        {...props}
        type={showPassword ? "text" : type}
        id={id}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full border-none outline-none"
      />
      {type === "password" && (
        <div
          className="cursor-pointer absolute right-[20px] top-1/2 -translate-y-1/2"
          onClick={togglePassword}
        >
          {showPassword ? (
            <Icons.Eye className="w-5 h-5" />
          ) : (
            <Icons.EyeSlash className="w-5 h-5" />
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
