import React from "react";

const chatContext = React.createContext({
  matchId: "",
  setChat: () => {}
});

export default chatContext;
