"use client"; // Asegurarse de que este componente es un componente de cliente

import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Importar Framer Motion
import useFavoriteStore from "@/stores/useFavoriteStore";
import axios from "axios";
import { useRouter } from "next/navigation"; // Importar useRouter correctamente desde 'next/navigation'

async function getPersonajes(page = 1) {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al consultar los personajes:", error);
    return { results: [], info: {} };
  }
}

export default function PersonajesPage() {
  const [personajes, setPersonajes] = useState([]);
  const [filteredPersonajes, setFilteredPersonajes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje
  const { addFavorite } = useFavoriteStore();
  const router = useRouter(); // Instancia de useRouter

  useEffect(() => {
    async function fetchData() {
      const data = await getPersonajes(page);
      setPersonajes((prev) => [
        ...prev,
        ...data.results.filter(
          (newCharacter) => !prev.some((char) => char.id === newCharacter.id)
        ),
      ]);
      setHasMore(!!data.info.next);
    }
    fetchData();
  }, [page]);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredPersonajes(personajes);
    } else {
      setFilteredPersonajes(
        personajes.filter((character) =>
          character.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, personajes]);

  const handleAddFavorite = (character) => {
    addFavorite(character);
    setSuccessMessage(`${character.name} añadido a favoritos`); // Establecer el mensaje
    setTimeout(() => setSuccessMessage(""), 3000); // Limpiar el mensaje después de 3 segundos
  };

  const handleViewDetails = (id) => {
    // Redirigir a la página de detalles del personaje
    router.push(`/navigation/personaje/${id}`);
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mt-8">
        Personajes de Rick and Morty
      </h1>

      {/* Barra de búsqueda */}
      <div className="flex justify-center mt-6">
        <input
          type="text"
          className="border p-2 rounded w-full sm:w-1/2"
          placeholder="Buscar personajes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Mensaje de éxito */}
      {successMessage && (
        <motion.div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded shadow-md z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {successMessage}
        </motion.div>
      )}

      {filteredPersonajes.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {filteredPersonajes.map((character) => (
              <motion.div
                key={character.id}
                className="border rounded-lg p-4 shadow-md bg-white text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h2 className="text-xl font-semibold mt-2">{character.name}</h2>
                <div className="mt-4 flex justify-between items-center">
                  <motion.button
                    className="bg-blue-500 text-white py-1 px-4 rounded"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleAddFavorite(character)}
                  >
                    <i className="mr-2 fas fa-heart"></i> Agregar a Favoritos
                  </motion.button>
                  <motion.button
                    className="bg-green-500 text-white py-1 px-4 rounded"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleViewDetails(character.id)}
                  >
                    Ver Detalles
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
          {hasMore && (
            <div className="text-center mt-6">
              <button
                className="bg-green-500 text-white py-2 px-6 rounded"
                onClick={loadMore}
              >
                Cargar más
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center mt-4">No hay personajes para mostrar.</p>
      )}
    </div>
  );
}
