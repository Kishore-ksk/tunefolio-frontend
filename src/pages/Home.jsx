import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ Added useLocation
import ApiService from "../api/ApiService";
import { useAuth } from "../context/AuthContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../style.css';
import { motion, useInView } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter'
import MagneticButton from "../components/MagneticButton";
import { RiInstagramFill } from "react-icons/ri";
import { RiLinkedinBoxFill } from "react-icons/ri";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaGuitar } from "react-icons/fa";
import { RiUserSharedLine } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { HiRocketLaunch } from "react-icons/hi2";
import { BiBarChartAlt2 } from "react-icons/bi";
import { GiBrain } from "react-icons/gi";
import { CgMenuRight } from "react-icons/cg";
import { IoLogoGooglePlaystore, IoLogoAppleAppstore } from "react-icons/io5";
import FeaturedArtists from "../components/FeaturedArtists";
import UpcomingSessions from "../components/UpcomingSessions";
import { PiPlayCircleBold } from "react-icons/pi";
import BrowseByType from "../components/BrowseByType";
import TestimonialCarousel from "../components/TestimonialCarousel";


import SplitHeading from "../components/SplitHeading";

function Home() {
  const { user, setUser } = useAuth(); // fetchUser not needed here
  const navigate = useNavigate();
  const location = useLocation(); // ✅
  const [isOpen, setIsOpen] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);

  const fadeUp = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  // ✅ useEffect to fetch profile image when user changes or on location.pathname === '/'
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        const response = await ApiService.getUser();
        setProfileImage(response.data.image);
      } catch (error) {
        console.error("Failed to fetch profile image:", error);
      }
    };

    // ✅ Only call when on home route and user exists
    if (user && location.pathname === "/") {
      fetchProfileImage();
    }
  }, [user, location.pathname]); // ✅ Re-run when user or route changes

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // This effect will check token and update user state if needed when navigating back to "/"
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const refetchUserIfNeeded = async () => {
      if (token && !user) {
        try {
          const response = await ApiService.getUser();
          setUser(response.data);
        } catch (err) {
          console.error("Failed to re-fetch user:", err);
        }
      }
    };

    refetchUserIfNeeded();
  }, [location.pathname]);

  const deleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      const response = await ApiService.deleteUser();
      if (response.status !== 200 || response.data?.message !== "Account deleted successfully") {
        throw new Error("Failed to delete account.");
      }

      alert("Your account has been deleted.");
      localStorage.removeItem("authToken");
      setUser(null);
      navigate("/register");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [flippedIndex, setFlippedIndex] = useState(null);
  const benefits = [
    {
      icon: <FaGuitar />,
      title: "Craft Your Sonic Identity",
      description: "Build a profile that truly reflects your unique sound and style.",
    },
    {
      icon: <RiUserSharedLine />,
      title: "Connect with the Right People",
      description: "Whether it's fans or fellow pros, we help you make real connections.",
    },
    {
      icon: <FaHeart />,
      title: "Follow the Music You Love",
      description: "Discover fresh music, hidden gems, and artists that resonate with you.",
    },
    {
      icon: <HiRocketLaunch />,
      title: "Grow Organically with Real Fans",
      description: "Skip the bots—build a genuine fanbase that grows with your music.",
    },
    {
      icon: <BiBarChartAlt2 />,
      title: "Insights That Matter",
      description: "Get meaningful data on your audience and performance without the fluff.",
    },
    {
      icon: <GiBrain />,
      title: "Built for Passion, Not Just Numbers",
      description: "We're about artistry first—metrics come second, always.",
    },
  ];
  const handleFlip = (index) => {
    setFlippedIndex((prev) => (prev === index ? null : index));
  };

  const howItWorksSteps = [
    {
      title: "Create Your Profile",
      desc: "Sign up and build your musical identity—artist, pro, or fan.",
    },
    {
      title: "Explore & Connect",
      desc: "Discover music, connect with talents, and grow your network.",
    },
    {
      title: "Engage & Grow",
      desc: "Share, collaborate, and build meaningful connections.",
    },
  ];

  return (
    <div className="bg-[#0D0D0D] h-full text-white pb-24">
      {/* header section */}
      <header className={`fixed top-0 left-0 w-full flex flex-col items-center justify-between z-50 transition-all duration-300 ${scrolled ? 'bg-[#0D0D0D]/60 shadow-md backdrop-blur-md' : 'bg-transparent'}`}>
        <div className={`w-full flex items-center justify-between transition-all duration-300 px-4 ${scrolled ? 'py-3' : 'py-6'}`}>
          <div onClick={() => navigate(`/`)} className="flex items-center md:gap-12 cursor-pointer">
            <div className="flex items-center gap-2">
              <img src="/assets/tunefolio.svg" title="Tunefolio-Logo" alt="Tunefolio Logo"
                className="w-8 md:w-10 cursor-pointer lg:w-[2vw] transition-transform duration-500 hover:rotate-180" />
              <p className="text-base md:text-[1.5vw] hidden sm:block cursor-pointer font-bold tracking-[2px]">TuneFolio</p>
            </div>
            <Link className="hidden md:block" to="/premium"><p>premium <span className="text-[#70CCE2] font-extrabold">+</span></p></Link>
          </div>
          <button className='block md:hidden cursor-pointer'>
            <img src="/assets/search.svg" alt="" className='' />
          </button>
          <div className="items-center hidden md:flex">
            <div className='flex items-center relative md:w-[160px] lg:w-[420px] xl:w-[640px]'>
              <button className='cursor-pointer'>
                <img src="/assets/search.svg" alt="" className='-translate-y-1/2 absolute left-4 top-1/2 transform' />
              </button>
              <input type="text" placeholder='Search...' className='bg-[#232B2D] border-[#585E5F] border-[1.5px] p-3 rounded-[10px] w-full focus:outline-none  pl-12 pr-4' />
            </div>
          </div>

          <div className="flex items-center gap-0 lg:gap-6 xl:gap-12">
            {user ? (
              <div className='md:w-20 relative' ref={dropdownRef}>
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className='bg-[#232B2D] border-[#585E5F] border-[1.5px] rounded-full cursor-pointer p-1 md:p-2'>
                  <div className='flex gap-2'>
                    <img src={profileImage || "/assets/material-symbols-light--account-circle.svg"} alt="Profile" className='h-6 md:h-8 rounded-full w-6 md:w-8' />
                  </div>
                </button>

                {dropdownOpen && (
                  <div className="bg-[#232B2D] border border-[#585E5F] rounded-md shadow-lg w-40 absolute mt-2 right-0">
                    <button
                      onClick={() => navigate(`/dashboard/portfolio`)}
                      className="text-left text-white w-full block hover:bg-[#2E3638] px-4 py-2"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        localStorage.removeItem("authToken");
                        setUser(null);
                      }}
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
            ) : (
              <div className="flex px-4 lg:px-0 gap-2 text-xs md:text-base  items-center">
                <Link to="/signup" className="hover:text-[#70CCE2] transition">Create Account</Link>
                <span className="w-[2px] h-[20px] bg-[#70CCE2]"></span>
                <Link to="/login" className="hover:text-[#70CCE2] transition">Log-In</Link>
              </div>
            )}

            <Link to="/dashboard/uploads" className="hidden md:block border-2 rounded-[6px] px-8 py-2 hover:border-[#70CCE2] hover:text-[#70CCE2]">Upload</Link>
          </div>
          {/* Mobile Sidebar - Collapsible Menu */}
          <div className="w-6 block md:hidden relative">
            <button onClick={() => setIsOpen(!isOpen)} className={`text-white text-3xl rounded transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
              {isOpen ? "✕" : <CgMenuRight />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="bg-opacity-50 bg-[#0D0D0D]/60 shadow-md backdrop-blur-md absolute md:hidden right-0 h-screen top-20 p-5" onClick={() => setIsOpen(false)}>
            <div className="flex mb-5 gap-8">
              <Link to="/dashboard/uploads" className="border-2 rounded-[6px] px-4  hover:border-[#70CCE2] hover:text-[#70CCE2]">Upload</Link>
              <Link to="/premium"><p>premium <span className="text-[#70CCE2] font-extrabold">+</span></p></Link>

            </div>

            <div>
              <nav className="flex flex-col justify-around gap-6 text-white text-base font-medium">
                <a href="#features" className="hover:text-[#70CCE2] transition">Features</a>
                <a href="#artists" className="hover:text-[#70CCE2] transition">For Artists</a>
                <a href="#industry" className="hover:text-[#70CCE2] transition">For Professionals</a>
                <a href="#industry" className="hover:text-[#70CCE2] transition">Upcoming</a>
                <a href="#industry" className="hover:text-[#70CCE2] transition">Testimonials</a>
                <a href="#industry" className="hover:text-[#70CCE2] transition">Our Gallery</a>
                <a href="#contact" className="hover:text-[#70CCE2] transition">Contact</a>
              </nav>
            </div>
          </div>
        )}
        <div className={`w-full px-4 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
          <nav className="hidden md:flex justify-around text-white text-base font-medium">
            <a href="#features" className="hover:text-[#70CCE2] transition">Features</a>
            <a href="#artists" className="hover:text-[#70CCE2] transition">For Artists</a>
            <a href="#industry" className="hover:text-[#70CCE2] transition">For Professionals</a>
            <a href="#industry" className="hover:text-[#70CCE2] transition">Upcoming</a>
            <a href="#industry" className="hover:text-[#70CCE2] transition">Testimonials</a>
            <a href="#industry" className="hover:text-[#70CCE2] transition">Our Gallery</a>
            <a href="#contact" className="hover:text-[#70CCE2] transition">Contact</a>
          </nav>
        </div>


      </header>

      {/* banner section */}
      <div className="w-full h-[60vh] md:h-[75vh] lg:h-[90vh] overflow-hidden relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
          className="h-full"
        >
          <SwiperSlide key={0}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <img
                src="\assets\banner01.jpg"
                alt="banner-3"
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white px-8">
                <div className="flex flex-col items-center justify-center text-center">
                  <h2 className="text-xl md:text-4xl font-bold mb-2">Where Music Becomes a Mirror</h2>
                  <p className="text-xs md:text-lg mb-6">Tunefolio is your digital stage — where sound meets soul, and stories find their rhythm.</p>
                  <a
                    href="#"
                    className="bg-white text-black px-6 py-2 rounded-full text-sm md:text-base font-semibold hover:bg-black hover:text-white transition duration-300"
                  >
                    Dive-In
                  </a>
                </div>
                <div className='absolute bottom-6 left-0 w-full px-6 md:px-16 flex flex-row justify-between items-end md:items-center gap-4 text-white text-sm mb-4 md:mb-0'>
                  <p className="text-xs md:text-base">Built for artists. Loved by fans. Powered by passion.</p>
                  <ul className="flex gap-2 md:gap-8 flex-col md:flex-row">
                    <li className="cursor-pointer text-xl md:text-2xl transition-all duration-200 ease-in hover:text-[#70CCE2] hover:scale-125"><RiLinkedinBoxFill /></li>
                    <li className="cursor-pointer text-xl md:text-2xl transition-all duration-200 ease-in hover:text-[#70CCE2] hover:scale-125"><RiInstagramFill /></li>
                    <li className="cursor-pointer text-xl md:text-2xl transition-all duration-200 ease-in hover:text-[#70CCE2] hover:scale-125"><FaSquareXTwitter /></li>
                    <li className="cursor-pointer text-xl md:text-2xl transition-all duration-200 ease-in hover:text-[#70CCE2] hover:scale-125"><FaYoutube /></li>
                  </ul>

                </div>

              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide key={1}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <img
                src="\assets\banner1.jpg"
                alt="banner-3"
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white px-8">
                <div className="flex flex-col items-center justify-center text-center">
                  <h2 className="text-xl md:text-4xl font-bold mb-2">Turn Up the Volume on Your Vision</h2>
                  <p className="text-xs md:text-lg mb-6">Drop your beats, build your tribe, and let your sound speak louder than words.</p>
                  <a
                    href="#"
                    className="bg-white text-black px-6 py-2 rounded-full text-sm md:text-base font-semibold hover:bg-black hover:text-white transition duration-300"
                  >
                    Dive-In
                  </a>
                </div>
                <div className='absolute bottom-6 left-0 w-full px-6 md:px-16 flex flex-row justify-between items-end md:items-center gap-4 text-white text-sm mb-4 md:mb-0'>
                  <p className="text-xs md:text-base">Built for artists. Loved by fans. Powered by passion.</p>
                  <ul className="flex gap-2 md:gap-8 flex-col md:flex-row">
                    <li className="cursor-pointer text-xl md:text-2xl transition-all duration-200 ease-in hover:text-[#70CCE2] hover:scale-125"><RiLinkedinBoxFill /></li>
                    <li className="cursor-pointer text-xl md:text-2xl transition-all duration-200 ease-in hover:text-[#70CCE2] hover:scale-125"><RiInstagramFill /></li>
                    <li className="cursor-pointer text-xl md:text-2xl transition-all duration-200 ease-in hover:text-[#70CCE2] hover:scale-125"><FaSquareXTwitter /></li>
                    <li className="cursor-pointer text-xl md:text-2xl transition-all duration-200 ease-in hover:text-[#70CCE2] hover:scale-125"><FaYoutube /></li>
                  </ul>

                </div>

              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide key={2}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <img
                src="\assets\banner2.jpg"
                alt="banner-3"
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white px-8">
                <div className="flex flex-col items-center justify-center text-center">
                  <h2 className="text-xl md:text-4xl font-bold mb-2">Scout the Sound of Tomorrow</h2>
                  <p className="text-xs md:text-lg mb-6">From fresh beats to future icons — explore the talent that's reshaping the music scene.</p>

                  <a
                    href="#"
                    className="bg-white text-black px-6 py-2 rounded-full text-sm md:text-base font-semibold hover:bg-black hover:text-white transition duration-300"
                  >
                    Dive-In
                  </a>
                </div>
                <div className='absolute bottom-6 left-0 w-full px-6 md:px-16 flex flex-row justify-between items-end md:items-center gap-4 text-white text-sm mb-4 md:mb-0'>
                  <p className="text-xs md:text-base">Built for artists. Loved by fans. Powered by passion.</p>
                  <ul className="flex gap-2 md:gap-8 flex-col md:flex-row">
                    <li className="cursor-pointer text-xl md:text-2xl transition-all duration-200 ease-in hover:text-[#70CCE2] hover:scale-125"><RiLinkedinBoxFill /></li>
                    <li className="cursor-pointer text-xl md:text-2xl transition-all duration-200 ease-in hover:text-[#70CCE2] hover:scale-125"><RiInstagramFill /></li>
                    <li className="cursor-pointer text-xl md:text-2xl transition-all duration-200 ease-in hover:text-[#70CCE2] hover:scale-125"><FaSquareXTwitter /></li>
                    <li className="cursor-pointer text-xl md:text-2xl transition-all duration-200 ease-in hover:text-[#70CCE2] hover:scale-125"><FaYoutube /></li>
                  </ul>

                </div>

              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide key={3}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <img
                src="\assets\banner3.jpg"
                alt="banner-3"
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white px-8">
                <div className="flex flex-col items-center justify-center text-center">
                  <h2 className="text-xl md:text-4xl font-bold mb-2">Follow the Music, Feel the Magic</h2>
                  <p className="text-xs md:text-lg mb-6">Get closer to the artists you adore, discover raw gems, and vibe with every note.</p>
                  {/* <motion.div {...fadeUp}>
                    <SplitHeading
                      lines={["Listen. Feel.", "Follow the Vibe."]}
                      className="text-5xl md:text-7xl font-extrabold text-center text-[#70CCE2]"
                    />
                  </motion.div> */}
                  {/* <Typewriter
                    words={['Craft your sonic identity.']}
                    loop={true}
                    typeSpeed={80}
                    deleteSpeed={50}
                    delaySpeed={2000}
                  /> */}
                  <a
                    href="#"
                    className="bg-white text-black px-6 py-2 rounded-full text-sm md:text-base font-semibold hover:bg-black hover:text-white transition duration-300"
                  >
                    Dive-In
                  </a>
                </div>
                <div className='absolute bottom-6 left-0 w-full px-6 md:px-16 flex flex-row justify-between items-end md:items-center gap-4 text-white text-sm mb-4 md:mb-0'>
                  <p className="text-xs md:text-base">Built for artists. Loved by fans. Powered by passion.</p>
                  <ul className="flex gap-2 md:gap-8 flex-col md:flex-row">
                    <li className="cursor-pointer text-xl md:text-2xl transition-all duration-200 ease-in hover:text-[#70CCE2] hover:scale-125"><RiLinkedinBoxFill /></li>
                    <li className="cursor-pointer text-xl md:text-2xl transition-all duration-200 ease-in hover:text-[#70CCE2] hover:scale-125"><RiInstagramFill /></li>
                    <li className="cursor-pointer text-xl md:text-2xl transition-all duration-200 ease-in hover:text-[#70CCE2] hover:scale-125"><FaSquareXTwitter /></li>
                    <li className="cursor-pointer text-xl md:text-2xl transition-all duration-200 ease-in hover:text-[#70CCE2] hover:scale-125"><FaYoutube /></li>
                  </ul>

                </div>

              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>


      {/* benefits section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-white mb-12">
          For Artists. For Pros. For Fans.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="group perspective cursor-pointer"
              onClick={() => handleFlip(index)}
            >
              <div
                className={`relative h-32 w-full transition-transform duration-700 transform-style-preserve-3d ${flippedIndex === index ? "rotate-y-180" : ""
                  }`}
              >
                {/* Front */}
                <div className="absolute inset-0 bg-[#172022] hover:bg-[#233032] backdrop-blur-md rounded-2xl shadow-lg flex flex-col items-center justify-center gap-4 p-6 text-white transform transition-all duration-500 preserve-3d backface-hidden">
                  <div className="text-4xl text-[#70CCE2]">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-center">{item.title}</h3>
                </div>

                {/* Back */}
                <div className="absolute inset-0 bg-[#111] rounded-2xl shadow-lg p-6 flex items-center justify-center text-center text-white transform rotate-y-180 backface-hidden">
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* aboutus section */}
      <div className='flex flex-col lg:flex-row bg-[#172022] items-center'>
        <div className="w-full md:w-[45%]  p-6">
          <img src="/assets/possessed-photography-U3sOwViXhkY-unsplash.jpg" alt="About us" className="rounded-[20px]" />
        </div>


        <div className='w-full lg:w-[55%] p-12'>
          <div className=''>
            <h2 className="text-2xl md:text-4xl font-bold pb-4">About Us</h2>
            <div className='line2'></div>
          </div>
          <div className="">
            <p className="text-sm md:text-xl leading-relaxed text-white/80">
              Tunefolio is more than just a platform—it's a movement built by and for passionate music creators, professionals, and fans.
              We believe in authenticity, organic growth, and real connections over clout and numbers.
            </p>

            <p className="mt-6 text-sm md:text-xl leading-relaxed text-white/80">
              Whether you're an artist crafting your unique sound, an industry pro looking to connect,
              or a fan discovering the next big thing—Tunefolio empowers you to showcase, explore, and thrive in a space that values music and meaning.
            </p>

            <p className="mt-6 text-xs md:text-base text-white/60">
              Built with heart. Backed by data. Driven by community.
            </p>
          </div>
          <div className="mt-8 grid md:grid-cols-2 gap-6 text-left text-white/90">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-[1.02] transition">
              <h3 className="text-xl font-semibold mb-2">🎯 Our Mission</h3>
              <p>To empower every musician, professional, and listener to connect, grow, and thrive through authentic music experiences.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-[1.02] transition">
              <h3 className="text-xl font-semibold mb-2">🌍 Our Vision</h3>
              <p>To redefine how the world discovers, shares, and supports music—one genuine connection at a time.</p>
            </div>
          </div>

          <button className="transision duration-200 hover:text-[#70CCE2] pt-4">See More</button>
        </div>

      </div>

      {/* How It Works Section */}
      <div className="md:max-w-6xl mx-auto px-4 py-20 overflow-hidden">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-white mb-12">
          How It Works
        </h2>

        <div className="space-y-10">
          {howItWorksSteps.map((step, index) => {
            const ref = useRef(null);
            const isInView = useInView(ref, { amount: 0.5 });

            return (
              <motion.div
                key={index}
                ref={ref}
                initial={{ x: 100, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg text-white"
              >
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-sm">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* FeaturedArtists section */}
      <FeaturedArtists />

      {/* upcoming session section */}
      <UpcomingSessions />

      {/* BrowseByType section */}
      <BrowseByType />

      {/* testimonial section */}
      <TestimonialCarousel />


      {/* our gallery section */}
      <div className='relative md:h-[600px] overflow-hidden bg-[#0D0D0D]'>
        <img src="/assets/hans-vivek-By96LAr-34o-unsplash.jpg" alt="" className="object-contain" />
        <div className='absolute inset-0 bg-[#0D0D0D]/50 flex flex-col items-center justify-center gap-4'>
          <div className='gallery-heading'>
            <div className='gallery-line'></div>
            <h2 className="text-2xl md:text-4xl font-bold">Our Gallery</h2>
            <div className='gallery-line'></div>
          </div>
          <div className='text-4xl md:text-6xl text-[#70CCE2] cursor-pointer'>
            <PiPlayCircleBold />
          </div>
          <div>
            <p className="text-sm md:text-2xl text-center">"Embark on a journey through our dynamic gallery and discover the diverse musical talents shaping the future."</p>
          </div>
        </div>

      </div>

      {/* Footer section */}
      <div className='flex justify-center w-full py-12 px-8 sm:px-0'>
        <div className="flex flex-col sm:items-center w-full md:w-[60%] xl:w-[40%] gap-4">
          <h2 className="text-xl font-bold tracking-widest">TuneFolio</h2>
          <p className="text-sm sm:text-base sm:text-center sm:px-10">TuneFolio is a music talent showcase website, A way to discover new and emerging artists and support their musical journey.</p>
          <ul className='w-full flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between font-semibold pt-2'>
            <li className="hover:text-[#70CCE2] cursor-pointer transition-all duration-200 ease-in">Home</li>
            <li className="hover:text-[#70CCE2] cursor-pointer transition-all duration-200 ease-in">About Us</li>
            <li className="hover:text-[#70CCE2] cursor-pointer transition-all duration-200 ease-in">Events</li>
            <li className="hover:text-[#70CCE2] cursor-pointer transition-all duration-200 ease-in">Artists</li>
            <li className="hover:text-[#70CCE2] cursor-pointer transition-all duration-200 ease-in">Contact</li>
          </ul>
          <div className='w-full h-[1px] bg-gradient-to-r from-transparent via-[#70CCE2] to-transparent'></div>
          <ul className="flex gap-8 pt-2">
            <li className="cursor-pointer text-2xl transition-all duration-200 ease-in hover:text-[#70CCE2] hover:scale-125"><RiLinkedinBoxFill /></li>
            <li className="cursor-pointer text-2xl transition-all duration-200 ease-in hover:text-[#70CCE2] hover:scale-125"><RiInstagramFill /></li>
            <li className="cursor-pointer text-2xl transition-all duration-200 ease-in hover:text-[#70CCE2] hover:scale-125"><FaSquareXTwitter /></li>
            <li className="cursor-pointer text-2xl transition-all duration-200 ease-in hover:text-[#70CCE2] hover:scale-125"><FaYoutube /></li>
          </ul>
          <ul className='flex flex-col sm:flex-row gap-3 sm:gap-12 font-semibold py-2'>
            <li className="cursor-pointer">Privacy Policy</li>
            <li className="cursor-pointer">Terms of Service</li>
          </ul>
          <div className='flex gap-4 md:gap-8'>
            <button className='button-container flex items-center gap-2 border-1 w-[140px] sm:w-[200px] py-2 px-3 sm:px-6 rounded-[10px] text-sm cursor-pointer transition duration-200 ease-in hover:border-[#70CCE2]'><div><IoLogoGooglePlaystore className='text-[#70CCE2] text-2xl' /></div><p className="text-start text-xs sm:text-base"> Get it on <br /><span>Playstore</span></p></button>
            <button className='button-container flex items-center gap-2 border-1 w-[140px] sm:w-[200px] py-2 px-3 sm:px-6 rounded-[10px] text-sm cursor-pointer transition duration-200 ease-in hover:border-[#70CCE2]'><div><IoLogoAppleAppstore className='text-[#70CCE2] text-2xl' /></div><p className="text-start text-xs sm:text-base">Download it on <br /><span>Appstore</span></p></button>
          </div>
          <div className='w-full h-[1px] bg-gradient-to-r from-transparent via-[#70CCE2] to-transparent'></div>
          <p className='copyrights text-white/60'>© 2024 TuneFolio - All Rights Reserved</p>
        </div>

      </div>

    </div>
  );
}

export default Home;
