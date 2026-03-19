export const authFetch = (url, options = {}) => {
<<<<<<< HEAD
  const token = localStorage.getItem('token');

  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
=======
  const token = localStorage.getItem("token");
  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  return fetch(`http://localhost:3000${url}`, {
    ...options,
    headers
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
  });
};