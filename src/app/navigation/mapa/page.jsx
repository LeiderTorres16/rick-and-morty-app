"use client";

import dynamic from "next/dynamic";

const MapaColombia = dynamic(() => import("@/components/MapaColombia"), {
  ssr: false,
});

export default function MapaPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-4">Mapa de Colombia</h1>
      <MapaColombia />
    </div>
  );
}
