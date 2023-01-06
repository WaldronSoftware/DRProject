import React, { useState, useEffect, useContext } from "react";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import UserContext from "../../../context/userContext";
import { useRouter } from "next/router";
import {
  Card,
  Label,
  TextInput,
  Checkbox,
  Button,
  Spinner,
} from "flowbite-react";
import { useHttp } from "../../../hooks/useHttp";
import { useFetch } from "../../../hooks/useFetch";
import Cookies from "js-cookie";

const card = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonLoader, setButtonLoader] = useState(false);
  const { currentUser, updateUser } = useContext(UserContext);
  const router = useRouter();

  const { data, loading, post } = useHttp();
  // const { data, loading } = useFetch("/users/signin");

  useEffect(() => {}, [data]);

  const login = async () => {
    const userData = await post("/users/signin", { email, password });

    console.log(userData);

    //@ts-ignore
    if (userData.status === "success") {
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
        <div className="flex flex-col gap-4">
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
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button onClick={login} disabled={loading}>
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
        </div>
      </Card>
    </div>
  );
};

export default card;
