import React, { useEffect } from "react";
import Header from "../Components/Core/Messages/Header";
import { useSelector } from "react-redux";
import MessageModal from "../Components/Core/Messages/MessageModal";

const SelectedChats = () => {
  const { selectedChat } = useSelector((state) => state.chat);
  return (
    <div className="realative w-full h-full">
      <Header chat={selectedChat} />
      <MessageModal />
    </div>
  );
};

export default SelectedChats;
