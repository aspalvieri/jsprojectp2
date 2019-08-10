import React, { useEffect } from "react";
//import { Redirect } from "react-router-dom";
import Axios from "axios";

function Logout() {
  // Will execute when the component mounts
  useEffect(() => {
    Axios.post("/api/logout");
  }, []); // the empty array will cause the callback to execute when the component mounts

  return <meta http-equiv="refresh" content="0; url=/" />;
}

export default Logout;
