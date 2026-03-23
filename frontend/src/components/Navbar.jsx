import { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, setToken, setCartItems } =
    useContext(ShopContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cartItems");
    setToken("");
    setCartItems([]);
    toast.success("Logout successful");

    navigate("/login"); // Immediate redirect to login page
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setToken("");
    }
  }, [setToken]);

  return (
    <>
      <div className="flex items-center justify-between py-5 font-medium">
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="w-20" />
        </Link>

        <ul className="hidden sm:flex gap-5 text-sm text-gray-800">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>HOME</p>
          </NavLink>
          <NavLink
            to="/collection"
            className="flex flex-col items-center gap-1"
          >
            <p>PRODUCTS</p>
          </NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
          </NavLink>
        </ul>

        <div className="flex items-center gap-6">
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt="search"
          />

          <div className="group relative cursor-pointer z-10">
            <img src={assets.profile_icon} className="w-5" alt="profile" />
            <div className="group-hover:block hidden absolute right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-sky-100 text-gray-500 rounded">
                <Link to="/profile" className="hover:text-black">
                  My Profile
                </Link>
                <Link to="/orders" className="hover:text-black">
                  Orders
                </Link>
                <Link
                  to="/login"
                  className="cursor-pointer hover:text-black"
                  onClick={logout}
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>

          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-5" alt="cart" />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </Link>

          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden"
            alt="menu"
          />
        </div>

        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
            visible ? "w-full" : "w-0"
          }`}
        >
          <div className="flex flex-col text-gray-600">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-3 cursor-pointer"
            >
              <img
                src={assets.dropdown_icon}
                className="h-4 rotate-180"
                alt="back"
              />
              <p>Back</p>
            </div>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border"
              to="/"
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border"
              to="/collection"
            >
              PRODUCTS
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border"
              to="/about"
            >
              ABOUT
            </NavLink>
          </div>
        </div>
      </div>

      {/* Horizontal line under navbar */}
      <hr className="border-t border-gray-200" />
    </>
  );
};

export default Navbar;
