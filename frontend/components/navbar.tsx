import React, { useContext } from "react";
import Link from "next/link";
import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";
import UserContext from "../context/userContext";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
// import {} from "flowbite-react";
// import "flowbite";

const navbar = () => {
  const { currentUser, clearCurrentUser } = useContext(UserContext);
  const router = useRouter();

  const logOut = async () => {
    try {
      // Cookies.remove("accessToken", {
      //   path: "",
      //   domain: `${window.location.hostname}`,
      // });
      // Cookies.remove("expiresAt", {
      //   path: "",
      //   domain: `${window.location.hostname}`,
      // });
      // Cookies.remove("loggenIn", {
      //   path: "",
      //   domain: `${window.location.hostname}`,
      // });
      // Perform localStorage action
      localStorage.removeItem("accessToken");
      localStorage.removeItem("logged_in");
      localStorage.removeItem("expiresAt");
      localStorage.removeItem("userId");
      Cookies.remove("accessToken", {
        path: "",
        domain: `${window.location.hostname}`,
      });
      clearCurrentUser();
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="border-b border-gray-200 rounded-none ">
      <Navbar className="max-w-screen-xl mx-auto" fluid={true} rounded={true}>
        <Navbar.Brand href="/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            MapCheck
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2 gap-2">
          {currentUser.email ? (
            <Dropdown
              className="w-48"
              arrowIcon={true}
              inline={true}
              label={
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded={true}
                />
              }
            >
              <Link href="/profile">
                <Dropdown.Item className="hover:text-blue-600">
                  Profile
                </Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item className="hover:text-blue-600" onClick={logOut}>
                Sign out
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <>
              <Link href="/login">
                <Button className="" color="gray">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button className="">Register</Button>
              </Link>
            </>
          )}
        </div>
      </Navbar>
    </div>
  );
};

export default navbar;
