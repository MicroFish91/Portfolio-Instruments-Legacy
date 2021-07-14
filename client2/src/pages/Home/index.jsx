import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  useEffect(() => {
    history.push("/login");
  }, []);

  return <div></div>;
};

export default Home;
