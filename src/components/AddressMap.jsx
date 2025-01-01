import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { OpenStreetMapProvider } from "leaflet-geosearch";

const AddressMap = ({ address }) => {
  const [coordinates, setCoordinates] = useState([51.505, -0.09]); // Default coordinates (London)

  useEffect(() => {
    if (address) {
      const provider = new OpenStreetMapProvider();
      provider
        .search(address)
        .then((results) => {
          if (results && results[0]) {
            const { lat, lng } = results[0];
            setCoordinates([lat, lng]);
          } else {
            alert("Address not found!");
          }
        })
        .catch((error) => {
          console.error("Error fetching geocode data:", error);
          alert("Error finding address");
        });
    }
  }, [address]);

  return (
    <MapContainer
      center={coordinates}
      zoom={13}
      style={{ width: "100%", height: "400px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={coordinates}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default AddressMap;
