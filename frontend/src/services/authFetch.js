export const authFetch = (url, options = {}) => {
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
  });
};