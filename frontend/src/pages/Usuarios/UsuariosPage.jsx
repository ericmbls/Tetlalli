import { useState, useEffect, useMemo } from 'react';
import { Trash2, Search, Plus, Edit3, MoreVertical, Lock, Unlock } from 'lucide-react';
import './UsuariosPage.css';

import {
  getUsuarios,
  deleteUsuario,
  createUsuarioAdmin,
  updateUsuario
} from "../../services/usuarios.service";

import AddUsuarioModal from "../../components/usuarios/AddUsuarioModal";
import EditUsuarioModal from "../../components/usuarios/EditUsuarioModal";

export default function UsuariosPage() {
<<<<<<< HEAD

  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

=======
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsuarios();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
      setUsers([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUsuario(id);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      console.error("Error eliminando usuario:", err);
    }
  };

  const handleCreateUsuario = async (nuevoUsuario) => {
    try {
      const creado = await createUsuarioAdmin(nuevoUsuario);
      setUsers(prev => [...prev, creado]);
    } catch (err) {
      console.error("Error creando usuario:", err);
    }
  };

  const handleUpdateUsuario = async (data) => {
    try {
      const actualizado = await updateUsuario(editingUser.id, data);
<<<<<<< HEAD

      setUsers(prev =>
        prev.map(u => (u.id === actualizado.id ? actualizado : u))
      );

=======
      setUsers(prev => prev.map(u => (u.id === actualizado.id ? actualizado : u)));
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
      setEditingUser(null);
    } catch (err) {
      console.error("Error actualizando usuario:", err);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const email = user?.email?.toLowerCase() || "";
      const role = user?.role?.toLowerCase() || "";
<<<<<<< HEAD

=======
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
      return (
        email.includes(searchTerm.toLowerCase()) ||
        role.includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm, users]);

  const getInitials = (email) => {
    if (!email) return "??";
    return email.slice(0, 2).toUpperCase();
  };

  return (
    <div className="dashboard-content">
<<<<<<< HEAD

      <div className="page-header-row">

        <div>
          <h1 className="page-title">Gestión de Usuarios</h1>
          <p className="page-subtitle">
            Administrar usuarios, roles y permisos
          </p>
        </div>

        <button
          className="btn-primary-brown"
          onClick={() => setIsAddOpen(true)}
        >
          <Plus size={18} style={{ marginRight: 8 }} />
          Nuevo Usuario
        </button>

      </div>

      <div className="search-bar-row">

        <div className="search-input-wrapper">

          <Search size={18} />

=======
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Gestión de Usuarios</h1>
          <p className="page-subtitle">Administrar usuarios, roles y permisos</p>
        </div>

        <button className="btn-primary-brown" onClick={() => setIsAddOpen(true)}>
          <Plus size={18} style={{ marginRight: 8 }} />
          Nuevo Usuario
        </button>
      </div>

      <div className="search-bar-row">
        <div className="search-input-wrapper">
          <Search size={18} />
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
          <input
            type="text"
            placeholder="Buscar por email o rol"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
<<<<<<< HEAD

        </div>

      </div>

      <div className="users-table-container">

        <table className="users-table-custom">

=======
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table-custom">
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Última Actividad</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
<<<<<<< HEAD

          <tbody>

            {filteredUsers?.map((user) => (

              <tr key={user.id}>

                <td>

                  <div className="user-cell-profile">

                    <div className="user-avatar-small">
                      {getInitials(user?.email)}
                    </div>

                    <span>{user?.email || "Sin email"}</span>

                  </div>

                </td>

                <td>{user?.role || "user"}</td>

                <td>{user?.lastActive || "N/A"}</td>

                <td>

                  <div className="status-cell">

                    {user?.status === "Activo"
                      ? <Unlock size={14} />
                      : <Lock size={14} />}

                    <span>{user?.status || "Activo"}</span>

                  </div>

                </td>

                <td>

                  <div className="actions-cell">

                    <button
                      className="icon-btn-ghost"
                      onClick={() => setEditingUser(user)}
                    >
                      <Edit3 size={16} />
                    </button>

                    <button
                      className="icon-btn-ghost"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash2 size={16} />
                    </button>

                    <button className="icon-btn-ghost">
                      <MoreVertical size={16} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

=======
          <tbody>
            {filteredUsers?.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-cell-profile">
                    <div className="user-avatar-small">{getInitials(user?.email)}</div>
                    <span>{user?.email || "Sin email"}</span>
                  </div>
                </td>
                <td>{user?.role || "user"}</td>
                <td>{user?.lastActive || "N/A"}</td>
                <td>
                  <div className="status-cell">
                    {user?.status === "Activo" ? <Unlock size={14} /> : <Lock size={14} />}
                    <span>{user?.status || "Activo"}</span>
                  </div>
                </td>
                <td>
                  <div className="actions-cell">
                    <button className="icon-btn-ghost" onClick={() => setEditingUser(user)}>
                      <Edit3 size={16} />
                    </button>
                    <button className="icon-btn-ghost" onClick={() => handleDelete(user.id)}>
                      <Trash2 size={16} />
                    </button>
                    <button className="icon-btn-ghost">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
      </div>

      <AddUsuarioModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={handleCreateUsuario}
      />

      <EditUsuarioModal
        isOpen={!!editingUser}
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onSave={handleUpdateUsuario}
      />
<<<<<<< HEAD

=======
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
    </div>
  );
}