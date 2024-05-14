"use client";

import { MapContainer, Marker, TileLayer, Tooltip, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

export default function PropertyMap() {
  // const { position, zoom } = props;
  const [mapPosition, setMapPosition] = useState([40, 0]);

  return (
    <MapContainer
      className="h-full"
      center={mapPosition}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={mapPosition}>
        <Popup>A pretty CSS3 popup.</Popup>
      </Marker>
    </MapContainer>
  );
}
