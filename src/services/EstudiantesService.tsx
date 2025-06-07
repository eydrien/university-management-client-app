import axios from "axios";
import { API_BASE } from "../config";
import type { Estudiante } from "../types/Estudiante";

const BASE_URL = `${API_BASE}estudiantes`;

/**
 * Obtiene la lista de todos los estudiantes desde la API.
 */
export async function getEstudiantes(): Promise<Estudiante[]> {
  try {
    const response = await axios.get(BASE_URL);
    console.log("Estudiantes obtenidos:", response.data);
    return response.data.data; // O response.data según lo que devuelva tu backend
  } catch (error) {
    console.error("Error al obtener estudiantes:", error);
    throw error;
  }
}

/**
 * Crea un nuevo estudiante.
 */
export const createEstudiante = async (nuevo: Estudiante): Promise<Estudiante> => {
  const res = await axios.post(BASE_URL, nuevo);
  return res.data;
};

/**
 * Actualiza un estudiante existente según su código.
 */
export const updateEstudiante = async (
  codigo: number,
  actualizado: Partial<Estudiante>
): Promise<Estudiante> => {
  const res = await axios.put(`${BASE_URL}/${codigo}`, actualizado);
  return res.data;
};

/**
 * Elimina un estudiante por su código.
 */
export const deleteEstudiante = async (
  codigo: number
): Promise<{ message: string }> => {
  const res = await axios.delete(`${BASE_URL}/${codigo}`);
  return res.data;
};
