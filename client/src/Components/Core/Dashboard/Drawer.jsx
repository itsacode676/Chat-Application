import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { GrLinkNext } from "react-icons/gr";
import { IoMdSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../../Slices/DrawerSlice";
import { useState } from "react";
import { searchSender } from "../../../Services/Operations/user";
import Searches from "./Searches";

export default function TemporaryDrawer() {
  const [search, setSearch] = useState("");
  const { token } = useSelector((state) => state.auth);
  const { open } = useSelector((state) => state.drawer);
  const dispatch = useDispatch();
  const toggleDrawer = (newOpen) => () => {
    dispatch(setOpen(newOpen));
  };
  function searchUser() {
    dispatch(searchSender(search, token));
  }

  const DrawerList = (
    <Box sx={{ width: 350 }} role="presentation">
      <List>
        <div>
          <label
            htmlFor=""
            className="flex items-center mx-2 gap-1 bg-white rounded-xl border"
          >
            <IoMdSearch className="text-gray-300 text-3xl font-black ml-3" />
            <input
              type="text"
              value={search}
              placeholder={`Search User`}
              onChange={(e) => setSearch(e.target.value)}
              className="p-[10px]  px-2 outline-none"
            />
            <GrLinkNext
              className="text-gray-300 text-xl font-black ml-3 hover:text-gray-900"
              onClick={searchUser}
            />
          </label>
        </div>
      </List>
      <Divider/>
      <List>
        <Searches/>
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
