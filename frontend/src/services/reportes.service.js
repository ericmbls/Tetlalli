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

export async function updateReporte(id, data) {
  const res = await authFetch(`/api/reportes/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  });
  if (!res.ok) throw new Error("Error actualizando reporte");
  return res.json();
}

export async function removeReporte(id) {
  const res = await authFetch(`/api/reportes/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Error eliminando reporte");
  return res.json();
}