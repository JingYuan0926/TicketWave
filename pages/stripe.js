import React from "react";
import { useRouter } from "next/router";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcJcb,
  FaCreditCard,
} from "react-icons/fa";

export default function StripePage() {
  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Main Grid Layout */}
      <div className="grid grid-cols-2 gap-16">
        {/* Left Column */}
        <div>
          <div className="mb-12"></div>
          <h2 className="text-2xl font-bold mb-4">
            Taylor Swift | The Eras Tour
          </h2>
          <p className="text-lg mb-6">499.99 USD</p>
          {/* Concert image */}
          <img
            src="https://assets.teenvogue.com/photos/64f0a106a683b28e919ea05c/16:9/w_2560%2Cc_limit/GettyImages-1604947670.jpg"
            alt="Concert"
            className="w-full h-[30rem] object-cover rounded-lg"
          />
        </div>

        {/* Right Column - Payment Form */}
        <div className="border-2 border-gray-300 rounded-xl p-8 shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-6">Pay with Card</h2>
          <form className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            {/* Card Information */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="card-info"
              >
                Card Information
              </label>
              {/* Card Number Row */}
              <div className="relative">
                <input
                  id="card-info"
                  type="text"
                  placeholder="XXXX XXXX XXXX XXXX"
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
                {/* Card Type Icons */}
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
                  <FaCcVisa size={24} className="text-blue-600" />
                  <FaCcMastercard size={24} className="text-red-500" />
                  <FaCcAmex size={24} className="text-blue-400" />
                  <FaCcJcb size={24} className="text-green-600" />
                </div>
              </div>

              {/* Expiry Date and CVC in the Same Row */}
              <div className="flex gap-4 mt-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  {/* CVC Icon */}
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <FaCreditCard size={24} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Cardholder Name */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="cardholder-name"
              >
                Cardholder Name
              </label>
              <input
                id="cardholder-name"
                type="text"
                placeholder="Full Name on Card"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            {/* Country and ZIP */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="country"
                >
                  Country or Region
                </label>
                <select
                  id="country"
                  className="w-full p-3 border border-gray-300 rounded-md"
                >
                  <option value="">Country</option>
                  {/* Add country options here */}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="zip">
                  ZIP
                </label>
                <input
                  id="zip"
                  type="text"
                  placeholder="ZIP"
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* Pay Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
              >
                Pay
              </button>
            </div>
          </form>

          {/* Powered by Stripe and Links */}
          <div className="mt-6 text-sm text-gray-500 flex items-center justify-center space-x-4">
            <span>
              Powered by <span className="font-bold">Stripe</span>
            </span>
            <span>|</span>
            <a href="#" className="hover:underline">
              Terms
            </a>
            <a href="#" className="hover:underline">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
