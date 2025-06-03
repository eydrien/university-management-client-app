import axios from "axios";
import type { Estudiante } from "../types/Estudiante";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Tipos para crear y actualizar
export type EstudianteCreate = Omit<Estudiante, "cod_e">;
export type EstudianteUpdate = Partial<Omit<Estudiante, "cod_e">>;

export const getEstudiantes = async (): Promise<Estudiante[]> => {
  try {
    const res = await api.get("/estudiantes");
    return res.data;
  } catch (error) {
    console.error("Error al obtener estudiantes:", error);
    throw error;
  }
};

export const getEstudiante = async (cod_e: number): Promise<Estudiante> => {
  try {
    const res = await api.get(`/estudiantes/${cod_e}`);
    return res.data;
  } catch (error) {
    console.error(`Error al obtener estudiante con cod_e=${cod_e}:`, error);
    throw error;
  }
};

export const createEstudiante = async (
  data: EstudianteCreate
): Promise<Estudiante> => {
  try {
    const res = await api.post("/estudiantes", data);
    return res.data;
  } catch (error) {
    console.error("Error al crear estudiante:", error);
    throw error;
  }
};

export const updateEstudiante = async (
  cod_e: number,
  data: EstudianteUpdate
): Promise<Estudiante> => {
  try {
    const res = await api.put(`/estudiantes/${cod_e}`, data);
    return res.data;
  } catch (error) {
    console.error(`Error al actualizar estudiante con cod_e=${cod_e}:`, error);
    throw error;
  }
};

export const deleteEstudiante = async (cod_e: number): Promise<void> => {
  try {
    await api.delete(`/estudiantes/${cod_e}`);
  } catch (error) {
    console.error(`Error al eliminar estudiante con cod_e=${cod_e}:`, error);
    throw error;
  }
};
