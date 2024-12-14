import React from "react";
import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";
import CardTitle from "@/components/CardTitle";
import CardContent from "@/components/CardContent";
import Slider2 from "@/components/Slider2";
import TabsList from "@/components/Tab/TabsList";
import TabsContent from "@/components/Tab/TabsContent";
import Tab from "@/components/Tab/Tab";
import { Star } from "react-icons/fa";
import { useRouter } from "next/router";

// NFT Marketplace
const NFTMarketplace = () => {
  const router = useRouter();

  const featuredCollections = [
    {
      id: 1,
      name: "Taylor Swift Eras Tour VIP",
      image:
        "https://assets.teenvogue.com/photos/64f0a106a683b28e919ea05c/16:9/w_2560%2Cc_limit/GettyImages-1604947670.jpg",
      floorPrice: 2.5,
      volume: 450,
      items: 5000,
      owners: 2300,
    },
    {
      id: 2,
      name: "Beyoncé Renaissance Tour",
      image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d",
      floorPrice: 1.8,
      volume: 380,
      items: 4000,
      owners: 1800,
    },
    {
      id: 3,
      name: "Ed Sheeran Tour",
      image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d",
      floorPrice: 1.2,
      volume: 280,
      items: 3500,
      owners: 1500,
    },
    {
      id: 4,
      name: "Coldplay Music of Spheres",
      image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d",
      floorPrice: 1.5,
      volume: 320,
      items: 4500,
      owners: 2000,
    },
    {
      id: 5,
      name: "The Weeknd After Hours",
      image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d",
      floorPrice: 1.1,
      volume: 250,
      items: 3000,
      owners: 1200,
    },
    {
      id: 6,
      name: "Bad Bunny World Tour",
      image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d",
      floorPrice: 1.6,
      volume: 290,
      items: 3800,
      owners: 1600,
    },
  ];

  const trendingNFTs = [
    { id: 1, name: "Taylor Swift - VIP Floor", floorPrice: 2.5, volume: 450 },
    { id: 2, name: "Beyoncé - Front Row", floorPrice: 1.8, volume: 380 },
    { id: 3, name: "Ed Sheeran - Golden Circle", floorPrice: 1.2, volume: 280 },
    { id: 4, name: "Coldplay - Premium Seats", floorPrice: 1.5, volume: 320 },
    { id: 5, name: "The Weeknd - VIP Package", floorPrice: 1.1, volume: 250 },
    { id: 6, name: "Bad Bunny - Meet & Greet", floorPrice: 1.6, volume: 290 },
    { id: 7, name: "Drake - VIP Experience", floorPrice: 2.0, volume: 400 },
    { id: 8, name: "Billie Eilish - Pit Access", floorPrice: 1.4, volume: 310 },
    { id: 9, name: "Harry Styles - Premium", floorPrice: 1.7, volume: 360 },
    { id: 10, name: "Post Malone - VIP Suite", floorPrice: 1.3, volume: 270 },
  ];

  const endingSoonNFTs = [
    { id: 1, name: "Taylor Swift LA Night 1", floor: 2.5, volume: 450 },
    { id: 2, name: "Beyoncé NYC Final Show", floor: 1.8, volume: 380 },
    { id: 3, name: "Ed Sheeran London", floor: 1.2, volume: 280 },
    { id: 4, name: "Coldplay Paris Night", floor: 1.5, volume: 320 },
    { id: 5, name: "The Weeknd Toronto", floor: 1.1, volume: 250 },
  ];

  const newLast24Hours = [
    { id: 1, name: "Travis Scott Utopia", floor: 1.9, volume: 385 },
    { id: 2, name: "SZA SOS Tour", floor: 1.4, volume: 295 },
    { id: 3, name: "Kendrick Lamar Big Steps", floor: 1.7, volume: 345 },
    { id: 4, name: "Rihanna Comeback Tour", floor: 2.2, volume: 420 },
    { id: 5, name: "Lady Gaga Chromatica", floor: 1.6, volume: 330 },
  ];

  return (
    <div className="container mx-auto py-10 space-y-10">
      {/* Featured Collections */}
      <Card className="mb-6">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">
            Featured Collections
          </CardTitle>
        </CardHeader>
        <CardContent className="relative px-12">
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            onClick={() => document.querySelector(".slider").scrollBy(-1200, 0)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <Slider2 className="slider overflow-x-auto scrollbar-hide flex justify-center gap-4">
            {featuredCollections.slice(0, 4).map((collection) => (
              <div
                key={collection.id}
                className="p-4 w-[300px] flex-shrink-0"
                onClick={() =>
                  collection.id === 1 && router.push("/eventspage")
                }
                style={{ cursor: collection.id === 1 ? "pointer" : "default" }}
              >
                <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-lg">{collection.name}</h3>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-600">
                        Floor Price:{" "}
                        <span className="font-semibold">
                          {collection.floorPrice} ETH
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Volume:{" "}
                        <span className="font-semibold">
                          {collection.volume} ETH
                        </span>
                      </p>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Items: {collection.items}</span>
                        <span>Owners: {collection.owners}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider2>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            onClick={() => document.querySelector(".slider").scrollBy(1200, 0)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">Trending</CardTitle>
          <TabsList>
            <Tab className="text-sm font-medium text-gray-600">1h</Tab>
            <Tab className="text-sm font-medium text-gray-600">12h</Tab>
            <Tab className="text-sm font-medium text-gray-600">24h</Tab>
            <Tab className="text-sm font-medium text-gray-600">7d</Tab>
            <Tab className="text-sm font-medium text-gray-600">1m</Tab>
          </TabsList>
        </CardHeader>
        <CardContent>
          <TabsContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Column 1: Ranks 1-5 */}
              <div>
                <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr] gap-2 mb-4">
                  <div className="font-semibold text-sm lg:text-base text-center">
                    Rank
                  </div>
                  <div className="font-semibold text-sm lg:text-base">Name</div>
                  <div className="font-semibold text-sm lg:text-base">
                    Floor
                  </div>
                  <div className="font-semibold text-sm lg:text-base">
                    Volume
                  </div>
                </div>

                {trendingNFTs.slice(0, 5).map((nft, index) => (
                  <div
                    key={nft.id}
                    className="grid grid-cols-[0.5fr_2fr_1fr_1fr] gap-2 mb-4 items-center"
                  >
                    <div className="text-center font-medium text-sm">
                      {index + 1}
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src="https://images.unsplash.com/photo-1634986666676-ec8fd927c23d"
                        alt={nft.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="font-medium text-sm truncate">
                        {nft.name}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {nft.floorPrice} ETH
                    </div>
                    <div className="text-sm text-gray-600">
                      {nft.volume} ETH
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 2: Ranks 6-10 */}
              <div>
                <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr] gap-2 mb-4">
                  <div className="font-semibold text-sm lg:text-base text-center">
                    Rank
                  </div>
                  <div className="font-semibold text-sm lg:text-base">Name</div>
                  <div className="font-semibold text-sm lg:text-base">
                    Floor
                  </div>
                  <div className="font-semibold text-sm lg:text-base">
                    Volume
                  </div>
                </div>

                {trendingNFTs.slice(5, 10).map((nft, index) => (
                  <div
                    key={nft.id}
                    className="grid grid-cols-[0.5fr_2fr_1fr_1fr] gap-2 mb-4 items-center"
                  >
                    <div className="text-center font-medium text-sm">
                      {index + 6}
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src="https://images.unsplash.com/photo-1634986666676-ec8fd927c23d"
                        alt={nft.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="font-medium text-sm truncate">
                        {nft.name}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {nft.floorPrice} ETH
                    </div>
                    <div className="text-sm text-gray-600">
                      {nft.volume} ETH
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Card>

      {/* Ending Soon Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Ending Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {endingSoonNFTs.map((nft) => (
              <div
                key={nft.id}
                className="bg-gray-200 rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src="https://images.unsplash.com/photo-1634986666676-ec8fd927c23d"
                  alt={nft.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium">{nft.name}</h3>
                  <p className="text-sm text-gray-600">
                    Floor Price: {nft.floor} ETH
                  </p>
                  <p className="text-sm text-gray-600">Volume: {nft.volume}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* New Last 24 Hours Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            New Last 24 Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {newLast24Hours.map((nft) => (
              <div
                key={nft.id}
                className="bg-gray-200 rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src="https://images.unsplash.com/photo-1634986666676-ec8fd927c23d"
                  alt={nft.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium">{nft.name}</h3>
                  <p className="text-sm text-gray-600">
                    Floor Price: {nft.floor} ETH
                  </p>
                  <p className="text-sm text-gray-600">Volume: {nft.volume}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NFTMarketplace;
