"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

export default function PropertyMap({ property }) {
  const { lat, lng } = property.location;
  const { name } = property;
  const [mapPosition, setMapPosition] = useState({ lat, lng });

  // L.Icon.Default.imagePath = "https://unpkg.com/leaflet@4.2.1/dist/images/";
  // const myIcon = L.icon({
  //   iconUrl: mapMarker,
  //   iconSize: [38, 38],
  // });

  // var myIcon = L.icon({
  //   iconUrl: "location.png",
  //   iconSize: [38, 95],
  //   iconAnchor: [22, 94],
  //   popupAnchor: [-3, -76],
  //   // shadowUrl: "my-icon-shadow.png",
  //   shadowSize: [68, 95],
  //   shadowAnchor: [22, 94],
  // });

  return (
    <MapContainer
      className="h-full"
      center={mapPosition}
      zoom={17}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      <Marker position={mapPosition}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
}
