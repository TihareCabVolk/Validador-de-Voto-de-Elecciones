import type { ApiError } from "@/types/ApiError";
import type { Votante } from "@/types/Votante";

const MOCK_DB: Record<number, Votante> = {
  15987452: {
    rut: 15987452,
    name: "Daniela",
    lastname: "Rojas",
    age: 28,
    habilitado: true,
  },
  18456321: {
    rut: 18456321,
    name: "Tomas",
    lastname: "Vega",
    age: 16,
    habilitado: false,
  },
  20145789: {
    rut: 20145789,
    name: "Camila",
    lastname: "Soto",
    age: 34,
    habilitado: true,
  },
  17654322: {
    rut: 17654322,
    name: "Benjamin",
    lastname: "Flores",
    age: 17,
    habilitado: false,
  },
  22345678: {
    rut: 22345678,
    name: "Valentina",
    lastname: "Morales",
    age: 22,
    habilitado: true,
  },
  19876543: {
    rut: 19876543,
    name: "Sebastian",
    lastname: "Contreras",
    age: 15,
    habilitado: false,
  },
  14567890: {
    rut: 14567890,
    name: "Fernanda",
    lastname: "Castillo",
    age: 41,
    habilitado: true,
  },
  21234567: {
    rut: 21234567,
    name: "Matias",
    lastname: "Navarro",
    age: 19,
    habilitado: true,
  },
  16789432: {
    rut: 16789432,
    name: "Antonia",
    lastname: "Herrera",
    age: 14,
    habilitado: false,
  },
  23456789: {
    rut: 23456789,
    name: "Diego",
    lastname: "Fuentes",
    age: 52,
    habilitado: true,
  },
};

const B_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export async function getVotante(rut: string): Promise<Votante> {
  const res = await fetch(`${B_URL}/votante/${rut}`);
  //await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
  //const data = MOCK_DB[Number.parseInt(rut, 10)];
  if (res.status === 400) {
    throw { code: 400, message: "RUT inválido" } satisfies ApiError;
  }

  if (res.status === 404) {
    throw { code: 404, message: `votante con rut ${rut} no encontrado` } satisfies ApiError;
  }

  return res.json();
  //if (!data) {
   // throw {
     // code: 404,
     // message: `votante con rut ${rut} no encontrado`,
   // } satisfies ApiError;
  //}**

  //return data;
}
