import { useState, useContext } from "react";
import Title from "../components/Title";        // Reusable section title
import CartTotal from "../components/CartTotal"; // Component for displaying total price
import { assets } from "../assets/assets";      // Logos and icons
import { ShopContext } from "../context/ShopContext"; // Global cart/user info
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  // Local state for selected payment method
  const [method, setMethod] = useState("");

  //  Extract values from global context
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    getCartAmount,
    delivery_fee,
    products,
    clearCart,
  } = useContext(ShopContext);

  // User input form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    district: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  //Input handler for updating form fields
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Order Handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Destructure user info
    const {
      firstName, lastName, email, district,
      city, state, zipCode, country, phone,
    } = formData;

    // Validate input
    if (!firstName || !lastName || !email || !district || !city || !state || !zipCode || !country || !phone) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Prepare order items
    let orderItems = [];
    for (const [itemId, quantity] of Object.entries(cartItems)) {
      if (quantity > 0) {
        const itemInfo = products.find((product) => product._id === itemId);
        if (itemInfo) {
          orderItems.push({ ...itemInfo, quantity });
        }
      }
    }

    // Validate payment method
    if (!method) {
      toast.warning("Please select a payment method");
      return;
    }

    // Final order data structure
    const orderData = {
      address: formData,
      items: orderItems,
      amount: getCartAmount() + delivery_fee,
      paymentMethod: method,
      date: Date.now(),
    };

    // Only handling COD here (you can later expand to Visa or Esewa)
    if (method === "cod") {
      const codRes = await axios.post(
        `${backendUrl}/api/order/place`,
        orderData,
        { headers: { token } }
      );

      if (codRes.data.success) {
        clearCart(); // 🧹 Clear cart after order success
        toast.success("Order placed with Cash on Delivery");
        setTimeout(() => navigate("/orders"), 500); //  Redirect to orders page
      } else {
        toast.error(codRes.data.message || "Order failed.");
      }
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Delivery Form */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xs sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        {/*  Name */}
        <div className="flex gap-3 text-gray-600">
          <input name="firstName" value={formData.firstName} onChange={onChangeHandler} placeholder="First Name" className="border rounded py-1.5 px-3.5 w-full" />
          <input name="lastName" value={formData.lastName} onChange={onChangeHandler} placeholder="Last Name" className="border rounded py-1.5 px-3.5 w-full" />
        </div>

        {/* Email */}
        <input name="email" value={formData.email} onChange={onChangeHandler} placeholder="Email Address" className="border rounded py-1.5 px-3.5 w-full text-gray-600" />

        {/* District */}
        <input name="district" value={formData.district} onChange={onChangeHandler} placeholder="District" className="border rounded py-1.5 px-3.5 w-full text-gray-600" />

        {/* City and State */}
        <div className="flex gap-3 text-gray-600">
          <input name="city" value={formData.city} onChange={onChangeHandler} placeholder="City" className="border rounded py-1.5 px-3.5 w-full" />
          <input name="state" value={formData.state} onChange={onChangeHandler} placeholder="State" className="border rounded py-1.5 px-3.5 w-full" />
        </div>

        {/* Zip and Country */}
        <div className="flex gap-3 text-gray-600">
          <input name="zipCode" value={formData.zipCode} onChange={onChangeHandler} placeholder="Zip Code" className="border rounded py-1.5 px-3.5 w-full" />
          <input name="country" value={formData.country} onChange={onChangeHandler} placeholder="Country" className="border rounded py-1.5 px-3.5 w-full" />
        </div>

        {/*  Phone */}
        <input name="phone" value={formData.phone} onChange={onChangeHandler} placeholder="Phone" className="border rounded py-1.5 px-3.5 w-full text-gray-600" />
      </div>

      {/*  Order Summary + Payment Options */}
      <div className="mt-8">
        <div className="min-w-80">
          <CartTotal />
        </div>

        {/* Payment Method */}
        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex gap-3 flex-col lg:flex-row">
            {/* Esewa Option */}
            <div
              onClick={() => setMethod("esewa")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "esewa" ? "bg-green-500" : ""}`} />
              <img className="h-5 mx-4" src={assets.esewa_logo} alt="Esewa" />
            </div>

            {/* Visa Option */}
            <div
              onClick={() => setMethod("visa")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "visa" ? "bg-green-500" : ""}`} />
              <p className="text-gray-600 text-sm">Visa Card</p>
            </div>

            {/* COD Option */}
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-500" : ""}`} />
              <p className="text-gray-600 text-sm">CASH ON DELIVERY</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-12 text-end">
          <button
            type="submit"
            className="bg-green-500 text-white px-16 py-3 text-sm"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
