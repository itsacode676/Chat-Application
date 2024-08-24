import React from "react";
import { getTime } from "../../../Util.js/getData";
import { useSelector } from "react-redux";

const ChatBubble = ({ message }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div
    className={`flex items-start gap-2.5 m-3 relative ${
      user.id === message?.sender?._id ? "left-[25vw]" : "left-[0vw]"
    }`}
    >
      {user.id !== message?.sender?._id && (
        <img
          className="w-8 h-8 rounded-full object-cover bg-center"
          src={message.sender.pic}
          alt="Jese image"
        />
      )}
      <div
        className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 ${
          user.id !== message?.sender?._id ? "bg-gray-100" : "bg-[#007AFF]"
        } rounded-e-xl rounded-es-xl dark:bg-gray-700`}
      >
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {user.id !== message?.sender?._id &&
              `${message.sender.firstName} ${message.sender.lastName}`}
          </span>
          <span
            className={`text-sm font-normal ${
              user.id !== message?.sender?._id ? "text-gray-900" : "text-white"
            } dark:text-gray-400 `}
          >
            {getTime(message.createdAt)}
          </span>
        </div>
        <p
          className={`text-sm font-normal py-2.5 ${
            user.id !== message?.sender?._id ? "text-gray-900" : "text-white"
          } dark:text-white`}
        >
          {message?.content}
        </p>
      </div>
    </div>
  );
};

export default ChatBubble;
