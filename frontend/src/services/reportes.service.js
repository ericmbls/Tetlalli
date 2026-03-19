import { authFetch } from "./authFetch";

export async function getReportesByCultivo(cultivoId) {

  const res = await authFetch(`/api/reportes/cultivo/${cultivoId}`);

  if (!res.ok) {
    throw new Error("Error cargando reportes");
  }

  return res.json();

}

export async function createReporte(data) {

  const res = await authFetch("/api/reportes", {
    method: "POST",
    body: data
  });

  if (!res.ok) {
    const error = await res.text();
    console.error(error);
    throw new Error("Error creando reporte");
  }

  return res.json();

}