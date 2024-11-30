import { create } from "zustand";

const useFavoriteStore = create((set) => ({
  favorites: [],

  initializeFavorites: () => {
    if (typeof window !== "undefined") {
      const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      set({ favorites: storedFavorites });
    }
  },

  addFavorite: (character) => {
    set((state) => {
      const alreadyInFavorites = state.favorites.some(
        (fav) => fav.id === character.id
      );

      if (alreadyInFavorites) {
        return state;
      }
      const updatedFavorites = [...state.favorites, character];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    });
  },

  removeFavorite: (id) => {
    set((state) => {
      const updatedFavorites = state.favorites.filter(
        (character) => character.id !== id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    });
  },
}));

export default useFavoriteStore;
