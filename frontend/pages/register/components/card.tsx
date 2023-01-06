import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import UserContext from "../../../context/userContext";
import {
  Card,
  Label,
  TextInput,
  Checkbox,
  Button,
  Spinner,
} from "flowbite-react";
import { useHttp } from "../../../hooks/useHttp";

const card = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [buttonLoader, setButtonLoader] = useState(false);
  const router = useRouter();

  const { currentUser, updateUser } = useContext(UserContext);

  const { data, loading, post } = useHttp();

  const createUser = async () => {
    const userData = await post("/users/create", {
      email,
      password,
      firstname,
      lastname,
    });

    //@ts-ignore
    if (userData?.status === "success") {
      //@ts-ignore
      localStorage.setItem("accessToken", userData.data.accessToken);
      //@ts-ignore
      localStorage.setItem("userId", userData.data.userId);
      //@ts-ignore
      localStorage.setItem(
        "expiresAt",
        JSON.stringify(userData.data.expiresAt)
      );

      Cookies.set("accessToken", userData.data.accessToken, {
        path: "",
        domain: window.location.hostname,
      });

      //@ts-ignore
      updateUser(userData.data.user);
      router.push("/");
    }
  };

  return (
    <div
      className="max-w-sm mx-auto my-auto h-full"
      style={{ top: "50%", transform: "translateY(calc(1/4 * 100vh))" }}
    >
      <Card>
        <form className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <div className="flex-1">
              <div className="mb-2 block">
                <Label htmlFor="firstname" value="Firsttname" />
              </div>
              <TextInput
                id="firstname"
                type="text"
                placeholder="firstname"
                required={true}
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <div className="mb-2 block">
                <Label htmlFor="lastname" value="Lastname" />
              </div>
              <TextInput
                id="lastname"
                type="text"
                placeholder="lastname"
                required={true}
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@flowbite.com"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div> */}
          <Button onClick={createUser} disabled={loading}>
            {loading ? (
              <div className="flex flex-row">
                <div className="mr-3">
                  <Spinner size="sm" light={true} />
                </div>
                <div>Loading ...</div>
              </div>
            ) : (
              <div>Submit</div>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default card;
