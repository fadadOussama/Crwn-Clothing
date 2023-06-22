import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import ShopCard from "../../components/shop-card/shop-card.component";
import { useSelector } from "react-redux";

function CategoryPreview() {
  const { data } = useSelector((state) => state.shop);
  const { category } = useParams();

  return (
    <div className="mx-[10px]">
      <Fragment>
        <span className="text-[30px] font-bold my-10 text-center block">{category.toUpperCase()}</span>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-x-6 gap-y-10">
          {data[category]?.map((product) => (
            <ShopCard key={product.id} product={product} />
          ))}
        </div>
      </Fragment>
    </div>
  );
}

export default CategoryPreview;
