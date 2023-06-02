/* eslint-disable react/prop-types */
import React from "react";
import CategoryItem from "../category-item/category-item.component";
import "./category-case.css";

const CategoryCase = ({ categories }) => {
  return (
    <div className="case w-full md:flex flex-wrap justify-between mt-[10px]">
      {categories.map(({ title, id, imageUrl }) => {
        return <CategoryItem key={id} title={title} imageUrl={imageUrl} />;
      })}
    </div>
  );
};

export default CategoryCase;
