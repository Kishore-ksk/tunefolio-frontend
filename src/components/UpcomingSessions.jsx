import React from "react";
import { ChevronRight } from "lucide-react";

const upcomingSessions = [
  {
    time: "06:30 PM",
    artist: "Lydia Mary",
    role: "Pianist",
    image: "/assets/soundtrap-o5X24Q99zFE-unsplash.jpg",
  },
  {
    time: "07:00 PM",
    artist: "Arjun Mehta",
    role: "Flutist",
    image: "/assets/simona-toma-2N-tne-hr4s-unsplash.jpg",
  },
  {
    time: "08:15 PM",
    artist: "Kavya Singh",
    role: "Vocalist",
    image: "/assets/srinivas-jd-_xBVCanNjcs-unsplash.jpg",
  },
  {
    time: "09:45 PM",
    artist: "Ritik Kapoor",
    role: "Drummer",
    image: "/assets/stavrialena-gontzou-EYPfeZuk2Dc-unsplash.jpg",
  },
];

const UpcomingSessions = () => {
  return (
    <div className="flex flex-col items-center  py-16 bg-[#172022] px-6 md:px-32">
      <div className="flex w-full items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Upcoming Session</h2>
        <button className="text-[#70CCE2] flex items-center gap-1 text-sm">
          View All <ChevronRight size={18} />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 w-full">
        {upcomingSessions.map((session, index) => (
          <div
            key={index}
            className=" shadow-md text-white px-2 flex items-center justify-between gap-4   hover:shadow-lg transition-all duration-200 ease-in h-32 border-y border-[#4F5152] hover:bg-gradient-to-r hover:from-transparent hover:via-[#233032]/80 hover:to-transparent"
          >
            <div className="flex items-center gap-12">
              <p className="text-sm text-[#70CCE2]  font-semibold">{session.time}</p>
              <img
                src={session.image}
                alt={session.artist}
                className="w-30 h-20 object-cover rounded-md"
              />
              <div className="text-start ">
                <p className="font-bold text-lg">{session.artist}</p>
                <span className="text-sm text-gray-400">{session.role}</span>
              </div>
            </div>
            <button className="mt-2 border-[1.5px] px-4 py-2 rounded-[4px] text-sm font-semibold hover:border-[#70CCE2] hover:text-[#70CCE2] transition duration-200 ease-in">
              Remind Me
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingSessions;
