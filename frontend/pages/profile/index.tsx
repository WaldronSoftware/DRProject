import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import UserContext from "../../context/userContext";

const index = () => {
  const { currentUser } = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    if (!currentUser.email) {
      router.push("/");
    }
  }, []);

  return <div>profile page</div>;
};

export default index;
