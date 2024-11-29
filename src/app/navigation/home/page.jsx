"use client";

import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height: "calc(100vh - 64px)", overflow: "hidden" }}
    >
      {/* Animación del título */}
      <motion.h1
        className="text-5xl font-bold text-center text-blue-600"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Bienvenido a Rick & Morty App
      </motion.h1>

      {/* Animación de descripción */}
      <motion.p
        className="text-lg text-gray-700 text-center mt-4 max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Explora las funcionalidades de la aplicación, interactúa con el mapa y
        gestiona tus favoritos. Todo está diseñado para ofrecerte la mejor
        experiencia.
      </motion.p>

      {/* Animación de carga */}
      <motion.div
        className="flex items-center justify-center mt-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="flex gap-2">
          <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-100"></span>
          <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-200"></span>
          <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-300"></span>
        </div>
      </motion.div>
    </div>
  );
}
