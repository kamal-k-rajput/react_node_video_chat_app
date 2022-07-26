import React, { useContext, useState } from "react";
import { SocketContext } from "../SocketContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
import e from "cors";
export const Options = ({ children }) => {
  const [idToCall, setIdToCall] = useState("");
  const { me, setName, callAccepted, name, callEnded, callUser, leaveCall } =
    useContext(SocketContext);
  function onChangeHandler(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  return (
    <div>
      Options
      <h2>Account info</h2>
      <form>
        <input
          type="text"
          placeholder="Write name here..."
          onChange={onChangeHandler}
          value={name}
        />
        <CopyToClipboard text={me}>
          <button> copy your id</button>
        </CopyToClipboard>
      </form>
      {
        // making a new call
      }
      <h2>make a call </h2>
      <form>
        <input
          type="text "
          placeholder="paste id of user..."
          value={idToCall}
          onChange={() => {
            e.preventDefault();
            setIdToCall(e.target.value);
          }}
        />
      </form>
      {callAccepted && !callEnded ? (
        <button onClick={leaveCall}>Hang up</button>
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault();
            callUser(idToCall);
          }}
        >
          call
        </button>
      )}
      {children}
    </div>
  );
};
