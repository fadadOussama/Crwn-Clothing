import React from "react";
import { TrashIcon, ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { calc } from "../../store/counter/counterSlice";
import { setData } from "../../store/product/productSlice";
import PaymentForm from "../../components/payment-form/payment-form.component";

export let countTotal = (item) => {
  let count = 0;
  item.map((productItem) => {
    count += productItem.price * productItem.quantity;
  });
  return count;
};

export default function Checkout() {
  const dispatch = useDispatch();
  const { counter, product } = useSelector((state) => state);

  let total = countTotal(product);

  const handleDeleteProduct = (e) => {
    if (product.length === 1) {
      Cookies.set("cart", JSON.stringify([]), { expires: 7 });
      Cookies.set("counter", JSON.stringify(0), { expires: 7 });
    }

    const productId = e.currentTarget.getAttribute("data-value");

    dispatch(
      setData(
        product.filter((productItem) => {
          if (productItem.id === +productId) {
            if (productItem.quantity !== 1) {
              dispatch(calc(counter - productItem.quantity));
            } else {
              dispatch(calc(counter - 1));
            }
          }
          if (productItem.id !== +productId) {
            return productItem;
          }
        })
      )
    );
  };

  const increaseQuantity = (e) => {
    const productId = e.currentTarget.getAttribute("data-value");
    let quantityProduct = {};
    let productValCopy = [];
    let quantityCount = 1;

    product.map((productItem) => {
      if (productItem.id === +productId) {
        quantityProduct = { ...productItem, quantity: productItem.quantity + 1 };
        productValCopy.push(quantityProduct);
      } else {
        productValCopy.push(productItem);
      }
      quantityCount += productItem.quantity;
    });

    dispatch(setData(productValCopy));
    dispatch(calc(quantityCount));
  };

  const decreaseQuantity = (e) => {
    const productId = e.currentTarget.getAttribute("data-value");
    let quantityProduct = {};
    let productValCopy = [];
    let quantityCount = 1;

    product.map((productItem) => {
      if (productItem.id === +productId) {
        quantityProduct = { ...productItem, quantity: productItem.quantity - 1 };
        productValCopy.push(quantityProduct);
      } else {
        productValCopy.push(productItem);
      }

      quantityCount -= productItem.quantity;
    });

    dispatch(setData(productValCopy));
    dispatch(calc(quantityCount * -1));
  };

  return (
    <>
      {product.length === 0 ? (
        <p>No items to showcase</p>
      ) : (
        <div className="overflow-x-auto">
          <table width="1000px" className="mx-auto">
            <thead className="">
              <tr>
                <th>Product</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {product.map((product) => {
                const { imageUrl, name, quantity, price, id } = product;
                return (
                  <tr key={id} className="text-center border-t border-b border-black">
                    <td className="w-[15%] object-cover h-[40px]">
                      <img src={imageUrl} alt="product_img" className="w-full select-none" />
                    </td>
                    <td className="font-medium">{name}</td>
                    <td className="lining-nums">
                      <ChevronLeftIcon
                        width={20}
                        className={`inline-block cursor-pointer ${quantity === 1 && "pointer-events-none text-gray-300"}`}
                        data-value={id}
                        onClick={decreaseQuantity}
                      />
                      <span className="text-[14px] mx-2 select-none">{quantity}</span>
                      <ChevronRightIcon width={20} className="inline-block cursor-pointer" data-value={id} onClick={increaseQuantity} />
                    </td>
                    <td className="lining-nums select-none">{price}</td>
                    <td>
                      <button className="text-black cursor-pointer" data-value={id} onClick={handleDeleteProduct}>
                        <TrashIcon width={20} values={product} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="w-[1000px] text-right m-auto mt-10 text-[30px] lining-nums mb-12">TOTAL : {total}$</div>
          <PaymentForm />
        </div>
      )}
    </>
  );
}
