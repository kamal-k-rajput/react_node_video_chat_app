import React, { useContext, useState } from "react";
import { SocketContext } from "../SocketContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
export const Options = ({ children }) => {
  const [idToCall, setIdToCall] = useState("");
  const {
    me,
    setName,

    callAccepted,
    name,
    callEnded,
    callUser,
    leaveCall,
  } = useContext(SocketContext);

  return (
    <div>
      Options
      <h2>account info</h2>
      <form>
        <input type="text " placeholder="Write name here..." />
        <button>Copy your Id</button>
      </form>
      <h2>make a call </h2>
      <form>
        <input type="text " placeholder="Write name here..." />
        <button>Copy your Id</button>
      </form>
      {children}
    </div>
  );
};
