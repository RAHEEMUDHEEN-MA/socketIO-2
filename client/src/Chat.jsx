import React, { useEffect, useState } from "react";
import ScrolltoBottom from 'react-scroll-to-bottom'
import "./Chat.css";
import ScrollToBottom from "react-scroll-to-bottom";

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
      setMessageList((list) => [...list, messageData]);
      setcurrentMessage("")
      

    }
  };
  useEffect(() => {
    socket.off("receive_message").on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat_main">
      <div className="chat_header">
        <p>Live Chat</p>
      </div>
      <div className="chat_body">
        <ScrollToBottom className="chat_body2" >
        {MessageList.map((messageContent) => {
          return (
            <div
              className="message"
              id={messageContent.name == name ? "your_message" : "other"}
            >
              <div>
                <div
                  className="message_content"
                  id={messageContent.name == name ? "your_content" : "other"}
                >
                  <p>{messageContent.message}</p>
                </div>
                <div
                  className="message_meta"
                  id={messageContent.name == name ? "your_meta" : "other"}
                >
                  <p className="time">{messageContent.time}</p>
                  <p className="name">{messageContent.name}</p>
                </div>
              </div>
            </div>
          );
        })}
        </ScrollToBottom>
      </div>
      <div className="chat_footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Type your message"
          onChange={(e) => {
            setcurrentMessage(e.target.value);
          }}
          onKeyPress={(e)=>{e.key==="Enter" && sendMessage()}}
        />
        <button onClick={sendMessage}>send</button>
      </div>
    </div>
  );
};

export default Chat;
