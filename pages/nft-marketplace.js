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
      name: "Coldplay Music of Spheres",
      image:
        "https://static.euronews.com/articles/stories/08/74/10/24/1200x675_cmsv2_4289ef70-c98e-557d-b566-be58eccef857-8741024.jpg",
      floorPrice: 1.5,
      volume: 320,
      items: 4500,
      owners: 2000,
    },
    {
      id: 2,
      name: "Beyoncé Renaissance Tour",
      image:
        "https://ew.com/thmb/4FERulFEKAWdfxv_uHXPWgDUCnE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/beyonce-tour-100323-22419fdd92974d1f963c4d2373ef7d7b.jpg",
      floorPrice: 1.8,
      volume: 380,
      items: 4000,
      owners: 1800,
    },
    {
      id: 3,
      name: "Ed Sheeran Tour",
      image:
        "https://fkpscorpio.be/img/asset/bWFpbi9pbWcvY3JlZGl0LW1hcmstc3VycmlkZ2UtLTg0NzYtMS5qcGc=?w=1900&h=900&fit=crop&s=895dcdff43a047d817d65dece77f9202",
      floorPrice: 1.2,
      volume: 280,
      items: 3500,
      owners: 1500,
    },
    {
      id: 4,
      name: "Taylor Swift Eras Tour VIP",
      image:
        "https://assets.teenvogue.com/photos/64f0a106a683b28e919ea05c/16:9/w_2560%2Cc_limit/GettyImages-1604947670.jpg",
      floorPrice: 2.5,
      volume: 450,
      items: 5000,
      owners: 2300,
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
    {
      id: 1,
      name: "Taylor Swift - VIP Floor",
      floorPrice: 2.5,
      volume: 450,
      image:
        "https://people.com/thmb/hGBx2o9so78bb7NZQ_WWPGhBU8c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(1045x501:1047x503)/Taylor-Swift-Reputation-081824-01-9c2cc19b358f42fbb8ae582b8e12c027.jpg",
    },
    {
      id: 2,
      name: "Beyoncé - Front Row",
      floorPrice: 1.8,
      volume: 380,
      image:
        "https://assets.teenvogue.com/photos/65870cb0062dbbca4e282c10/16:9/w_2560%2Cc_limit/1580039832",
    },
    {
      id: 3,
      name: "Ed Sheeran - Golden Circle",
      floorPrice: 1.2,
      volume: 280,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/c/c1/Ed_Sheeran-6886_%28cropped%29.jpg",
    },
    {
      id: 4,
      name: "Coldplay - Premium Seats",
      floorPrice: 1.5,
      volume: 320,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq8bvui-UEnF70We7cTrS001hP1lF1K3qmkg&s",
    },
    {
      id: 5,
      name: "The Weeknd - VIP Package",
      floorPrice: 1.1,
      volume: 250,
      image:
        "https://ca-times.brightspotcdn.com/dims4/default/d7c74c4/2147483647/strip/true/crop/1960x1234+0+0/resize/1200x756!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fb8%2F5e%2Fc778bd834a9bbcbb55f844250792%2Fu-s-premiere-of-avatar-the-way-of-water-88166.jpg",
    },
    {
      id: 6,
      name: "Bad Bunny - Meet & Greet",
      floorPrice: 1.6,
      volume: 290,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/b/b1/Bad_Bunny_2019_by_Glenn_Francis_%28cropped%29.jpg",
    },
    {
      id: 7,
      name: "Drake - VIP Experience",
      floorPrice: 2.0,
      volume: 400,
      image:
        "https://imageio.forbes.com/specials-images/imageserve/5ed578988b3c370006234c35/0x0.jpg?format=jpg&crop=1031,1031,x43,y49,safe&height=416&width=416&fit=bounds",
    },
    {
      id: 8,
      name: "Billie Eilish - Pit Access",
      floorPrice: 1.4,
      volume: 310,
      image:
        "https://thefader-res.cloudinary.com/private_images/w_760,c_limit,f_auto,q_auto:eco/287596-1C-004-04_10MB_Web_vd7pmy/billie-eilish-cover-story.jpg",
    },
    {
      id: 9,
      name: "Harry Styles - Premium",
      floorPrice: 1.7,
      volume: 360,
      image:
        "https://m.media-amazon.com/images/M/MV5BMTUxMzU2MTk1OF5BMl5BanBnXkFtZTgwNzg4NjAwMzI@._V1_.jpg",
    },
    {
      id: 10,
      name: "Post Malone - VIP Suite",
      floorPrice: 1.3,
      volume: 270,
      image:
        "https://m.media-amazon.com/images/M/MV5BN2VmNDI3OWUtMGEyYS00Njg5LTlkNDUtOTI1MDk5MjdmYmExXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    },
  ];

  const endingSoonNFTs = [
    {
      id: 1,
      name: "Taylor Swift LA Night 1",
      floor: 2.5,
      volume: 25750,
      image:
        "https://media.nbclosangeles.com/2023/08/GettyImages-1591513903.jpg?quality=85&strip=all",
    },
    {
      id: 2,
      name: "Beyoncé NYC Final Show",
      floor: 1.8,
      volume: 7080,
      image:
        "https://images.hellomagazine.com/horizon/landscape/8d5f6dde77b1-gettyimages-1499593702.jpg?tx=c_limit,w_640",
    },
    {
      id: 3,
      name: "Ed Sheeran London",
      floor: 1.2,
      volume: 13280,
      image:
        "https://cdn.apollo.audio/one/media/6143/5d64/9300/2f47/697e/ece4/ed-sheeran-2022-tour.jpg?quality=80&format=jpg&crop=0,0,843,1500&resize=crop",
    },
    {
      id: 4,
      name: "Coldplay Paris Night",
      floor: 1.5,
      volume: 12020,
      image: "https://live.staticflickr.com/3677/14292292232_c91e0ee562_b.jpg",
    },
    {
      id: 5,
      name: "The Weeknd Toronto",
      floor: 1.1,
      volume: 9550,
      image:
        "https://variety.com/wp-content/uploads/2022/09/GettyImages-1409221667.jpg",
    },
  ];

  const newLast24Hours = [
    {
      id: 1,
      name: "Travis Scott Utopia",
      floor: 1.9,
      volume: 385,
      image:
        "https://www.rollingstone.com/wp-content/uploads/2023/07/travis-scott-utopia.jpg",
    },
    {
      id: 2,
      name: "SZA SOS Tour",
      floor: 1.4,
      volume: 295,
      image:
        "https://i8.amplience.net/i/naras/SZA-SOS-Tour-2023-GettyImages-1247432060",
    },
    {
      id: 3,
      name: "Kendrick Lamar Big Steps",
      floor: 1.7,
      volume: 345,
      image:
        "https://variety.com/wp-content/uploads/2022/10/Kendrick-Lamar-by-Greg-Noire-for-The-Big-Steppers-Tour-2022_GN_00286s-copy-e1666563492676.jpg?w=1000&h=667&crop=1",
    },
    {
      id: 4,
      name: "Rihanna Comeback Tour",
      floor: 2.2,
      volume: 420,
      image:
        "https://media.vanityfair.com/photos/56f96e4ab24e140048474af3/master/pass/rihanna-anti-world-tour-barclays.jpg",
    },
    {
      id: 5,
      name: "Lady Gaga Chromatica",
      floor: 1.6,
      volume: 330,
      image:
        "https://www.udiscovermusic.com/wp-content/uploads/2021/09/Lady-Gaga-Chromatica-Remix-Press-Shot.jpg",
    },
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
                        src={nft.image}
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
                        src={nft.image}
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
                  src={nft.image}
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
                  src={nft.image}
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
