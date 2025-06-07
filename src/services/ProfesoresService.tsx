import axios from "axios";
import { API_BASE } from "../config";
import type { Profesor } from "../types/Profesor";

const BASE_URL = `${API_BASE}profesores`;

export async function getProfesores(): Promise<Profesor[]> {
  try {
    const res = await axios.get(BASE_URL);
    return res.data.data || res.data;
  } catch (error) {
    console.error("Error al obtener profesores:", error);
    throw error;
  }
}

export const createProfesor = async (nuevo: Profesor): Promise<Profesor> => {
  const res = await axios.post(BASE_URL, nuevo);
  return res.data;
};

export const updateProfesor = async (
  id_p: number,
  actualizado: Partial<Profesor>
): Promise<Profesor> => {
  const res = await axios.put(`${BASE_URL}/${id_p}`, actualizado);
  return res.data;
};

export const deleteProfesor = async (
  id_p: number
): Promise<{ message: string }> => {
  const res = await axios.delete(`${BASE_URL}/${id_p}`);
  return res.data;
};
