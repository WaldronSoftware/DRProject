import { useState, useEffect } from "react";
import { axiosInstance } from "../axiosInstance";
import { IResponseData } from "../interfaces/interface";

export const useFetch = (url: string) => {
  console.log(url);
  const [data, setData] = useState<IResponseData>({} as IResponseData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axiosInstance.get(url);
      setData(res.data);
      setLoading(false);
    };

    fetchData();
  }, [url]);

  return { data, loading };
};
