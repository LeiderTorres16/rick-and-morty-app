"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Iconos personalizados para los marcadores
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// Componente para manejar eventos de clic en el mapa
function AddMarker({ onAddMarker }) {
  useMapEvents({
    click(e) {
      onAddMarker(e.latlng); // Llama a la función para agregar el marcador
    },
  });
  return null;
}

export default function MapaColombia() {
  const [markers, setMarkers] = useState([
    { id: 1, position: [10.46314, -73.25322], description: "Valledupar: Tierra de música vallenata." },
    { id: 2, position: [4.711, -74.0721], description: "Bogotá: Capital de Colombia." },
  ]); // Lista inicial de marcadores, incluyendo los predeterminados

  const handleAddMarker = (latlng) => {
    setMarkers((prev) => [
      ...prev,
      { id: Date.now(), position: [latlng.lat, latlng.lng], description: "Marcador personalizado" },
    ]);
  };

  const handleRemoveMarker = (e, id) => {
    e.stopPropagation(); // Detiene la propagación del evento de clic
    setMarkers((prev) => prev.filter((marker) => marker.id !== id)); // Filtra el marcador a eliminar
  };

  useEffect(() => {
    return () => {
      // Limpia cualquier instancia previa del mapa
      const mapContainers = document.querySelectorAll(".leaflet-container");
      mapContainers.forEach((container) => {
        if (container._leaflet_id) {
          container._leaflet_id = null;
        }
      });
    };
  }, []);

  return (
    <div className="container mx-auto px-4 mt-8">
      <h1 className="text-3xl font-bold text-center">Mapa de Colombia</h1>
      <MapContainer
        center={[4.570868, -74.297333]} // Coordenadas centrales de Colombia
        zoom={6} // Nivel de zoom inicial
        scrollWheelZoom={false} // Deshabilitar zoom con scroll
        style={{ height: "600px", width: "100%", marginTop: "20px", borderRadius: "8px" }}
      >
        {/* Capa del mapa */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Marcadores dinámicos */}
        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.position} icon={customIcon}>
            <Popup>
              <div className="text-center">
                <p>{marker.description}</p>
                <button
                  className="mt-2 bg-red-500 text-white py-1 px-3 rounded"
                  onClick={(e) => handleRemoveMarker(e, marker.id)}
                >
                  Eliminar
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Componente para capturar clics en el mapa */}
        <AddMarker onAddMarker={handleAddMarker} />
      </MapContainer>
    </div>
  );
}
