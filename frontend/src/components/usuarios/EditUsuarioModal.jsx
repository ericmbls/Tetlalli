import { useState, useEffect } from "react";

export default function EditUsuarioModal({ isOpen, onClose, onSave, user }) {

  const [form, setForm] = useState({
    email: "",
    role: "USER"
  });

  useEffect(() => {
    if (user) {
      setForm({
        email: user.email || "",
        role: user.role || "USER"
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>Editar Usuario</h2>

        <form onSubmit={handleSubmit}>

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="USER">Usuario</option>
            <option value="ADMIN">Admin</option>
          </select>

          <div style={{ display: "flex", gap: 10 }}>

            <button type="submit">
              Guardar
            </button>

            <button type="button" onClick={onClose}>
              Cancelar
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}