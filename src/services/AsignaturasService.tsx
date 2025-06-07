import axios from "axios"
import { API_BASE } from "../config"
import type { Asignatura } from "../types/Asignatura"

const BASE_URL = `${API_BASE}asignaturas`

/**
 * Obtiene la lista de todas las asignaturas desde la API.
 */
export async function getAsignaturas(): Promise<Asignatura[]> {
  try {
    const response = await axios.get(BASE_URL)
    console.log("Asignaturas obtenidas:", response.data)
    return response.data.data || response.data
  } catch (error) {
    console.error("Error al obtener asignaturas:", error)
    throw new Error("No se pudo obtener la lista de asignaturas.")
  }
}

/**
 * Crea una nueva asignatura.
 */
export const createAsignatura = async (
  nueva: Asignatura
): Promise<Asignatura> => {
  try {
    const res = await axios.post(BASE_URL, nueva)
    return res.data
  } catch (error) {
    console.error("Error al crear asignatura:", error)
    throw new Error("No se pudo crear la asignatura.")
  }
}

/**
 * Actualiza una asignatura existente por su código.
 */
export const updateAsignatura = async (
  codigo: number,
  actualizada: Partial<Asignatura>
): Promise<Asignatura> => {
  try {
    const res = await axios.put(`${BASE_URL}/${codigo}`, actualizada)
    return res.data
  } catch (error) {
    console.error("Error al actualizar asignatura:", error)
    throw new Error("No se pudo actualizar la asignatura.")
  }
}

/**
 * Elimina una asignatura por su código.
 */
export const deleteAsignatura = async (
  codigo: number
): Promise<{ message: string }> => {
  try {
    const res = await axios.delete(`${BASE_URL}/${codigo}`)
    return res.data
  } catch (error) {
    console.error("Error al eliminar asignatura:", error)
    throw new Error("No se pudo eliminar la asignatura.")
  }
}
