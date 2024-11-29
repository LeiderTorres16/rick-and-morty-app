"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useFavoriteStore from "@/stores/useFavoriteStore";

export default function FavoritosPage() {
  const { favorites, removeFavorite, initializeFavorites } = useFavoriteStore();
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    initializeFavorites();
  }, []);

  const handleRemoveFavorite = (id, name) => {
    removeFavorite(id);
    setSuccessMessage(`${name} eliminado de favoritos`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mt-8">Favoritos</h1>

      {/* Mensaje de éxito */}
      {successMessage && (
        <motion.div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded shadow-md z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {successMessage}
        </motion.div>
      )}

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {favorites.map((character) => (
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
              <motion.button
                className="mt-2 bg-red-500 text-white py-1 px-4 rounded"
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRemoveFavorite(character.id, character.name)}
              >
                Eliminar de Favoritos
              </motion.button>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-4">No hay personajes en favoritos.</p>
      )}
    </div>
  );
}
