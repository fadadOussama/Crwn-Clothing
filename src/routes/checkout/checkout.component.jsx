import React, { useContext } from "react";
import { productContext } from "../../components/context/product.context";
import { TrashIcon, ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function Checkout() {
  let { productVal, setProductVal, productCount, setProductCount } = useContext(productContext);

  let countTotal = () => {
    let count = 0;
    productVal.map((productItem) => {
      count += productItem.price * productItem.quantity;
    });
    return count;
  };

  let total = countTotal();

  const handleDeleteProduct = (e) => {
    const productId = e.currentTarget.getAttribute("data-value");

    setProductVal(
      productVal.filter((productItem) => {
        if (productItem.id === +productId) {
          if (productItem.quantity !== 1) {
            setProductCount(productCount - productItem.quantity);
          } else {
            setProductCount(productCount - 1);
          }
        }
        if (productItem.id !== +productId) {
          return productItem;
        }
      })
    );
  };

  const increaseQuantity = (e) => {
    const productId = e.currentTarget.getAttribute("data-value");
    let quantityProduct = {};
    let productValCopy = [];
    let quantityCount = 1;

    productVal.map((productItem) => {
      if (productItem.id === +productId) {
        quantityProduct = { ...productItem, quantity: productItem.quantity + 1 };
        productValCopy.push(quantityProduct);
      } else {
        productValCopy.push(productItem);
      }
      quantityCount += productItem.quantity;
    });

    setProductVal(productValCopy);
    setProductCount(quantityCount);
  };

  const decreaseQuantity = (e) => {
    const productId = e.currentTarget.getAttribute("data-value");
    let quantityProduct = {};
    let productValCopy = [];
    let quantityCount = 1;

    productVal.map((productItem) => {
      if (productItem.id === +productId) {
        quantityProduct = { ...productItem, quantity: productItem.quantity - 1 };
        productValCopy.push(quantityProduct);
      } else {
        productValCopy.push(productItem);
      }

      quantityCount -= productItem.quantity;
    });

    setProductVal(productValCopy);
    setProductCount(quantityCount * -1);
  };

  return (
    <>
      {productVal.length === 0 ? (
        <p>No items to showcase</p>
      ) : (
        <div>
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
              {productVal.map((product) => {
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
          <div className="w-[1000px] text-right m-auto mt-10 text-[30px] lining-nums">TOTAL : {total}$</div>
        </div>
      )}
    </>
  );
}
