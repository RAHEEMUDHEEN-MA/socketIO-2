import React, { useEffect, useState } from "react";
import "./Chat.css"

const Chat = ({ socket, name, room }) => {
  const [currentMessage, setcurrentMessage] = useState("");
  const [MessageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = { 
        room: room,
        name: name,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
    }
  };
  useEffect(() => {
    socket.off("receive_message").on("receive_message", (data)=>{
       setMessageList((list)=>[...list,data] )
    })
  }, [socket]);

  return (
    <div className="chat_main">
      <div className="chat_header">
        <p>Live Chat</p>
      </div>
      <div className="chat_body">
        {MessageList.map((messageContent)=>{
          return <p>{messageContent.message}</p> 
        })}
      </div>
      <div className="chat_footer">
        <input
          type="text"
          placeholder="Type your message"
          onChange={(e) => {
            setcurrentMessage(e.target.value);
          }}
        />
        <button onClick={sendMessage}>send</button>
      </div>
    </div>
  );
};

export default Chat;
