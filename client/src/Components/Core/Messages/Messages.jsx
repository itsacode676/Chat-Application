import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import ChatBubble from "./ChatBubble";
import { useSelector } from "react-redux";

const Messages = () => {
  const { messages } = useSelector((state) => state.message);
  return (
    <ScrollableFeed>
      {messages?.map((message) => (
        <ChatBubble key={message._id} message={message} /> // Ensure a unique key is provided
      ))}
    </ScrollableFeed>
  );
};

export default Messages;
