import { useState, useEffect, useMemo } from 'react';
import { Trash2, Search, Plus, Edit3, MoreVertical, Lock, Unlock, KeyRound } from 'lucide-react';
import Swal from 'sweetalert2';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const loadUsers = async () => {
    try {
      const data = await getUsuarios();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
      setUsers([]);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    loadUsers();
  }, []);

  const handleResetPassword = async (userId) => {
    const { value: newPassword } = await Swal.fire({
      title: 'Restablecer contraseña',
      input: 'password',
      inputLabel: 'Nueva contraseña',
      inputPlaceholder: 'Mínimo 6 caracteres',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#b0895a',
      inputValidator: (value) => {
        if (!value) return '¡Necesitas escribir una nueva contraseña!';
        if (value.length < 6) return 'Debe tener al menos 6 caracteres';
      }
    });

    if (newPassword) {
      try {
        await updateUsuario(userId, { password: newPassword });
        Swal.fire('¡Éxito!', 'La contraseña se ha actualizado.', 'success');
      } catch (err) {
        Swal.fire('Error', 'No se pudo restablecer la contraseña', 'error');
      }
    }
  };

  const handleResetAllPasswords = async () => {
    const { value: confirm } = await Swal.fire({
      title: 'Restablecer TODAS las contraseñas',
      text: '¿Estás seguro? Todos los usuarios tendrán la misma contraseña temporal.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#9ca3af',
      confirmButtonText: 'Sí, restablecer todas',
      cancelButtonText: 'Cancelar'
    });

    if (confirm) {
      const { value: newPassword } = await Swal.fire({
        title: 'Contraseña temporal',
        input: 'password',
        inputLabel: 'Nueva contraseña para TODOS',
        showCancelButton: true,
        confirmButtonColor: '#b0895a',
        inputValidator: (value) => {
          if (!value || value.length < 6) return 'Debe tener al menos 6 caracteres';
        }
      });

      if (newPassword) {
        try {
          await Promise.all(users.map(u => updateUsuario(u.id, { password: newPassword })));
          Swal.fire('¡Éxito!', 'Se actualizaron todas las contraseñas.', 'success');
        } catch (err) {
          Swal.fire('Error', 'Hubo un error al actualizar algunas contraseñas.', 'error');
        }
      }
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar perfil?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await deleteUsuario(id);
        setUsers(prev => prev.filter(u => u.id !== id));
        Swal.fire('Eliminado', 'El perfil ha sido eliminado.', 'success');
      } catch (err) {
        console.error("Error eliminando usuario:", err);
        Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
      }
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
      setUsers(prev => prev.map(u => (u.id === actualizado.id ? actualizado : u)));
      setEditingUser(null);
    } catch (err) {
      console.error("Error actualizando usuario:", err);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const email = user?.email?.toLowerCase() || "";
      const role = user?.role?.toLowerCase() || "";
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
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Gestión de Usuarios</h1>
          <p className="page-subtitle">Administrar usuarios, roles y permisos</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-primary-brown" onClick={handleResetAllPasswords}>
            <KeyRound size={18} style={{ marginRight: 8 }} />
            Restablecer Todos
          </button>
          <button className="btn-primary-brown" onClick={() => setIsAddOpen(true)}>
            <Plus size={18} style={{ marginRight: 8 }} />
            Nuevo Usuario
          </button>
        </div>
      </div>

      <div className="search-bar-row">
        <div className="search-input-wrapper">
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar por email o rol"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table-custom">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Última Actividad</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
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
                    <button className="icon-btn-ghost" onClick={() => setEditingUser(user)} title="Editar">
                      <Edit3 size={16} />
                    </button>
                    <button className="icon-btn-ghost" onClick={() => handleResetPassword(user.id)} title="Restablecer Contraseña">
                      <KeyRound size={16} />
                    </button>
                    <button className="icon-btn-ghost" onClick={() => handleDelete(user.id)} style={{ color: 'red' }} title="Eliminar">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    </div>
  );
}