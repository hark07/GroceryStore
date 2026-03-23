import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    // Prepare cart data from context
    const tempData = Object.entries(cartItems)
      .map(([id, quantity]) => ({ _id: id, quantity }))
      .filter((item) => item.quantity > 0);

    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* Cart Items */}
      <div>
        {cartData.length === 0 ? (
          <p className="text-center text-gray-500 my-10">Your cart is empty.</p>
        ) : (
          cartData.map((item) => {
            const product = products.find((p) => p._id === item._id);
            if (!product) return null;

            return (
              <div
                key={item._id}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                {/* Product Info */}
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={product.image?.[0] || assets.default_image}
                    alt={product.name || "Product"}
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {product.name || "Unnamed Product"}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {product.price}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="p-2 border flex gap-4 items-center px-5 w-full sm:w-3/6">
                  <button
                    disabled={item.quantity <= 1}
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="px-3 py-1 text-xl sm:text-base"
                  >
                    -
                  </button>
                  <h2 className="text-lg sm:text-xl">{item.quantity}</h2>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="px-3 py-1 text-xl sm:text-base"
                  >
                    +
                  </button>
                </div>

                {/* Remove Icon */}
                <img
                  onClick={() => updateQuantity(item._id, 0)}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon}
                  alt="Remove"
                  title="Remove Item"
                />
              </div>
            );
          })
        )}
      </div>

      {/* Total and Checkout */}
      {cartData.length > 0 && (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="w-full text-end">
              <Link to="/place-order">
                <button className="bg-green-600 text-white text-sm my-8 px-8 py-3 hover:bg-green-700 transition">
                  PROCEED TO CHECKOUT
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
