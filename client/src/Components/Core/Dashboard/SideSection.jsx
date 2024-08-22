import React from "react";
import Chats from "./Chats";
import Drawer from "./Drawer";
import GroupModal from "./GroupModal";
import { useSelector } from "react-redux";


const SideSection = () => {
  const {group} = useSelector(state => state.modal)
  return (
    <div className="min-w-[45%] min-h-screen">
      <Drawer/>
      <Chats/>
      {group && <GroupModal/>}
    </div>
  );
};

export default SideSection;
