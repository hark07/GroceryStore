// Importing necessary hooks and modules
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  // Accessing context values from global ShopContext
  const { backendUrl, token, currency } = useContext(ShopContext);

  // Local state to store transformed order data
  const [orderData, setOrderData] = useState([]);

  // Function to load order data from backend API
  const loadOrderData = async () => {
    try {
      // If token is not available (user not logged in), return early
      if (!token) return;

      // Sending POST request to fetch user orders
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      // If request was successful, process the orders
      if (response.data.success) {
        let allOrderItem = [];

        // Loop through each order and flatten the items
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            // 🏷️ Attach order-level info to each item
            item.status = order.status;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            item.date = order.date;
            item.totalPrice = item.price * item.quantity;

            allOrderItem.push(item);
          });
        });

        //  Reverse to show most recent orders first
        setOrderData(allOrderItem.reverse());
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  //  Load orders on component mount or when token changes
  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      {/* Section Title */}
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {/* List of Order Items */}
      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            {/* Left Section: Product Info */}
            <div className="flex items-start gap-6 text-sm">
              <img
                className="w-16 sm:w-20"
                src={item.image[0]}
                alt={item.name}
              />
              <div>
                {/* Item Name */}
                <p className="sm:text-base font-medium">{item.name}</p>

                {/* Price and Quantity */}
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p className="text-lg">
                    {currency}
                    {item.totalPrice}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                </div>

                {/* Order Date */}
                <p className="mt-2">
                  Date:{" "}
                  <span className="text-gray-400">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>

                {/* Payment Method */}
                <p className="mt-2">
                  Payment Method:{" "}
                  <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            {/* Right Section: Status and Actions */}
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100">
                Track Order
              </button>
            </div>
          </div>
        ))}

        {/* No Orders Case (Optional Enhancement) */}
        {orderData.length === 0 && (
          <p className="text-center text-gray-400 py-10">
            You have not placed any orders yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Orders;
