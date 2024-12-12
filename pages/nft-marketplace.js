import React from "react";
import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";
import CardTitle from "@/components/CardTitle";
import CardContent from "@/components/CardContent";
import Slider2 from "@/components/Slider2";
import TabsList from "@/components/Tab/TabsList";
import TabsContent from "@/components/Tab/TabsContent";
import Tab from "@/components/Tab/Tab";
import { Star } from "react-icons/fa"; // Example icon, use any relevant icon
import { useRouter } from "next/router";

// NFT Marketplace
const NFTMarketplace = () => {
  const router = useRouter();

  const featuredCollections = [
    {
      id: 1,
      name: "Collection 1",
      image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d",
      floorPrice: 0.5,
      volume: 100,
      items: 1000,
      owners: 500,
    },
    {
      id: 2,
      name: "Collection 2",
      image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d",
      floorPrice: 0.7,
      volume: 150,
      items: 2000,
      owners: 800,
    },
    {
      id: 3,
      name: "Collection 3",
      image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d",
      floorPrice: 0.4,
      volume: 80,
      items: 1500,
      owners: 600,
    },
    {
      id: 4,
      name: "Collection 4",
      image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d",
      floorPrice: 0.6,
      volume: 120,
      items: 3000,
      owners: 1000,
    },
    {
      id: 5,
      name: "Collection 5",
      image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d",
      floorPrice: 0.2,
      volume: 135,
      items: 5000,
      owners: 300,
    },
    {
      id: 6,
      name: "Collection 6",
      image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d",
      floorPrice: 1.0,
      volume: 60,
      items: 100,
      owners: 20,
    },
  ];

  const trendingNFTs = [
    { id: 1, name: "NFT 1", floorPrice: 0.5, volume: 100 },
    { id: 2, name: "NFT 2", floorPrice: 0.7, volume: 150 },
    { id: 3, name: "NFT 3", floorPrice: 0.4, volume: 80 },
    { id: 4, name: "NFT 4", floorPrice: 0.6, volume: 120 },
    { id: 5, name: "NFT 5", floorPrice: 0.8, volume: 180 },
    { id: 6, name: "NFT 6", floorPrice: 0.5, volume: 100 },
    { id: 7, name: "NFT 7", floorPrice: 0.7, volume: 150 },
    { id: 8, name: "NFT 8", floorPrice: 0.4, volume: 80 },
    { id: 9, name: "NFT 9", floorPrice: 0.6, volume: 120 },
    { id: 10, name: "NFT 10", floorPrice: 0.8, volume: 180 },
  ];

  const endingSoonNFTs = [
    { id: 1, name: "NFT 1", floor: 0.5, volume: 100 },
    { id: 2, name: "NFT 2", floor: 0.7, volume: 150 },
    { id: 3, name: "NFT 3", floor: 0.4, volume: 80 },
    { id: 4, name: "NFT 4", floor: 0.6, volume: 120 },
    { id: 5, name: "NFT 5", floor: 0.8, volume: 180 },
  ];

  const newLast24Hours = [
    { id: 1, name: "NFT 1", floor: 0.5, volume: 100 },
    { id: 2, name: "NFT 2", floor: 0.7, volume: 150 },
    { id: 3, name: "NFT 3", floor: 0.4, volume: 80 },
    { id: 4, name: "NFT 4", floor: 0.6, volume: 120 },
    { id: 5, name: "NFT 5", floor: 0.8, volume: 180 },
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
