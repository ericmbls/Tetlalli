const API_URL = "http://localhost:3000/api/usuarios";
const AUTH_URL = "http://localhost:3000/api/auth";

const getToken = () => localStorage.getItem("token");

const request = async (url, options = {}) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    let message = "Error en la solicitud";
    try {
      const data = await res.json();
      message = data.message || message;
    } catch {}
    throw new Error(message);
  }
  return res.json();
};

export const getUsuarios = async () => {
  return request(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};

export const createUsuarioAdmin = async (data) => {
  return request(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  });
};

export const updateUsuario = async (id, data) => {
  if (data.role) {
    data.role = data.role.toLowerCase(); 
  }

  return request(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  });
};

export const deleteUsuario = async (id) => {
  return request(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};

export const registerUsuario = async (data) => {
  return request(`${AUTH_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
};

export const loginUsuario = async (data) => {
  return request(`${AUTH_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
};