import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Card from "./components/card";
import UserContext from "../../context/userContext";

const index = () => {
  const { currentUser } = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    if (currentUser.email) {
      router.push("/");
    }
  }, []);

  return (
    <div
      className="max-w-screen-xl mx-auto min-h-full"
      style={{ position: "relative" }}
    >
      <Card />
    </div>
  );
};

export default index;
