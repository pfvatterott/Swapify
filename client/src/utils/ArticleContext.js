import React from "react";

const ArticleContext = React.createContext({
  email: "",
  firstName: "",
  lastName: "",
  image: "",
  googleId: "",
  listedItems: [],
  handleSetUser: () => {}
});

export default ArticleContext;
