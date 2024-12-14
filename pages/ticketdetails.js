import React from "react";

export default function TicketDetails() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Section: Event Image */}
          <div>
            <img
              src="https://assets.teenvogue.com/photos/64f0a106a683b28e919ea05c/16:9/w_2560%2Cc_limit/GettyImages-1604947670.jpg"
              alt="Taylor Swift Concert Ticket"
              className="w-full h-[600px] object-cover rounded shadow-lg"
            />
          </div>

          {/* Right Section: Ticket Details */}
          <div className="flex flex-col h-[600px] space-y-6">
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex flex-col h-full justify-between">
                <h2 className="text-4xl font-bold">
                  Taylor Swift | The Eras Tour
                </h2>
                <p className="text-xl font-bold text-gray-600">
                  VIP Floor Ticket
                </p>
                <p className="text-xl font-bold text-gray-600">
                  Ticket ID: #TS2024-VIP-1842
                </p>
                <p className="text-lg text-gray-600">
                  Owner: 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
                </p>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="p-6 border rounded shadow-lg">
              <p className="text-lg text-gray-600 mb-4">Ends in 2d 14h 35m</p>
              <div>
                <p className="text-xl font-semibold mb-2">Current Price</p>
                <p className="text-3xl font-bold mb-1">1.740 ETH</p>
                <p className="text-lg text-gray-600 mb-4">$3,915.32 USD</p>
                <button className="w-full px-6 py-4 bg-blue-500 text-white text-xl font-bold rounded hover:bg-blue-600 transition-colors">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Description */}
        <div className="mt-8 border p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-4">Ticket Description</h3>
          <p className="text-gray-600">
            Taylor Swift The Eras Tour - Experience all of Taylor's eras in one
            unforgettable night! This VIP Floor ticket includes premium standing
            room access, exclusive VIP entrance, commemorative VIP laminate, and
            a special merchandise package.
          </p>
          <div className="flex flex-wrap justify-between mt-4">
            <p className="text-sm text-gray-600">
              Location: SoFi Stadium, Los Angeles
            </p>
            <p className="text-sm text-gray-600">Date: August 3, 2024</p>
            <p className="text-sm text-gray-600">Time: 7:00 PM PST</p>
            <p className="text-sm text-gray-600">
              Seating Area: VIP Floor Section
            </p>
          </div>
        </div>

        {/* Details & Transaction History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Details Section */}
          <div className="border p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-4">Details</h3>
            <p className="text-sm text-gray-600">
              Contract Address: 0x495f947276749Ce646f68AC8c248420045cb7b5e
            </p>
            <p className="text-sm text-gray-600">
              Owner Address: 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
            </p>
            <p className="text-sm text-gray-600">Chain: Ethereum</p>
            <p className="text-sm text-gray-600">Token Standard: ERC-721</p>
            <p className="text-sm text-gray-600">
              Metadata: ipfs://QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/0
            </p>
          </div>

          {/* Transaction History */}
          <div className="border p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-4">Transaction History</h3>
            <div className="relative h-64 bg-white p-4">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-600 pr-2">
                <span>2.60</span>
                <span>2.50</span>
                <span>2.40</span>
                <span>2.30</span>
                <span>2.20</span>
                <span>2.10</span>
                <span>2.00</span>
                <span>1.90</span>
                <span>1.80</span>
              </div>

              {/* Graph Container */}
              <div className="w-full h-full pl-12">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 50"
                  preserveAspectRatio="none"
                >
                  {/* Horizontal Grid Lines */}
                  {[...Array(9)].map((_, i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={i * 6.25}
                      x2="100"
                      y2={i * 6.25}
                      stroke="#e5e7eb"
                      strokeWidth="0.5"
                    />
                  ))}

                  {/* Updated Gradient Fill */}
                  <defs>
                    <linearGradient
                      id="gradientFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="rgb(239, 68, 68)"
                        stopOpacity="0.2"
                      />
                      <stop
                        offset="100%"
                        stopColor="rgb(239, 68, 68)"
                        stopOpacity="0.05"
                      />
                    </linearGradient>
                  </defs>

                  {/* Data points and paths */}
                  {(() => {
                    const points = [
                      { x: 0, y: 38 }, // 5 Dec
                      { x: 6.25, y: 37 }, // 6 Dec
                      { x: 12.5, y: 38 }, // 7 Dec
                      { x: 18.75, y: 25 }, // 7 Dec PM - First Spike!
                      { x: 25, y: 37 }, // 8 Dec
                      { x: 31.25, y: 38 }, // 8 Dec PM
                      { x: 37.5, y: 37 }, // 9 Dec
                      { x: 43.75, y: 28 }, // 9 Dec PM - Second Spike!
                      { x: 50, y: 37 }, // 10 Dec
                      { x: 56.25, y: 38 }, // 10 Dec PM
                      { x: 62.5, y: 37 }, // 11 Dec
                      { x: 68.75, y: 38 }, // 12 Dec
                      { x: 75, y: 23 }, // 13 Dec - Third Spike!
                      { x: 81.25, y: 38 }, // 14 Dec
                      { x: 87.5, y: 37 }, // 15 Dec
                      { x: 93.75, y: 38 }, // 16 Dec
                      { x: 100, y: 37 }, // 17 Dec
                    ];

                    const pathD = points
                      .map((p, i) => (i === 0 ? "M" : "L") + `${p.x} ${p.y}`)
                      .join(" ");

                    return (
                      <>
                        <path
                          d={`${pathD} V50 H0 Z`}
                          fill="url(#gradientFill)"
                        />
                        <path
                          d={pathD}
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="0.75"
                        />
                        {points.map((point, i) => (
                          <circle
                            key={i}
                            cx={point.x}
                            cy={point.y}
                            r="0.75"
                            fill="#ef4444"
                          />
                        ))}
                      </>
                    );
                  })()}
                </svg>
              </div>

              {/* X-axis labels */}
              <div className="absolute bottom-2 left-12 right-0 flex justify-between text-xs text-gray-600">
                <span>5 Dec</span>
                <span>6 Dec</span>
                <span>7 Dec</span>
                <span>8 Dec</span>
                <span>9 Dec</span>
                <span>10 Dec</span>
                <span>11 Dec</span>
              </div>
            </div>
          </div>
        </div>

        {/* Browse More Section */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-blue-500 text-white font-bold rounded">
            Browse More Tickets
          </button>
        </div>
      </section>
    </div>
  );
}
