import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [editProductId, setEditProductId] = useState(null);
  const [editProductData, setEditProductData] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const fetchList = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backendUrl}/api/product/list?page=${page}`
      );
      if (response.data.success) {
        setList(response.data.products);
        setTotalPages(response.data.totalPages);
      } else {
        toast.error(response.data.message || "Failed to load products.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/product/remove`, {
        data: { id },
        headers: { token },
      });
      if (response.data.success) {
        toast.success(response.data.message || "Product deleted.");
        setList((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error(response.data.message || "Delete failed.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const editProduct = (id) => {
    const product = list.find((item) => item._id === id);
    if (product) {
      setEditProductId(id);
      setEditProductData(product);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setImage(null); // Optional new image
    }
  };

  const handleProductUpdate = async (e) => {
    e.preventDefault();

    if (!name || !description || !price) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    if (image) formData.append("image", image);

    try {
      const response = await axios.put(
        `${backendUrl}/api/product/update/${editProductId}`,
        formData,
        { headers: { token } }
      );

      if (response.data?.success) {
        toast.success(response.data.message || "Product updated successfully.");
        setEditProductId(null);
        setEditProductData(null);
        fetchList(currentPage);
      } else {
        toast.error(response.data.message || "Update failed.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchList(currentPage);
  }, [currentPage]);

  return (
    <>
      <h2 className="mb-4 text-3xl font-semibold text-green-500">All Products List</h2>

      {/* --- Edit Form --- */}
      {editProductId && (
        <div className="mb-6">
          <form onSubmit={handleProductUpdate} className="flex flex-col gap-3">
            <div>
              <p className="mb-2">Upload Image (optional)</p>
              <label htmlFor="image" className="inline-block">
                <img
                  className="w-20 cursor-pointer"
                  src={
                    !image
                      ? editProductData?.image[0]
                      : URL.createObjectURL(image)
                  }
                  alt="Product"
                />
                <input
                  type="file"
                  id="image"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            </div>

            <div className="w-full max-w-[500px]">
              <label className="mb-2 block">Product Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border"
                type="text"
                required
              />
            </div>

            <div className="w-full max-w-[500px]">
              <label className="mb-2 block">Product Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border"
                required
              />
            </div>

            <div>
              <label className="mb-2 block">Product Price</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 sm:w-[120px] border"
                type="number"
                required
              />
            </div>

            <div className="flex gap-6 mt-4">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                UPDATE
              </button>
              <button
                type="button"
                onClick={() => setEditProductId(null)}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                Back to List
              </button>
            </div>
          </form>
        </div>
      )}

      {loading && <p>Loading...</p>}

      {!editProductId && (
        <div className="flex flex-col gap-2">
          <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_2fr] items-center py-2 px-2 border bg-gray-100 text-sm">
            <b>Image</b>
            <b>Name</b>
            <b>Price</b>
            <b className="text-center">Actions</b>
          </div>

          {list.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-[1fr_2fr_1fr_2fr] items-center py-2 px-2 border-b"
            >
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-16 h-16 object-cover"
              />
              <p>{item.name}</p>
              <p>
                {currency}
                {item.price}
              </p>

              <div className="flex justify-center gap-[8rem]">
                <button
                  className="text-gray-600 hover:text-green-600 transition-transform hover:scale-110"
                  onClick={() => editProduct(item._id)}
                  title="Edit"
                >
                  <FaEdit size={30} />
                </button>
                <button
                  className="text-gray-600 hover:text-red-500 transition-transform hover:scale-110"
                  onClick={() => removeProduct(item._id)}
                  title="Delete"
                >
                  <AiTwotoneDelete size={30} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default List;
