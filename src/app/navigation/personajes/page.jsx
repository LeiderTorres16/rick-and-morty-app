"use client";

import { useState, useEffect } from "react";
import { PersonajeCard } from "@/components";
import { getPersonajes } from "@/services/rickAndMortyService";


export default function PersonajesPage() {
  const [personajes, setPersonajes] = useState([]);
  const [filteredPersonajes, setFilteredPersonajes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");

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
        <div className="pb-5">
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
