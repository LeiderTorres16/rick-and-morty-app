"use client"; // Asegurarse de que este componente es un componente de cliente

import { useState, useEffect } from "react";
import axios from "axios";
import { PersonajeCard } from "@/components";
import { notFound } from "next/navigation";

async function getPersonajes(page = 1) {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    
    return response.data;
  } catch (error) {
    return notFound();
  }
}

export default function PersonajesPage() {
  const [personajes, setPersonajes] = useState([]);
  const [filteredPersonajes, setFilteredPersonajes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState(""); // Instancia de useRouter

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

      {filteredPersonajes.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {filteredPersonajes.map((character) => (
              <PersonajeCard key={character.id} character={character}/>
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
