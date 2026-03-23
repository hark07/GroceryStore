import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Used to extract product ID from the URL
import { ShopContext } from "../context/ShopContext"; // Global context for products and cart actions
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  //  Get product ID from the URL
  const { productId } = useParams();

  //  Get data/functions from global context
  const { products, currency, addToCart } = useContext(ShopContext);

  //  Local state for selected product and current image
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");

  // 🔍 Fetch the product details from all products
  const fetchProductData = () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]); // Set default display image
      }
    });
  };

  // On mount or if productId changes, load the product
  useEffect(() => {
    fetchProductData();
  }, [productId]);

  //  Loading fallback
  if (!productData) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/*  Layout: Left Image Section - Right Info Section */}
      <div className="flex flex-col sm:flex-row gap-10">
        {/* Image Gallery */}
        <div className="flex gap-3 sm:flex-row">
          {/* Main Image */}
          <div className="border p-5 rounded-md w-full sm:w-[80%]">
            <img
              src={image}
              className="w-[350px] h-[300px] object-contain hover:scale-105 transition"
              alt="Product"
            />
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex-1">
          {/* Title */}
          <h1 className="font-semibold text-3xl">{productData.name}</h1>

          {/* Rating (Static for now) */}
          <div className="flex items-center py-2">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className="w-6 h-6 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">
              5.0
            </span>
          </div>

          {/* Price */}
          <p className="mt-4 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>

          {/* Description */}
          <p className="mt-5 text-gray-600 md:w-4/5 leading-relaxed">
            {productData.description}
          </p>

          {/* Add to Cart */}
          <div className="my-8">
            <button
              onClick={() => addToCart(productData._id)}
              className="bg-green-600 text-white px-8 py-3 text-sm rounded-md active:bg-green-700 transition"
            >
              Add To Cart
            </button>
          </div>

          {/* Extra Info */}
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-2">
            <p className="flex items-center gap-2">
              <span>✅</span> 100% Original products
            </p>
            <p className="flex items-center gap-2">
              <span>💰</span> Cash on delivery available
            </p>
            <p className="flex items-center gap-2">
              <span>🔄</span> Easy return & exchange within 7 days
            </p>
          </div>
        </div>
      </div>

      {/* Related Product */}
      <div className="my-10">
        <RelatedProduct />
      </div>
    </div>
  );
};

export default Product;
