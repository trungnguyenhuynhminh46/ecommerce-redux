import React from "react";

interface Props {
  htmlFor: string;
  children: React.ReactNode;
}

const Label: React.FC<Props> = ({ htmlFor, children }) => {
  return (
    <div className="text-sm font-bold">
      <label htmlFor={htmlFor}>{children}</label>
    </div>
  );
};

export default Label;
