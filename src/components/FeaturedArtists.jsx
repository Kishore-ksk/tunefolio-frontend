import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const FeaturedArtists = () => {
  const artists = [
    {
      name: "Merlin Sharma",
      role: "Singer",
      description:
        "Merlin Sharma is a Classical-inspired musician known for her voice. With a passion for music, she infuses classical with modern tunes, creating captivating sounds.",
      followers: "442K",
      plays: "84.5M",
      likes: "24M",
      image: "/assets/nishant-jain-dycOs9hwyqM-unsplash.jpg",
    },
    {
      name: "Robin Richard",
      role: "Violinist",
      description:
        "Meet John Richard, a captivating violinist whose emotive performances blend classical mastery with contemporary allure, enchanting audiences worldwide.",
      followers: "402K",
      plays: "92M",
      likes: "45M",
      image: "/assets/marc-kleen-Iskck0kl210-unsplash.jpg",
    },
    {
      name: "Ashwin Jose",
      role: "Pianist",
      description:
        "Ashwin Jose is a modern pianist with a fusion of jazz and pop, crafting smooth melodies that speak to the heart and stir the soul.",
      followers: "390K",
      plays: "79M",
      likes: "30M",
      image: "/assets/dollar-gill-LmtUqlYRJO4-unsplash.jpg",
    },
    {
      name: "Siya Nair",
      role: "Carnatic-Electronic Fusion",
      description:
        "Siya Nair fuses Carnatic ragas with futuristic synths. Her boundary-pushing sound is reshaping how India listens to tradition.",
      followers: "245K",
      plays: "62M",
      likes: "22M",
      image: "/assets/nonresident-c4Gt0PtW7Ec-unsplash.jpg",
    },
    {
      name: "Nadeem Shahid",
      role: "Indie Pop Artist",
      description:
        "Nadeem Shahid blends heartfelt Hindi lyrics with lo-fi grooves, crafting an urban yet emotional vibe that connects with Gen Z and millennials alike.",
      followers: "292K",
      plays: "71M",
      likes: "25M",
      image: "/assets/ali-atiabii-yv-66V1PMeI-unsplash.jpg",
    },
    {
      name: "DJ 10-Docs",
      role: "Electronic DJ & Producer",
      description:
        "DJ 10-Docs spins energetic sets that blend Indian rhythms with global electronic beats. From festival stages to underground clubs, he turns every night into a sonic journey.",
      followers: "374K",
      plays: "78M",
      likes: "27M",
      image: "/assets/abstral-official-Fdu4MeYehGM-unsplash.jpg",
    },
  ];

  const CARDS_PER_PAGE = 2;

  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(artists.length / CARDS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const currentCards = artists.slice(
    currentPage * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE + CARDS_PER_PAGE
  );


  return (
    <div className="flex flex-col items-center w-full text-white px-6 lg:px-32 py-16">
      <div className="flex w-full items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">Featured Artists</h2>
        <button className="text-[#70CCE2] flex items-center gap-1 text-sm">
          View All <ChevronRight size={18} />
        </button>
      </div>

      <p className="text-gray-300 text-sm md:text-xl w-full mb-10">
        "Welcome to our spotlight section, where we shine a light on some of the most talented artists in the industry today."
        <br /><br />
        Get ready to immerse yourself in a world of captivating melodies, soul-stirring lyrics, and electrifying performances as we present our handpicked selection of featured artists.
      </p>

      <div className="flex justify-between w-full gap-4 pb-4">
        <button onClick={handlePrev} disabled={currentPage === 0}>
          <FaArrowLeftLong className={`w-6 h-6 ${currentPage === 0 ? 'opacity-30' : 'text-[#70CCE2]'}`} />
        </button>
        <button onClick={handleNext} disabled={currentPage === totalPages - 1}>
          <FaArrowRightLong className={`w-6 h-6 ${currentPage === totalPages - 1 ? 'opacity-30' : 'text-[#70CCE2]'}`} />
        </button>
      </div>

      {/* Artist Cards */}
      <div className="grid grid-cols-1 grid-rows-1 xl:grid-cols-2 gap-6 w-full mx-auto">
        {currentCards.map((artist, index) => (
          <div
            key={index}
            className="bg-[#172022] overflow-hidden p-2  w-full h-96 sm:h-80 flex flex-col sm:flex-row"
          >
            <img
              src={artist.image}
              alt={artist.name}
              className="w-48 mx-auto h-40 sm:h-full sm:w-[200px] object-cover object-center border border-[#5b5b5b]"
            />
            <div className="flex flex-col justify-between p-2 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="md:text-xl font-semibold">{artist.name}</h3>
                  <p className="text-[#70CCE2] text-xs md:text-sm mb-2">{artist.role}</p>
                  <p className="hidden sm:block text-sm text-gray-300 mb-4">{artist.description}</p>
                </div>
                <div className="flex sm:hidden gap-4">
                  <button className="cursor-pointer px-2 py-1 text-black bg-[#70CCE2] text-xs font-semibold">
                    Follow
                  </button>
                  <button className="cursor-pointer text-xs font-medium">
                    View Profile
                  </button>
                </div>
              </div>
              <div className="flex sm:hidden"><p className="text-sm text-gray-300 mb-4">{artist.description}</p></div>

              <div className="hidden sm:flex gap-4 mb-4">
                <button className="bg-[#70CCE2] cursor-pointer text-black px-4 py-1 rounded-[4px] text-sm font-semibold">
                  Follow
                </button>
                <button className="border-[1.5px] cursor-pointer transition duration-200 ease-in border-gray-400 hover:border-[#70CCE2] hover:text-[#70CCE2] px-4 py-1 rounded-[4px] text-sm font-medium">
                  View Profile
                </button>
              </div>

              <div className="flex justify-between text-xs text-gray-400">
                <div>
                  <p className="text-white text-xl font-semibold">{artist.followers}</p>
                  <p className="font-semibold text-[#70CCE2]">Followers</p>
                </div>
                <div>
                  <p className="text-white text-xl font-semibold">{artist.plays}</p>
                  <p className="font-semibold text-[#70CCE2]">Plays</p>
                </div>
                <div>
                  <p className="text-white text-xl font-semibold">{artist.likes}</p>
                  <p className="font-semibold text-[#70CCE2]">Likes</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedArtists;
