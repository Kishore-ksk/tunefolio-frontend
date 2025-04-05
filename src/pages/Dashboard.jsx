import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardHome from "./dashboard/DashboardHome";
import Portfolio from "./dashboard/Portfolio";
import Opportunities from "./dashboard/Opportunities";
import Messages from "./dashboard/Messages";
import Profile from "./dashboard/Profile";
import Settings from "./dashboard/Settings";
import Navbar from "../components/Navbar";
import SongDetails from "./dashboard/SongDetails";
import UploadPage from "./dashboard/UploadPage";
import PricingPage from "./dashboard/PricingPage";

function DashboardLayout() {
  return (
    <div className="flex  h-screen ">
      <Sidebar />
      <div className="flex-1 bg-[#0D0D0D] text-white overflow-auto">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Portfolio />} />
        <Route path="home" element={<DashboardHome />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="opportunities" element={<Opportunities />} />
        <Route path="messages" element={<Messages />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="home" />} />
        <Route path=":type/:id" element={<SongDetails />} />
        <Route path="uploads" element={<UploadPage />} />
        <Route path="pricing" element={<PricingPage />} />
      </Route>
    </Routes>
  );
}

export default Dashboard;
