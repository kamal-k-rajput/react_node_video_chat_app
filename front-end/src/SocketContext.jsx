import { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import { Peer } from "simple-peer";

const SocketContext = createContext();

const Socket = io("http://localhost:5500");

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState("a");
  const [me, setMe] = useState("");
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });
    Socket.on("me", (id) => {
      setMe(id);
    });
    Socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (data) => {
      Socket.emit("answerCall", {
        signal: data,
        to: call.from,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      Socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: "",
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    Socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.distroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, ContextProvider };
