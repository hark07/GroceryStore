import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing Order with COD or eSewa
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address, paymentMethod } = req.body;

    if (!paymentMethod) {
      return res.json({ success: false, message: "Payment method is required" });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod,
      payment: paymentMethod === "esewa", // true only if paid
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Clear user's cart after placing the order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { placeOrder, allOrders, userOrders, updateStatus };
