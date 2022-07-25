import React from "react";

import { AppBar } from "@mui/material";

import { Typography } from "@mui/material";
import { VideoPlayer } from "./components/VideoPlayer";
import { Notifications } from "./components/Notifications";
import { Options } from "./components/Options";
function App() {
  return (
    <div className="App">
      <h1>video chat application</h1>
      {
        //video player
        // application
      }
      <VideoPlayer></VideoPlayer>
      <Options>
        <Notifications />
      </Options>
    </div>
  );
}

export default App;
