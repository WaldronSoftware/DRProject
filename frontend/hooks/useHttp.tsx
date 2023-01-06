import { useState, useEffect, useContext } from "react";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { axiosInstance } from "../axiosInstance";
import {
  IResponseData,
  IUserInput,
  IMarker,
  IMarkerInput,
} from "../interfaces/interface";
import MarkersContext from "../context/markersContext";
import UserContext from "../context/userContext";
import { middleware } from "../middleware";

type postBody = IUserInput | IMarkerInput;

interface IUseGet {
  url: string;
  func: funcProp;
}
// localStorage.getItem("accessToken");

type funcProp = ((markers: IMarker[]) => void) | ((user: IUserInput) => void);
export const useHttp = () => {
  const { markers, updateMarkers } = useContext(MarkersContext);
  const { currentUser, updateUser } = useContext(UserContext);
  const [data, setData] = useState<IResponseData>({} as IResponseData);
  const [loading, setLoading] = useState(false);

  const post = async (url: string, body: postBody | any) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post(url, body);
      setData(res.data);
      console.log(res.data);
      setLoading(false);
      return res.data;
    } catch (err) {
      setLoading(false);
    }
  };

  const get = async (url: string) => {
    console.log(url);
    try {
      setLoading(true);
      const res = await axiosInstance.get(url);
      console.log(res);
      setData(res.data);
      setLoading(false);
      return res.data;
    } catch (err) {
      setLoading(false);
    }

    // if (url === "/user/") updateUser(res.data.user);
  };

  const put = async (url: string, body: postBody) => {
    try {
      setLoading(true);
      const res = await axiosInstance.put(url, body);
      setData(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const del = async (url: string, id: string) => {
    try {
      setLoading(true);
      const res = await axiosInstance.delete(url, { data: { id } });
      setData(res.data);
      setLoading(false);
      get("/markers/");
    } catch (err) {
      setLoading(false);
    }
  };

  return { data, loading, post, get, put, del };
};
