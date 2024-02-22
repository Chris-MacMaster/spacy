import { groupItemsByStore, totalCost } from "./_helpers";
import React, { useState } from "react";
import RemoveItemButton from "./RemoveItemButton";
import CheckoutCart from "./Checkout";
import ChangeQuantity from "./ChangeQuantity";
import { NavLink } from "react-router-dom";
import PaymentMethod from "./PaymentMethods";

export default function TheCart({ cart }) {
  const [purchased, setPurchased] = useState(false);
  const itemsByStore = groupItemsByStore(cart);

  return (
    <div className="flex flex-col items-center mx-4">
      <div className=" min-h-screen grid grid-cols-1 max-w-screen-lg ">
        {Object.values(cart).length !== 0 ? (
          <div className=" flex justify-between items-center self-center text-2xl my-2">
            <h2 hidden={purchased}>
              {Object.values(cart).length} items in your cart
            </h2>
            <NavLink
              to="/"
              className=" font-bold  text-orange-600 visited:text-orange-800 hover:underline"
            >
              Keep shopping
            </NavLink>
          </div>
        ) : (
          <></>
        )}

        <div className="flex my-4 py-3 px-4 bg-sky-200 rounded-xl items-center drop-shadow-lg h-fit">
          <span className=" flex flex-row items-center">
            <i className="fa-regular fa-handshake mr-4 self-cente text-teal-700 text-3xl" />{" "}
            Spacey purchase protection:
          </span>
          <span className=" text-center items-center ml-4">
            Shop confidently knowing if something goes wrong, we've got your
            back!
          </span>
        </div>

        {purchased && (
          <h2
            className="flex flex-row justify-center thasadith text-3xl fade-in"
            id="thank-you"
          >
            Thank you for your purchase!
          </h2>
        )}

        {!Object.values(cart).length && !purchased && (
          <div className="text-center">
            <h2>Your Cart is empty</h2>
            <NavLink to="/" className="discover">
              <p>Discover something unique to fill it up</p>
            </NavLink>
          </div>
        )}
        {Object.values(cart).length !== 0 ? (
          <div className="">
            <div className="">
              {Object.keys(itemsByStore).map((storeName) => (
                <div
                  key={storeName}
                  className="mb-4 shadow-xl rounded-xl p-4 border-slate-200 border-[1px]"
                >
                  <div className="flex flex-row justify-between">
                    <div className=" flex flex-row gap-4 mb-2">
                      <img
                        src={itemsByStore[storeName][0].shopImage}
                        alt="preview"
                        className=" rounded-md object-cover w-10 h-10"
                      />
                      <NavLink
                        to={`/shops/${itemsByStore[storeName][0].shopId}`}
                        className=" font-bold hover:underline text-indigo-600 visited:text-indigo-800 text-lg"
                      >
                        {storeName}
                      </NavLink>
                    </div>
                    <NavLink
                      to={`/shops/${itemsByStore[storeName][0].shopId}`}
                      className=" text-slate-500 hover:underline"
                    >
                      Contact Shop
                    </NavLink>
                  </div>

                  {itemsByStore[storeName].freeShipping ? (
                    <p className=" text-slate-500">
                      {" "}
                      Free shipping on this order.
                    </p>
                  ) : null}

                  {itemsByStore[storeName].map((product, index) => (
                    <li key={index} className="flex my-4">
                      <NavLink to={`/products/${product.productId}`}>
                        <img
                          src={product.productImage}
                          alt="preview"
                          className=" object-cover rounded-lg w-[18vmin] aspect-[3/2]"
                        />
                      </NavLink>
                      <div className="flex w-full justify-between">
                        <div className="ml-[2vmin]">
                          <NavLink
                            to={`/products/${product.id}`}
                            className=" font-bold text-lg hover:underline text-indigo-600 visited:text-indigo-800"
                          >
                            {product.name}
                          </NavLink>
                          <div className="">{product.description}</div>
                          <div className="flex h-10 my-2">
                            <ChangeQuantity
                              cartId={product.cartId}
                              quantity={product.quantity}
                              productId={product.productId}
                              available={product.available}
                            />
                            <RemoveItemButton
                              cartId={product.cartId}
                              productId={product.id}
                            />
                          </div>
                        </div>
                        <div className="ml-4 flex flex-col">
                          <span className="">
                            ${(product.price * product.quantity).toFixed(2)}
                          </span>
                          <span className=" text-sm text-slate-500">
                            {product.quantity > 1
                              ? `$${product.price} each`
                              : null}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </div>
              ))}

              <div className="w-full" hidden={!purchased}>
                <h2 className=" marcellus text-2xl text-center">
                  Thank you for your purchase
                </h2>
              </div>
            </div>

            {!purchased && (
              <div className="">
                <PaymentMethod totalCost={totalCost(cart)} />
                <CheckoutCart setPurchased={setPurchased} cartItems={cart} />
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
