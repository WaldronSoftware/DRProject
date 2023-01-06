import { useState, useEffect } from "react";
import { axiosInstance } from "../axiosInstance";
import { IResponseData, IUserInput, IMarker } from "../interfaces/interface";

interface IUsePost {
  url: string;
  body: IUserInput | IMarker;
}

export const usePost = ({ url, body }: IUsePost) => {
  const [data, setData] = useState<IResponseData>({} as IResponseData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postData = async () => {
      const res = await axiosInstance.post(url, body);
      setData(res.data);
      setLoading(false);
    };

    postData();
  }, [url]);

  return { data, loading };
};
