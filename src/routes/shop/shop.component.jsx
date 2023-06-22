import React, { Fragment } from "react";
import ShopCard from "../../components/shop-card/shop-card.component";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Shop() {
  const { data } = useSelector((state) => state.shop);

  return (
    <div className="mx-[10px]">
      {Object.keys(data).map((title) => (
        <Fragment key={title}>
          <Link to={title} className="text-[30px] font-bold my-10 text-center block">
            {title.toUpperCase()}
          </Link>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-x-6 gap-y-10">
            {data[title].map((product, index) => {
              if (index < 4) {
                return <ShopCard key={product.id} product={product} />;
              }
            })}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
