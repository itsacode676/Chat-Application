import React from "react";
import SideSection from "../Components/Core/Dashboard/SideSection";
import { Outlet } from "react-router-dom";
import Header from "../Components/Core/Dashboard/Header";
import ProfileModal from "../Components/Reuseable/ProfileModal";
import LogoutModal from "../Components/Reuseable/LogoutModal";
import NoChats from "../Components/Core/Dashboard/NoChats";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { selectedChat } = useSelector((state) => state.chat);
  return (
    <div className="h-full w-full flex flex-col ">
      <Header />
      <div className="w-full flex">
        <div className="w-[50%]">
          <SideSection />
          <ProfileModal />
          <LogoutModal />
        </div>
        <div className="w-1 min-h-screen bg-gray-200"></div>
        <div className="min-w-[49%] h-full">{selectedChat ? <Outlet /> : <NoChats />}</div>
      </div>
    </div>
  );
};

export default Dashboard;
