import React from "react";
import { Link } from "react-router-dom";
import "./category-item.css";

// eslint-disable-next-line react/prop-types
const CategoryItem = ({ title, imageUrl}) => {
  return (
    <Link
      to={title}
      className="category min-w-[30%] h-[300px] flex-1 flex items-center justify-center rounded-[6px] overflow-hidden mx-[7.5px] mb-[15px] cursor-pointer group"
    >
      <div
        className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="h-[90px] px-[25px] flex flex-col items-center justify-center rounded-[6px] bg-white absolute opacity-70 transition-opacity duration-500 group-hover:opacity-90 ">
        <h2 className="font-bold mx-[6px] text-[22px] text-[#4a4a4a] uppercase">{title}</h2>
        <p className="font-extralight text-[16px]">Shop Now</p>
      </div>
    </Link>
  );
};

export default CategoryItem;
