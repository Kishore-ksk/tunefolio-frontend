import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    { name: "Dashboard", path: "home", icon: "/src/assets/dashboard.svg" },
    { name: "Portfolio", path: "portfolio", icon: "/src/assets/port.svg" },
    { name: "Opportunities", path: "opportunities", icon: "/src/assets/oppor.svg" },
    { name: "Messages", path: "messages", icon: "/src/assets/message.svg" },
    { name: "Profile", path: "profile", icon: "/src/assets/profile.svg" },
    { name: "Settings", path: "settings", icon: "/src/assets/settings.svg" },
  ];

  return (
    <>
      {/* Sidebar for large and medium screens */}
      <div className="bg-[#172022] text-white h-screen px-5 border-r-[1.5px] border-[#2E3638] 
                      md:w-[120px] lg:w-[200px] 2xl:w-[280px] xl:w-[240px] hidden md:flex flex-col items-center">
        {/* Logo Section */}
        <div onClick={() => navigate(`/`)} className="flex h-[10%] justify-center w-full gap-3 items-center lg:justify-around">
          <img src="/src/assets/tunefolio.svg" title="Tunefolio-Logo" alt="Tunefolio Logo"
            className="w-10 cursor-pointer lg:w-[3vw]" />
          <p className="text-[1.5vw] cursor-pointer font-bold hidden lg:block tracking-[3px]">TuneFolio</p>
        </div>

        {/* Navigation */}
        <nav className="pt-4">
          <ul className="space-y-3">
            {menuItems.map((item) => (
              <li key={item.name} className="text-[1.2vw]">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `p-3 rounded-md flex items-center justify-center lg:justify-start lg:gap-2 
                    ${isActive ? "bg-[#0D0D0D] text-white" : "text-[#fff] hover:text-white hover:bg-[#243033] transition-all duration-300"}`
                  }
                >
                  <img src={item.icon} alt={item.name} />
                  <span className="hidden lg:block">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <button
          onClick={() => { localStorage.removeItem("authToken"); window.location.href = "/login"; }}
          className="flex justify-center rounded text-white cursor-pointer gap-2 items-center lg:justify-start mt-5 px-3"
        >
          <img src="/src/assets/logout.svg" alt="Logout" className="w-8" />
          <p className="text-xl hidden lg:block">LogOut</p>
        </button>

        {/* Pro Upgrade Section */}
        <div className="flex bg-[url( bg-center bg-cover h-[80px] justify-center m-4 rounded-xl w-[80px] items-center lg:hidden mt-10" style={{ backgroundImage: "url('/src/assets/proframe.svg')" }}>
          <img onClick={() => navigate(`/dashboard/pricing`)} src="/src/assets/pro.svg" alt="Pro" className="w-8" />
        </div>
        <div className="bg-[url( bg-center bg-cover justify-center m-4 p-6 rounded-[10px] w-full 2xl:w-[85%] hidden items-center lg:flex mt-10" style={{ backgroundImage: "url('/src/assets/proframe.svg')" }}>
          <div className="flex flex-col text-white gap-4">
            <p className="flex flex-row 2xl:text-3xl font-semibold gap-4 items-center lg:text-xl">
              Go Pro <img src="/src/assets/pro.svg" alt="Pro" className="w-8" />
            </p>
            <p className="text-xs xl:text-[16px]">Unlock insights and exclusive features</p>
            <button onClick={() => navigate(`/dashboard/pricing`)} className="bg-[#0E6E84] border-[#4892A3] border-[1px] rounded-[10px] text-sm 2xl:px-6 cursor-pointer px-1 py-2">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar - Collapsible Menu */}
      <div className="fixed left-4 md:hidden top-4 z-50">
        <button onClick={() => setIsOpen(!isOpen)} className="bg-[#172022] p-2 rounded text-white">
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="bg-black bg-opacity-50 fixed inset-0 z-40" onClick={() => setIsOpen(false)}>
          <div className="bg-[#172022] border-[#2E3638] border-r-[1.5px] h-full shadow-lg text-white w-64 px-5">
            {/* Close Button */}
            <button onClick={() => setIsOpen(false)} className="float-right p-2 text-white">✕</button>

            {/* Sidebar Content */}
            <div className="pt-10">
              {menuItems.map((item) => (
                <NavLink key={item.name} to={item.path} className="p-3 rounded-md text-white block duration-300 hover:bg-[#243033] transition-all">
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </>

  );
}

export default Sidebar;
