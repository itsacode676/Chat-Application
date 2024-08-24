import React, { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useDispatch, useSelector } from "react-redux";
import { BsEmojiSmile } from "react-icons/bs";
import { createMessage } from "../../../Services/Operations/message";


function Typer({ socket, socketConnected }) {
  const { token } = useSelector((state) => state.auth);
  const { selectedChat } = useSelector((state) => state.chat);
  const { isTyping } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [typing, setTyping] = useState(false);

  function handelSubmit(e) {
    socket.emit("stop typing", selectedChat._id);
    setTyping(false);
    if (e.key === "Enter" && inputStr.length) {
      const data = {
        content: inputStr,
        chatId: selectedChat._id,
      };
      setInputStr("");
      dispatch(createMessage(data, token, socket));
    }
  }

  function handelTyping() {
    if (!socketConnected) return;
    if (!typing && inputStr) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
  }

  const addEmoji = async (e) => {
    const sym = await e.unified.split("_");
    const codeArray = [];
    sym.forEach((element) => {
      codeArray.push("0x" + element);
    });
    const emoji = String.fromCodePoint(...codeArray);
    setInputStr(inputStr + emoji);
  };



  return (
    <div className="w-[65%] mx-auto absolute bottom-3 ml-2">
      {showPicker && (
        <div className="relative left-[23vw]">
          <Picker data={data} onEmojiSelect={addEmoji} />
        </div>
      )}
 
      <label
        htmlFor=""
        className="w-[70%] flex items-center  justify-between bg-white rounded-xl border border-black"
      >
        <input
          className="p-[10px]  px-2 outline-none input-style w-full text-lg"
          value={inputStr}
          onChange={(e) => {
            setInputStr(e.target.value);
            handelTyping();
          }}
          placeholder={`Type a message`}
          onKeyDown={handelSubmit}
        />
        <BsEmojiSmile
          onClick={() => setShowPicker((val) => !val)}
          className="text-black h-5 w-5 font-black mr-2 hover:text-gray-900 cursor-pointer"
        />
      </label>
    </div>
  );
}

export default Typer;
