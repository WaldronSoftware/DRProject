import { createContext, useState, ReactNode, useEffect } from "react";
import { IUser } from "../interfaces/interface";
import { useHttp } from "../hooks/useHttp";

export interface IUserContext {
  currentUser: IUser;
  updateUser: (user: IUser) => void;
  clearCurrentUser: () => void;
}

type UserProp = {
  children: ReactNode;
};

const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: UserProp) => {
  const [currentUser, setCurrentUser] = useState<IUser>({} as IUser);

  const { data, get, post } = useHttp();

  useEffect(() => {
    console.log("provider useEffect");
    fetchUser();
  }, []);

  const fetchUser = async () => {
    console.log("fetchUser");
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    console.log(accessToken, userId);
    if (accessToken && userId) {
      const userData = await post("/users/find", { email: userId });

      console.log(userData);

      if (userData?.status === "success") {
        setCurrentUser(userData?.user);
      }
    }
  };

  const updateUser = (user: IUser) => {
    setCurrentUser(user);
  };

  const clearCurrentUser = () => {
    setCurrentUser({} as IUser);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        updateUser,
        clearCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
