"use client";

import useFavoriteStore from "@/stores/useFavoriteStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaInfoCircle } from "react-icons/fa";

export const PersonajeCard = ({ character }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [messageColor, setMessageColor] = useState("bg-green-500");

  const { addFavorite, removeFavorite, favorites } = useFavoriteStore();
  const router = useRouter();

  const isFavorite = favorites.some((fav) => fav.id === character.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(character.id);
      setSuccessMessage(`${character.name} eliminado de favoritos`);
      setMessageColor("bg-red-500");
    } else {
      addFavorite(character);
      setSuccessMessage(`${character.name} añadido a favoritos`);
      setMessageColor("bg-green-500");
    }
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleViewDetails = (id) => {
    router.push(`/navigation/personaje/${id}`);
  };

  return (
    <>
      {successMessage && (
        <motion.div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${messageColor} text-white py-2 px-4 rounded shadow-md z-50`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {successMessage}
        </motion.div>
      )}
      <motion.div
        key={character.id}
        className="bg-white dark:bg-gray-100 rounded-lg shadow-md overflow-hidden max-w-sm mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={character.image}
          alt={`${character.name} character`}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold dark:text-gray- mb-2">
            {character.name}
          </h2>
        </div>
        <div className="flex justify-between p-4 bg-gray-100 dark:bg-gray-700 space-x-4">
          <motion.button
            onClick={handleToggleFavorite}
            whileTap={{ scale: 0.9 }}
            className={`flex items-center justify-center px-4 py-2 rounded-md transition-colors flex-1 ${
              isFavorite
                ? "bg-red-500 text-white"
                : "bg-white text-gray-800 dark:bg-gray-600 dark:text-white"
            }`}
          >
            <FaHeart
              className={`mr-2 h-5 w-5 ${isFavorite ? "fill-current" : ""}`}
            />
            {isFavorite ? "Favorito" : "Favorito"}
          </motion.button>
          <motion.button
            onClick={() => handleViewDetails(character.id)}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex-1"
          >
            <FaInfoCircle className="mr-2 h-5 w-5" />
            Detalles
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};
