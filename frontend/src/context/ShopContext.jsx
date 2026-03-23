import { createContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  // Currency used throughout the shop
  const currency = "$";
  
  // Delivery fee which can be updated in the future
  const delivery_fee = 0;

  // States for search functionality
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(true);

  // Backend URL from environment variables
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // State for cart items: Loaded from localStorage if available
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || {}
  );
  
  // State for products: Fetches data from the backend
  const [products, setProducts] = useState([]);

  // User's authentication token
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const navigate = useNavigate();

  // Add item to cart: Updates the cart in localStorage and synchronizes it with the backend
  const addToCart = useCallback(
    async (itemId) => {
      setCartItems((prevCart) => {
        const updatedCart = {
          ...prevCart,
          [itemId]: (prevCart[itemId] || 0) + 1 // Adds one item or increments quantity
        };
        localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Sync with localStorage
        return updatedCart;
      });

      // If the user is logged in, sync cart data with the backend
      if (token) {
        try {
          await axios.post(
            `${backendUrl}/api/cart/add`,
            { itemId },
            {
              headers: { token }
            }
          );
        } catch (error) {
          console.log(error);
          toast.error(error.message); // Notify error
        }
      }
    },
    [token, backendUrl]
  );

  // Update quantity in cart: Updates cart data and syncs with backend
  const updateQuantity = useCallback(
    async (itemId, quantity) => {
      setCartItems((prevCart) => {
        const updatedCart = {
          ...prevCart,
          [itemId]: quantity // Sets new quantity
        };
        localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Sync with localStorage
        return updatedCart;
      });

      // If logged in, sync cart data with backend
      if (token) {
        try {
          await axios.post(
            `${backendUrl}/api/cart/update`,
            { itemId, quantity },
            {
              headers: { token }
            }
          );
        } catch (error) {
          console.log(error);
          toast.error(error.message); // Notify error
        }
      }
    },
    [token, backendUrl]
  );

  //  Get total quantity of items in the cart
  const getCartCount = useCallback(() => {
    return Object.values(cartItems).reduce(
      (total, quantity) => total + quantity, // Sum up all item quantities
      0
    );
  }, [cartItems]);

  // Get total amount for all items in the cart
  const getCartAmount = useCallback(() => {
    return Object.entries(cartItems).reduce(
      (totalAmount, [itemId, quantity]) => {
        const itemInfo = products.find((product) => product._id === itemId); // Find product in cart
        if (itemInfo && quantity > 0) {
          return totalAmount + itemInfo.price * quantity; // Add price * quantity for each item
        }
        return totalAmount;
      },
      0
    );
  }, [cartItems, products]);

  // Clear cart: Resets cart data in localStorage and backend
  const clearCart = useCallback(() => {
    setCartItems({}); // Clears local state
    localStorage.removeItem("cartItems"); // Clears localStorage

    if (token) {
      axios.post(
        `${backendUrl}/api/cart/clear`, // Optional backend route for clearing the cart
        {},
        {
          headers: { token }
        }
      ).catch(err => console.error("Error clearing cart on backend", err));
    }
  }, [token, backendUrl]);

  //  Fetch all products from the backend to populate the store
  const getProductData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`); // Fetch products from API
      if (response.data.success) {
        setProducts(response.data.products); // Populate the products list
      } else {
        toast.error(response.data.error || "Failed to fetch products"); // Show error if failed
      }
    } catch (error) {
      console.error(error.response || error);
      toast.error("Error fetching product data"); // Show error if API fails
    }
  };

  // Load product data when the component mounts
  useEffect(() => {
    getProductData();
  }, []); // Empty dependency array means this runs only once on component mount

  // Persist token in localStorage on changes
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  // Context value to pass down throughout the app
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    clearCart // Expose clearCart function
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children} {/* Passes down context to all child components */}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
