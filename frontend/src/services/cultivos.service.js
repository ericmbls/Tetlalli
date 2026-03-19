<<<<<<< HEAD
export const getCultivos = async () => {
  const res = await fetch("http://localhost:3000/api/cultivos");
=======
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

>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
  return res.json();
};

export const createCultivo = async (data) => {
<<<<<<< HEAD
  if (data instanceof FormData) {
    const res = await fetch("http://localhost:3000/api/cultivos", {
      method: "POST",
      body: data,
    });
    return res.json();
  }

  const res = await fetch("http://localhost:3000/api/cultivos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
=======
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

>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
  return res.json();
};

export const updateCultivo = async (id, data) => {
<<<<<<< HEAD
  const res = await fetch(`http://localhost:3000/api/cultivos/${id}`, {
    method: "PATCH",
    headers: data instanceof FormData ? {} : { "Content-Type": "application/json" },
    body: data instanceof FormData ? data : JSON.stringify(data),
  });
  return res.json();
=======
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
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
};