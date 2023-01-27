import React from "react";
// Assets
import commonImage from "../assets/images/common.avif";

interface PropsCommon {
  title: string;
}

const Common: React.FC<PropsCommon> = ({ title }) => {
  return (
    <section
      className="relative w-full h-[200px] flex justify-center items-center"
      style={{
        background: "url(src/assets/images/common.avif)",
        backgroundSize: "cover",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-gray-900 opacity-60 flex justify-center items-center"></div>
      {/* Content */}
      <div className="absolute inset-0 flex justify-center items-center z-20">
        <span className="text-2xl text-white font-bold">{title}</span>
      </div>
    </section>
  );
};

export default Common;
