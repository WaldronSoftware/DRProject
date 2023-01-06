import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import Map from "../components/map";
import UserContext from "../context/userContext";
import Cookies from "js-cookie";

const Home: NextPage = () => {
  const { currentUser, updateUser } = useContext(UserContext);

  return (
    <div className="max-w-screen-xl h-full mx-auto">
      <Map />
    </div>
  );
};

export default Home;
