"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="background-color: #2d89ef; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; font-size: 16px;">📍</div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

export default function MapaColombia() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersLayerRef = useRef(null);
  const [markers, setMarkers] = useState([
    {
      id: 1, 
      position: [10.46314, -73.25322], // Valledupar
      description: "Valledupar: Tierra de música vallenata.",
    },
    {
      id: 2,
      position: [4.711, -74.0721], // Bogotá
      description: "Bogotá: Capital de Colombia.",
    },
  ]);

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {

      const leafletMap = L.map(mapContainerRef.current, {
        center: [4.570868, -74.297333],
        zoom: 5,
        scrollWheelZoom: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(leafletMap);

      const markersLayer = L.layerGroup().addTo(leafletMap);
      markersLayerRef.current = markersLayer;

      leafletMap.on("click", (e) => {
        const { lat, lng } = e.latlng;
        const newMarker = {
          id: Date.now(),
          position: [lat, lng],
          description: "Marcador personalizado",
        };
        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
      });

      mapRef.current = leafletMap; 
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (markersLayerRef.current) {

      markersLayerRef.current.clearLayers();

      markers.forEach((marker) => {
        const markerInstance = L.marker(marker.position, { icon: customIcon }).bindPopup(
          `<div>
            <p>${marker.description}</p>
            <button 
              style="color: red; border: none; background: none; cursor: pointer;"
              onclick="window.dispatchEvent(new CustomEvent('removeMarker', { detail: ${marker.id} }))"
            >
              Eliminar
            </button>
          </div>`
        );
        markersLayerRef.current.addLayer(markerInstance);
      });
    }
  }, [markers]);

  useEffect(() => {
    const handleRemoveMarker = (e) => {
      const markerId = e.detail;
      setMarkers((prevMarkers) => prevMarkers.filter((marker) => marker.id !== markerId));
    };

    window.addEventListener("removeMarker", handleRemoveMarker);

    return () => {
      window.removeEventListener("removeMarker", handleRemoveMarker);
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{
        height: "750px",
        width: "90%",
        maxWidth: "1200px",
        margin: "20px auto",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    />
  );
}
