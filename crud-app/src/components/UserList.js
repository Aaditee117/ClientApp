import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUser } from '../services/userService';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toasterTimer } from '../utils/Contants';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (error) {
        toast.error('Failed to load users',toasterTimer);
      }
    };
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
      toast.success('User deleted successfully',toasterTimer);
    } catch (error) {
      toast.error('Error deleting user',toasterTimer);
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <Link style={{position: "absolute",right: "10px",top: "20px"}} to="/create">Create New User</Link>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <div className="listItem">
            <p>{user.name} - {user.email}</p>
            <div>
            <Link style={{padding:"10px"}} to={`/edit/${user.id}`}>Edit</Link>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
