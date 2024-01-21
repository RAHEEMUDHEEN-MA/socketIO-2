import { useState } from "react";
import "./App.css";

import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [showchat, setShowchat] = useState(false);

  const joinRoom = () => {
    if (name !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowchat(!showchat);
    }
  };

  return (
    <div className="App">
      {!showchat ? (
        <div className="joinchatContainer">
          <h2>Join A Chat</h2>
          <input
            type="text"
            placeholder="Name.."
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room Id.."
            onChange={(e) => {
              setRoom(e.target.value);
            }}
            onKeyPress={(e)=>(e.key==="Enter"&&joinRoom())}
          />
          <button onClick={joinRoom}>Join</button>
        </div>
      ) : (
        <Chat socket={socket} name={name} room={room} />
      )}
    </div>
  );
}

export default App;
