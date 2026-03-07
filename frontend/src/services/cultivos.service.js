export const getCultivos = async () => {
  const res = await fetch("http://localhost:3000/api/cultivos");
  return res.json();
};

export const createCultivo = async (data) => {
  if (!(data instanceof FormData)) {
    const res = await fetch("http://localhost:3000/api/cultivos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  }

  const res = await fetch("http://localhost:3000/api/cultivos", {
    method: "POST",
    body: data,
  });
  return res.json();
};