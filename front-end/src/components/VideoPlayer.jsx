import React, { useContext } from "react";

import { SocketContext } from "../SocketContext";
export const VideoPlayer = () => {
  const {
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    name,
    callEnded,
  } = useContext(SocketContext);
  return (
    <div>
      {stream && (
        <div>
          <h3>{name || "name"}</h3>
          <video playsInline muted ref={myVideo} autoPlay></video>
        </div>
      )}
      {callAccepted && !callEnded && (
        <div>
          <h2>
            <h3>{call.name || "caller name"}</h3>
            <video playsInline muted ref={userVideo} autoPlay></video>
          </h2>
        </div>
      )}
    </div>
  );
};
