import React, { useEffect, useState, useRef } from "react";
import Header from "../Components/Core/Messages/Header";
import MessageModal from "../Components/Core/Messages/MessageModal";
import Typer from "../Components/Core/Messages/Typer";
import Messages from "../Components/Core/Messages/Messages";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { fetchMessages } from "../Services/Operations/message";
import { pushMessages, setIsTyping, setNotification } from "../Slices/MessageSlice";

const SelectedChats = () => {
  const {notifications} = useSelector(state => state.message)
  const { selectedChat } = useSelector((state) => state.chat);
  const [socketConnected, setSocketConnected] = useState(false);
  const ENDPOINT = "https://chat-application-8wgh.onrender.com";
  const socketRef = useRef(null); // Use useRef to store the socket instance
  const { chatId } = useParams();

  const dispatch = useDispatch();

  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    socketRef.current = io(ENDPOINT);
    socketRef.current.emit("setup", user);

    socketRef.current.on("connected", () => {
      setSocketConnected(true);
    });
  }, []);

  useEffect(() => {
    dispatch(fetchMessages(chatId, token, socketRef.current));
  }, [chatId, selectedChat, token, user]);

  useEffect(() => {
    const handleMessageReceived = (newMessage) => {
      console.log("Receiving in RTC");
      if (chatId !== newMessage.chatId._id || !chatId) {
        console.log('here')
        dispatch(setNotification(newMessage))
        console.log("Notifications",notifications)

      } else {
        console.log("RTC MESSAGE", newMessage);
        dispatch(pushMessages(newMessage));
      }
    };
    const socket = socketRef.current;

    const startTyping = () => {
      dispatch(setIsTyping(true));
    };

    const stopTyping = () => {
      dispatch(setIsTyping(false));
    };

    socket.on("stop typing", stopTyping);

    socket.on("typing", startTyping);

    socket.on("message received", handleMessageReceived);

    // Cleanup function to remove the event listener
    return () => {
      socket.off("message received", handleMessageReceived);
    };
  }, [dispatch, chatId]); // Dependencies if needed

  return (
    <div className=" min-w-full max-h-[90vh] flex flex-col">
      <Header chat={selectedChat} />
      <MessageModal />
      <Messages />
      <Typer socket={socketRef.current} socketConnected={socketConnected} />
    </div>
  );
};

export default SelectedChats;
