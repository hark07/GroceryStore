import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency, addToCart } = useContext(ShopContext);

  return (
    <div className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer border p-2 rounded-md">
      <Link className="text-gray-700 w-full" to={`/product/${id}`}>
        <div className="group relative bg-gray-100 rounded-lg w-full h-52 flex items-center justify-center overflow-hidden">
          <img
            className="group-hover:scale-105 transition-transform object-contain w-4/5 h-4/5 md:w-full md:h-full"
            src={image?.[0] || "/placeholder.png"}
            alt={name}
            loading="lazy"
            decoding="async"
          />

          <button
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-red-100 transition-colors"
            aria-label="Add to wishlist"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-4 w-4 text-gray-500 transition-colors hover:text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733C11.285 4.876 9.623 3.75 7.688 3.75 5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
        </div>

        <p className="md:text-base font-medium pt-2 w-full truncate">{name}</p>

        <div className="flex items-center gap-2">
          <p className="text-xs">5.0</p>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            
          </div>
        </div>
      </Link>

      <div className="flex items-end justify-between w-full mt-1">
        <p className="text-base font-medium">
          {currency}
          {price}
        </p>
        <button
          onClick={() => addToCart(id)}
          className="max-sm:hidden px-4 py-1.5 text-gray-600 border border-gray-300 rounded-full text-xs hover:bg-slate-50 transition"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
