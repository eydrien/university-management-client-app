import axios from "axios";
import { API_BASE } from "../config";
import type { Estudiante } from "../types/Estudiante";

const BASE_URL = `${API_BASE}estudiantes`;

export async function getEstudiantes(): Promise<Estudiante[]> {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  console.log('Respuesta completa:', data); // para confirmar la estructura

  return data.data; 
}

export const createEstudiante = async (nuevo: Estudiante) => {
  const res = await axios.post(BASE_URL, nuevo);
  return res.data;
};


export const updateEstudiante = async (codigo: number, actualizado: Partial<Estudiante>) => {
  const res = await axios.put(`${BASE_URL}${codigo}`, actualizado);
  return res.data;
};

export const deleteEstudiante = async (codigo: number) => {
  const res = await axios.delete(`${BASE_URL}${codigo}`);
  return res.data;
};
