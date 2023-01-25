import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<Props> = ({ children, className = "" }) => {
  return (
    <div className={`p-2 rounded text-sm font-semibold ${className}`}>
      {children}
    </div>
  );
};

export default Badge;
