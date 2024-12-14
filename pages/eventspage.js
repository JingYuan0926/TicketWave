import React from "react";
import { useRouter } from "next/router";

export default function Eventspage() {
  const router = useRouter();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <section className="relative bg-gray-200">
        <div className="relative flex justify-center">
          <img
            src="https://assets.teenvogue.com/photos/64f0a106a683b28e919ea05c/16:9/w_2560%2Cc_limit/GettyImages-1604947670.jpg"
            alt="Event Background"
            className="w-full h-64 object-cover object-[center_100%]"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute bottom-0 left-0 right-0 px-4 py-4 bg-white shadow-md">
            <div className="container mx-auto">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src="https://assets.teenvogue.com/photos/64f0a106a683b28e919ea05c/16:9/w_2560%2Cc_limit/GettyImages-1604947670.jpg"
                    alt="Event Thumbnail"
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex flex-col justify-center">
                    <h1 className="text-xl font-bold text-gray-800 mb-1">
                      Taylor Swift | The Eras Tour
                    </h1>
                    <p className="text-gray-700 text-sm">
                      Experience all of Taylor's eras in one unforgettable
                      night!{" "}
                      <a href="#" className="text-blue-500 hover:text-blue-600">
                        See More
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Total Volume: 450 ETH</span>
                  <span>Capped Price: 2.5 ETH</span>
                  <span>Floor Price: 1.2 ETH</span>
                  <span>Listed: 1250</span>
                  <span>Owners: 2300</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center mt-2 text-sm text-gray-600">
                <span className="mr-4">Created Date: 2024-08-03</span>
                <span className="mr-4">Total NFTs (Tickets): 5000</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-4 bg-white border-b">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input type="radio" name="status" defaultChecked />
              <span>Live</span>
            </label>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded px-3 py-2"
            />
            <select className="border border-gray-300 rounded px-3 py-2">
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded">
                VIP
              </button>
              <button className="px-4 py-2 bg-gray-200 rounded">Floor</button>
              <button className="px-4 py-2 bg-gray-200 rounded">Seated</button>
            </div>
          </div>
        </div>
      </section>

      {/* Ticket Grid Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-6">
            {Array.from({ length: 20 }).map((_, index) => {
              const randomPrice = (
                Math.random() * (1.893 - 1.655) +
                1.655
              ).toFixed(3);
              return (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded p-4 text-center border-2 border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
                  onClick={() => router.push("/ticketdetails")}
                >
                  <img
                    src="https://assets.teenvogue.com/photos/64f0a106a683b28e919ea05c/16:9/w_2560%2Cc_limit/GettyImages-1604947670.jpg"
                    alt="Concert Ticket"
                    className="h-32 w-full object-cover mb-4"
                  />
                  <p className="font-semibold">
                    Ticket ID: #TS2024-VIP-{1842 + index}
                  </p>
                  <p>Owner: 0x7a58c0be72be...736c71</p>
                  <p>Price: {randomPrice} ETH</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pagination Section */}
      <section className="py-4">
        <div className="container mx-auto px-4 text-center">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Next
          </button>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
}
