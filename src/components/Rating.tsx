import React from "react";

interface RatingProps {
  avgRating: number;
}

const Rating: React.FC<RatingProps> = ({ avgRating }) => {
  const rounded = parseInt(avgRating.toString());
  const hasHalf = Number(avgRating) - rounded > 0;
  return (
    <div className="text-[#f39c12]">
      {[...new Array(rounded)].map((item, index) => {
        return (
          <span key={index}>
            <i className="ri-star-s-fill"></i>
          </span>
        );
      })}
      {hasHalf && (
        <span>
          <i className="ri-star-half-s-fill"></i>
        </span>
      )}
      {[...new Array(5 - (rounded + Number(hasHalf)))].map((item, index) => {
        return (
          <span key={index}>
            <i className="ri-star-s-line"></i>
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
