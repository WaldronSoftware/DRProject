import {
  createContext,
  useState,
  ContextType,
  ReactNode,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";
import { IMarker } from "../interfaces/interface";
import { useHttp } from "../hooks/useHttp";

export interface IMarkerContext {
  markers: IMarker[];
  updateMarkers: (markers: IMarker[]) => void;
}

type MarkersProp = {
  children: ReactNode;
};

const MarkersContext = createContext({} as IMarkerContext);

export const MarkersProvider = ({ children }: MarkersProp) => {
  const [markers, setMarkers] = useState<IMarker[]>([]);
  const updateMarkers = (markers: IMarker[] | []) => {
    setMarkers(markers);
  };

  const { data, get, post } = useHttp();

  useEffect(() => {
    console.log("provider useEffect");
    fetchMarkers();
  }, []);

  const fetchMarkers = async () => {
    console.log("fetchMarkers");

    const markersData = await get("/markers/");

    if (markersData?.status === "success") {
      updateMarkers(markersData.markers);
    }
  };

  return (
    <MarkersContext.Provider
      value={{
        markers,
        updateMarkers,
      }}
    >
      {children}
    </MarkersContext.Provider>
  );
};

export default MarkersContext;
