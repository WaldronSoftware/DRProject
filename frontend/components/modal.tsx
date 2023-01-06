import React, { ReactNode, useEffect, useState, useContext } from "react";
import {
  Modal,
  Button,
  Select,
  Textarea,
  Label,
  Spinner,
} from "flowbite-react";
import { useHttp } from "../hooks/useHttp";
import { IMarkerInput } from "../interfaces/interface";
import UserContext from "../context/userContext";
import MarkersContext from "../context/markersContext";
import marker from "./marker";

type modalProp = {
  latlng: LatLngLiteral | any;
  show: boolean;
  setModal: () => void;
  // children: ReactNode;
};

type LatLngLiteral = google.maps.LatLngLiteral;

const modal = ({ show, setModal, latlng }: modalProp) => {
  const { data, loading, post, get } = useHttp();
  const [buttonLoader, setButtonLoader] = useState(false);
  const [select, setSelect] = useState("");
  const [textArea, setTextArea] = useState("");

  const { currentUser, updateUser } = useContext(UserContext);
  const { markers, updateMarkers } = useContext(MarkersContext);

  useEffect(() => {}, []);

  const newMarker: IMarkerInput = {
    user: currentUser._id,
    longitude: latlng.lng,
    latitude: latlng.lat,
    description: textArea,
    markerType: select,
  };

  const onChange = () => {};
  const createMarker = async () => {
    if (!currentUser.email)
      alert("You need to be logged in to create a marker");
    if (!select) alert();
    if (!textArea) alert();
    else {
      setButtonLoader(true);

      const marker = await post("/markers/create", newMarker);

      updateMarkers([...markers, marker.marker]);
      const allMarkers = await get("/markers/");

      //@ts-ignore
      if (marker.status === "success") {
        //@ts-ignore
        updateMarkers(allMarkers.markers);
        setModal();
      }

      setModal();
    }
  };

  return (
    <Modal show={show} size="md" popup={true} onClose={() => setModal()}>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Create new marker
          </h3>
          <div className="mb-2 block">
            <div className="mb-2 flex flex-row">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </span>
              <span className="ml-2"></span>
            </div>
            <div className="mb-2 flex">
              <Label htmlFor="description" value="Marker type" />
            </div>
            <Select
              defaultValue="md"
              onChange={(e) => setSelect(e.target.value)}
            >
              <option value=""></option>
              <option value="accidents">Accident</option>
              <option value="roadworks">Roadworks</option>
              <option value="police checkpoint">Police Checkpoint</option>
              <option value="speed camera">Speed Camera</option>
              <option value="road damage">Road Damage</option>
              <option value="other">other</option>
            </Select>
          </div>

          <div className="mb-2 block">
            <div className="mb-2 flex">
              <Label
                color="gray"
                htmlFor="description"
                value="Marker description"
              />
            </div>
            <Textarea
              value={textArea}
              id="large"
              onChange={(e) => {
                setTextArea(e.target.value);
              }}
              maxLength={40}
            />
          </div>

          <Button className="mt-5" onClick={createMarker} disabled={loading}>
            {loading ? (
              <div className="flex flex-row">
                <div className="mr-3">
                  <Spinner size="sm" light={true} />
                </div>
                <div>Loading ...</div>
              </div>
            ) : (
              <div>Create Marker</div>
            )}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default modal;
