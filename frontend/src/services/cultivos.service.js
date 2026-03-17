const API_URL = "http://localhost:3000/api/cultivos";

const getToken = () => localStorage.getItem("token");

export const getCultivos = async () => {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Error obteniendo cultivos");
  }

  return res.json();
};

export const createCultivo = async (data) => {
  const headers = data instanceof FormData
    ? { Authorization: `Bearer ${getToken()}` }
    : {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      };

  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: data instanceof FormData ? data : JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error creando cultivo");
  }

  return res.json();
};

export const updateCultivo = async (id, data) => {
  const headers = data instanceof FormData
    ? { Authorization: `Bearer ${getToken()}` }
    : {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      };

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers,
    body: data instanceof FormData ? data : JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error actualizando cultivo");
  }

  return res.json();
};

export const deleteCultivo = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Error eliminando cultivo");
  }

  return true;
};