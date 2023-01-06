/*eslint-disable*/
import { useLoadScript, GoogleMap } from "@react-google-maps/api";
import useGetUserGeolocation from "../hooks/useGetUserGeolocation";
import Modal from "../components/modal";
import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
  useContext,
} from "react";
import UserMarker from "./marker";
import { useHttp } from "../hooks/useHttp";
import MarkersContext from "../context/markersContext";
import UserContext from "../context/userContext";
import { callbackify } from "util";
import { useFetch } from "../hooks/useFetch";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;
type LatLng = google.maps.LatLngLiteral;
type Libraries = (
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization"
)[];
const Map = () => {
  // const { userLocation, locationLoading } = useGetUserGeolocation();
  // const { data, loading, get } = useHttp();

  const { markers, updateMarkers } = useContext(MarkersContext);
  const { currentUser } = useContext(UserContext);

  const [centerUser, setCenterUser] = useState<LatLngLiteral>(
    {} as LatLngLiteral
  );

  const { data, loading } = useFetch("/markers/");

  useEffect(() => {
    console.log("useEffect");
    console.log(userLocation, "userLocation");
    // get("/markers/");
    if (data.status === "success") {
      console.log(data);
      updateMarkers(data.markers);
    }
  }, [data]);

  const [loaded, setLoaded] = useState(false);
  const [modal, setModal] = useState(false);
  const [latlng, setLatlng] = useState<LatLng | null>({
    lat: 0,
    lng: 0,
  } as LatLng);

  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 53.344250668504806, lng: -6.261668903294844 }),
    []
  ); // TODO: get user's location
  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      // zoomControl: true,
    }),
    []
  );

  const onLoad = useCallback(
    // eslint-disable-next-line
    (map: any) => ((mapRef.current = map), console.log("map loaded")),
    []
  );

  let newLibraries: Libraries = ["places"];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    libraries: newLibraries,
  });

  if (!isLoaded) return <div>Loading ...</div>;

  return (
    <div>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerStyle={{
          maxWidth: "100%",
          minHeight: "calc(100vh - 64px)",
        }}
        options={options}
        onDblClick={(e) => {
          if (!currentUser.email) return;
          const latLng: any = e.latLng;
          const lat = latLng.lat();
          const lng = latLng.lng();

          // console.log(latLng?.lat());
          // console.log(latLng?.lng());
          setModal(true);
          setLatlng({ lat: lat, lng: lng });
          alert(` ${lat}, ${lng}`);
        }}
        onLoad={onLoad}
      >
        {markers?.map((i, index) => (
          <UserMarker
            key={index}
            lat={Number(i?.latitude)}
            lng={Number(i?.longitude)}
            id={i._id}
            description={i.description}
            markerType={i.markerType}
          />
        ))}
      </GoogleMap>
      <Modal show={modal} setModal={() => setModal(false)} latlng={latlng} />
    </div>
  );
};

export default Map;
