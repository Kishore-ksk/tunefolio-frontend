import React, { useState, useEffect, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import ApiService from '../api/ApiService';
import { CgMenuRight } from "react-icons/cg";
import '/src/style.css'


const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [LatestSong, setLatestSong] = useState(null);
  const randomNames = ["Alex Johnson", "Sophia Lee", "Daniel Smith", "Emma Watson", "Michael Brown", "Aarav Sharma", "Aanya Kapoor", "Siya Nair", "Rohan Patel", "Ishita Bose", "Vihaan Iyer", "Priya Malhotra", "Kavya Deshmukh", "Kabir Mehta", "Arjun Reddy",];
  const getRandomName = () => randomNames[Math.floor(Math.random() * randomNames.length)];
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);

  const menuItems = [
    { name: "Dashboard", path: "home", icon: "/src/assets/dashboard.svg" },
    { name: "Portfolio", path: "portfolio", icon: "/src/assets/port.svg" },
    { name: "Opportunities", path: "opportunities", icon: "/src/assets/oppor.svg" },
    { name: "Messages", path: "messages", icon: "/src/assets/message.svg" },
    { name: "Profile", path: "profile", icon: "/src/assets/profile.svg" },
    { name: "Settings", path: "settings", icon: "/src/assets/settings.svg" },
  ];

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        const response = await ApiService.getUser({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Full API Response:", response.data);

        console.log("Fetched Image URL:", response.data.image); // ✅ Log fetched image
        setProfileImage(response.data.image);
      } catch (error) {
        console.error("Failed to fetch profile image:", error);
      }
    };

    const fetchSongs = async () => {
      try {
        const response = await ApiService.getSongs(); // Fetch songs
        const songs = response.data;

        if (songs.length > 0) {
          setLatestSong(songs.slice().reverse()[0]); // Reverse & get the first item
        }
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();

    fetchProfileImage();
  }, []);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Delete Account Function
  const deleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      console.log("Sending delete request...");

      const token = localStorage.getItem("authToken");
      console.log("Stored Token:", token);

      const response = await ApiService.deleteUser();
      console.log("Delete response:", response);

      if (response.status !== 200 || response.data?.message !== "Account deleted successfully") {
        throw new Error("Failed to delete account.");
      }

      alert("Your account has been deleted.");
      localStorage.removeItem("authToken");
      navigate("/register");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };


  return (
    <div className='flex bg-[#172022] border-[#2E3638] border-b-[1.5px] h-[10%] justify-around w-full items-center px-5 sticky top-0 z-50'>
      <div className='flex gap-4 items-center'>
        {/* Logo Section */}
        <div onClick={() => navigate(`/`)} className="flex h-[10%] justify-center w-full gap-3 items-center lg:justify-around md:hidden">
          <img src="/src/assets/tunefolio.svg" title="Tunefolio-Logo" alt="Tunefolio Logo"
            className="w-10 cursor-pointer lg:w-[3vw]" />
          <p className="text-[1.5vw] cursor-pointer font-bold hidden lg:block tracking-[3px]">TuneFolio</p>
        </div>
      </div>

      <div className='flex justify-end w-[75%] gap-4 items-center md:gap-8 md:pe-10'>
        <button onClick={() => navigate(`/dashboard/uploads`)} className='bg-[#70CCE2] rounded-[10px] text-black cursor-pointer font-semibold hidden hover:bg-[#5BB8CF] md:block md:px-6 md:py-3 px-3 py-2'>Upload</button>
        <div className='block md:hidden'>
          <button className='cursor-pointer'>
            <img src="/src/assets/search.svg" alt="" className='' />
          </button>
        </div>
        <div ref={notificationsRef}>
          <button onClick={() => setNotificationsOpen(!notificationsOpen)} className='rounded-[10px] cursor-pointer md:bg-[#232B2D] md:border-[#585E5F] md:border-[1.5px] md:p-2 md:w-13 relative'><img src="/src/assets/bell.svg" alt="" className='w-8' />
            <span className="flex -mr-1 -mt-1 absolute right-0 size-3 top-0">
              <span className="bg-[#70CCE2] h-full rounded-full w-full absolute animate-ping inline-flex opacity-75"></span>
              <span className="bg-[#70CCE2] rounded-full inline-flex relative size-3"></span>
            </span></button>
        </div>

        {notificationsOpen && (
          <div className="flex justify-center fixed inset-0 items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-black w-96 max-h-[80vh] overflow-y-auto relative">
              <h3 className="border-b border-gray-600 text-lg font-semibold mb-4 pb-2">Notifications</h3>

              <div className="text-sm space-y-3">

                {/* Followers */}
                <div>
                  <h4 className="text-[#70CCE2] font-semibold">Followers</h4>
                  <p className="bg-neutral-300 p-3 rounded-md mt-1">{getRandomName()} followed you</p>
                </div>

                {/* Likes, Shares & Comments */}
                <div>
                  <h4 className="text-[#70CCE2] font-semibold"> Engagement</h4>
                  <p className="bg-neutral-300 p-3 rounded-md mt-1">{getRandomName()} liked your track</p>
                </div>

                {/* Collaboration Request */}
                <div>
                  <h4 className="text-[#70CCE2] font-semibold"> Collaboration Requests</h4>
                  <p className="bg-neutral-300 p-3 rounded-md mt-1">{getRandomName()} sent a collaboration request</p>
                </div>

                {/* Industry Professional Connection */}
                <div>
                  <h4 className="text-[#70CCE2] font-semibold"> Industry Connections</h4>
                  <p className="bg-neutral-300 p-3 rounded-md mt-1">{getRandomName()} (Industry Pro) wants to connect</p>
                </div>

                {/* New Uploaded Song */}
                {LatestSong && (
                  <div>
                    <h4 className="text-[#70CCE2] font-semibold"> New Upload</h4>
                    <p className="bg-neutral-300 p-3 rounded-md mt-1">{LatestSong.name}</p>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}


        <div className='md:w-20 relative' ref={dropdownRef}>
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className='bg-[#232B2D] border-[#585E5F] border-[1.5px] rounded-full cursor-pointer md:p-2 md:rounded-[10px]'>
            <div className='flex gap-2'>
              <img src={profileImage || "/src/assets/material-symbols-light--account-circle.svg"} alt="image" className='h-8 rounded-full w-8' />
              <img src="/src/assets/down-arrow.svg" alt="" className='w-6 hidden md:block' />
            </div>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="bg-[#232B2D] border border-[#585E5F] rounded-md shadow-lg w-40 absolute mt-2 right-0">
              <button
                onClick={() => navigate(`/dashboard/profile`)}
                className="text-left text-white w-full block hover:bg-[#2E3638] px-4 py-2"
              >
                View Profile
              </button>
              <button
                onClick={() => { localStorage.removeItem("authToken"); navigate("/login"); }}
                className="text-left text-white w-full block hover:bg-[#2E3638] px-4 py-2"
              >
                Logout
              </button>
              <button
                onClick={deleteAccount}
                className="text-left text-red-500 w-full block hover:bg-[#2E3638] px-4 py-2"
              >
                Delete Account
              </button>
            </div>
          )}

        </div>
        <button onClick={() => navigate(`/dashboard/uploads`)} className='rounded-[10px] text-white block cursor-pointer font-semibold md:hidden md:px-6 md:py-3 px-3 py-2'>Upload</button>
        <div className='flex justify-center md:ps-5 md:w-[25%]'>
          <div className='flex w-full items-center relative'>
            <button className='cursor-pointer'>
              <img src="/src/assets/search.svg" alt="" className='-translate-y-1/2 absolute left-4 top-1/2 transform' />
            </button>
            <input type="text" placeholder='Search...' className='bg-[#232B2D] border-[#585E5F] border-[1.5px] p-3 rounded-[10px] w-full focus:outline-none hidden md:block pl-12 pr-4' />
          </div>
        </div>
        {/* Mobile Sidebar - Collapsible Menu */}
        <div className="w-6 md:hidden relative">
          <button onClick={() => setIsOpen(!isOpen)} className={`text-white text-3xl p-2  bg-[#172022] rounded transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
            {isOpen ? "✕" : <CgMenuRight />}
          </button>
        </div>
        {isOpen && (
          <div className="bg-opacity-50 absolute md:hidden right-0 sm:top-21 top-16" onClick={() => setIsOpen(false)}>
            <div className="flex flex-col bg-[#172022] border-[#2E3638] border-r-[1.5px] h-full justify-center shadow-lg text-white w-64 items-center px-5">
              {/* Navigation */}
              <nav className="sm:pt-5">
                <ul className="space-y-2 sm:space-y-3">
                  {menuItems.map((item) => (
                    <li key={item.name} className="sm:text-xl">
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `p-3 rounded-md flex items-center justify-start lg:justify-start gap-2 
                    ${isActive ? "bg-[#0D0D0D] text-white" : "text-[#fff] hover:text-white hover:bg-[#243033] transition-all duration-300"}`
                        }
                      >
                        <img src={item.icon} alt={item.name} className='w-5' />
                        <span className="">{item.name}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Logout Button */}
              <button
                onClick={() => { localStorage.removeItem("authToken"); window.location.href = "/login"; }}
                className="flex justify-center rounded text-white cursor-pointer gap-2 items-center lg:justify-start mt-3 px-3"
              >
                <img src="/src/assets/logout.svg" alt="Logout" className="sm:w-8 w-6" />
                <p className="sm:text-xl">LogOut</p>
              </button>

              <div className="section flex bg-[url( bg-center bg-cover h-[80px] justify-center m-4 rounded-xl w-[80px] items-center sm:hidden mt-10" style={{ backgroundImage: "url('/src/assets/proframe.svg')" }}>
                <img onClick={() => navigate(`/dashboard/pricing`)} src="/src/assets/pro.svg" alt="Pro" className="w-8" />
              </div>

              <div className="sm:flex hidden bg-[url( bg-center bg-cover justify-center m-4 p-6 rounded-[10px] w-full 2xl:w-[85%] items-center mt-6" style={{ backgroundImage: "url('/src/assets/proframe.svg')" }}>
                <div className="flex flex-col text-white gap-4">
                  <p className="flex flex-row text-3xl font-semibold gap-4 items-center">
                    Go Pro <img src="/src/assets/pro.svg" alt="Pro" className="w-8" />
                  </p>
                  <p className="">Unlock insights and exclusive features</p>
                  <button onClick={() => navigate(`/dashboard/pricing`)} className="bg-[#0E6E84] border-[#4892A3] border-[1px] rounded-[10px] cursor-pointer px-6 py-2">
                    Upgrade Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

export default Navbar
