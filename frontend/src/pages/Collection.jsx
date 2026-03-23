import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);

  const applyFilter = () => {
    let productsCopy = products.slice();

    // Apply search filter if search term exists and showSearch is true
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Update the state with the filtered products
    setFilterProducts(productsCopy);
  };

  // Run applyFilter whenever search term or showSearch changes
  useEffect(() => {
    applyFilter();
  }, [search, showSearch, products]);

  return (
    <div className="my-10">
      <div className="text-start py-5 text-3xl">
        <Title text1={"ALL"} text2={"PRODUCTS"} />
      </div>

      {/* Rendering Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 w-full">
        {filterProducts.length > 0 ? (
          filterProducts.map((product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No products available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Collection;
