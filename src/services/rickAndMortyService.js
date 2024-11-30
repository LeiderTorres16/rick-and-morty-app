import axios from "axios";
import { notFound } from "next/navigation";

const BASE_URL = "https://rickandmortyapi.com/api";

export const getPersonajeId = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/character/${id}`);
    return response.data;
  } catch (error) {
    return notFound();
  }
};

export const getPersonajes = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/character?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener los personajes");
  }
};
