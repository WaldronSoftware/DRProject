import { useState, useEffect } from "react";
import axios from "axios";

interface IGeolocation {
  latitude: number;
  longitude: number;
}
const useGetUserGeolocation = () => {
  const [userLocation, setUserLocation] = useState({} as IGeolocation);
  const [locationLoading, setLocationLoading] = useState(true);

  useEffect(() => {
    console.log("userLocation hook");
    const getUserLocation = async () => {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      function success(pos: any) {
        const crd = pos.coords;
        console.log(crd);
        // console.log("Your current position is:" + crd.latitude + crd.longitude);
        // alert("Your current position is:" + crd.latitude  crd.longitude);
        // alert(
        //   `Your current position is: latitude: ${crd.latitude}, longitude: ${crd.longitude}`
        // );
        setUserLocation(crd);
        setLocationLoading(false);
      }
      function error() {
        alert("Unable to retrieve your location");
      }
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error, options);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };

    getUserLocation();
  }, []);

  return { userLocation, locationLoading };
};

export default useGetUserGeolocation;
