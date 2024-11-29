import React from "react";
import axios from "axios";

async function getPersonaje(id) {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al consultar el personaje:", error);
    return { results: [], info: {} };
  }
}

export default async function PersonajePage({ params }) {

  const {id } = await params;

  const character = await getPersonaje(id);

  return (
    <div className="container mx-auto px-4 mt-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Título del personaje */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          {character.name}
        </h1>

        {/* Contenedor de la imagen y la información */}
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Imagen del personaje */}
          <div className="flex justify-center md:w-1/3">
            <img
              src={character.image}
              alt={character.name}
              className="rounded-lg shadow-lg w-full md:w-64 h-auto"
            />
          </div>

          {/* Detalles del personaje */}
          <div className="mt-6 md:mt-0 md:w-2/3">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-lg font-semibold text-gray-600">
                <strong>Especie:</strong>
              </div>
              <div className="text-lg text-gray-800">{character.species}</div>

              <div className="text-lg font-semibold text-gray-600">
                <strong>Estado:</strong>
              </div>
              <div className="text-lg text-gray-800">{character.status}</div>

              <div className="text-lg font-semibold text-gray-600">
                <strong>Género:</strong>
              </div>
              <div className="text-lg text-gray-800">{character.gender}</div>

              <div className="text-lg font-semibold text-gray-600">
                <strong>Origen:</strong>
              </div>
              <div className="text-lg text-gray-800">{character.origin.name}</div>

              <div className="text-lg font-semibold text-gray-600">
                <strong>Ubicación:</strong>
              </div>
              <div className="text-lg text-gray-800">{character.location.name}</div>

              <div className="text-lg font-semibold text-gray-600">
                <strong>Tipo:</strong>
              </div>
              <div className="text-lg text-gray-800">
                {character.type || "No disponible"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
