import React from "react";
import { assets } from "../assets/assets";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-gray-700 mt-10">
      <div className="">
        {/* Logo */}
        <div className="flex justify-start">
          <img src={assets.logo} alt="FreshBite Logo" className="w-28" />
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* About Grocery Store */}
          <div>
            <h3 className="text-lg font-bold mb-3">About FreshBite</h3>
            <p className="text-sm text-gray-500">
              FreshBite delivers fresh groceries, fruits, vegetables, dairy, and pantry essentials straight to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-3">Quick Links</h3>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>
                <a href="/collection" className="hover:text-green-600 transition-colors">Shop</a>
              </li>
              <li>
                <a href="/about" className="hover:text-green-600 transition-colors">About Us</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-green-600 transition-colors">Contact</a>
              </li>
              <li>
                <a href="/faq" className="hover:text-green-600 transition-colors">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-3">Contact</h3>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>📍 Kanchanpur, Nepal</li>
              <li>📧 support@grocerystore.com</li>
              <li>📞 +977 9800000000</li>
            </ul>

            {/* Social Icons */}
            <div className="flex justify-center md:justify-start mt-4 gap-3">
              <a href="#" className="text-gray-500 hover:text-green-600 transition-colors p-2 rounded-full bg-white hover:bg-green-100">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600 transition-colors p-2 rounded-full bg-white hover:bg-green-100">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600 transition-colors p-2 rounded-full bg-white hover:bg-green-100">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600 transition-colors p-2 rounded-full bg-white hover:bg-green-100">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-3">Subscribe</h3>
            <p className="text-sm text-gray-500 mb-3">
              Get updates about fresh groceries, discounts, and exclusive offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 flex-1"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-300" />

        {/* Copyright */}
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} GroceryStore. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;