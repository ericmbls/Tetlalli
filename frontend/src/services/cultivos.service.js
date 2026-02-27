export const getCultivos = async () => {
  const res = await fetch("http://localhost:3000/cultivos");
  return res.json();
};

export const createCultivo = async (data) => {
  const res = await fetch("http://localhost:3000/cultivos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
<<<<<<< HEAD
};
=======
};

>>>>>>> 743b11d50e10de0d8abcac4b1ae09b420b60a52e
