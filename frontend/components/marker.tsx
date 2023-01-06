import React from "react";
import { Marker, MarkerF } from "@react-google-maps/api";
import "../public/fender-bender 1.svg";
// import accident from "../../public/images/accident.png";
// import checkpoint from "../../public/images/checkpoint.png";
// import roaddamage from "../../public/images/roaddamage.png";
// import roadworks from "../../public/images/roadworks.png";
// import speedcamera from "../../public/images/speedcamera.png";
// import "../../public/images/speedcamera.png";

const customMarkers = {
  accident:
    "https://res.cloudinary.com/nerdydave2017/image/upload/v1673004004/fender-bender_1_osyq4y.svg",
  "police checkpoint":
    "https://res.cloudinary.com/nerdydave2017/image/upload/v1673005065/police-checkpoint_i8omjq.svg",
  "road damage":
    "https://res.cloudinary.com/nerdydave2017/image/upload/v1673006523/roaddamage_spdd7v.svg",
  roadworks:
    "https://res.cloudinary.com/nerdydave2017/image/upload/v1673006327/roadworks_wxhjjl.svg",
  "speed camera":
    "https://res.cloudinary.com/nerdydave2017/image/upload/v1673004263/speed-radar_1_yyd2yz.svg",
  other: "",
};

interface marker {
  lat: number;
  lng: number;
  id: string;
  description: string;
  markerType: string;
}
const marker = ({ lat, lng, id, description, markerType }: marker) => {
  // console.log(lat, lng);
  let position = {
    lat: lat,
    lng: lng,
  };

  const getMarkerLink = (markerType: string) => {
    switch (markerType) {
      case "accident":
        return customMarkers.accident;
      case "police checkpoint":
        return customMarkers["police checkpoint"];
      case "road damage":
        return customMarkers["road damage"];
      case "roadworks":
        return customMarkers.roadworks;
      case "speed camera":
        return customMarkers["speed camera"];
      default:
        return customMarkers.other;
    }
  };

  return (
    <MarkerF
      // onLoad={(marker) =>
      //   console.log(
      //     "marker loaded",
      //     marker.getPosition()?.lat(),
      //     marker.getPosition()?.lng()
      //   )
      // }
      icon={getMarkerLink(markerType)}
      position={position}
      // label={description}
    />
  );
};

export default marker;
