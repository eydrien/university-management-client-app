import axios from "axios"
import type { Estudiante } from "../types/Estudiante"

const API = "http://localhost:3000/estudiantes"

export const getEstudiantes = async (): Promise<Estudiante[]> => {
  const res = await axios.get(API)
  return res.data
}
