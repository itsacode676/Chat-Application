import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { RxCross1 } from "react-icons/rx";
import { setLogoutModal } from "../../Slices/ModalSlice";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../Slices/AuthSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  rounded: 5,
  p: 1,
};

export default function LogoutModal() {
  const dispatch = useDispatch();
  const { logout } = useSelector((state) => state.modal);
  const handleClose = () => dispatch(setLogoutModal(false));

  const navigate = useNavigate();

  function LogOut() {
    localStorage.clear()
    dispatch(setToken(null))
    dispatch(setLogoutModal(false))
    navigate("/login");
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={logout}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={logout}>
          <Box sx={style}>
            <div className="relative p-7">
              <RxCross1
                className="text-lg m-1 font-black text-black cursor-pointer absolute top-0 left-0"
                onClick={handleClose}
              />
              <div className="text-xl text-center text-black font-semibold mb-4 w-full">
                Are you sure you want to logout ?
              </div>
              <div className="flex items-center gap-4 justify-center ">
                <button
                  onClick={LogOut}
                  className="max-w-full text-white bg-black focus:ring-4 shadow-lg hover:shadow-none hover:scale-95 transition duration-200 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Logout
                </button>
                <Button onClick={handleClose}>Cancel</Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
