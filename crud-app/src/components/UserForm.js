import React, { useState, useEffect } from 'react';
import { createUser, updateUser, fetchUsers, fetchSingleUsers } from '../services/userService';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toasterTimer } from '../utils/Contants';

const UserForm = () => {
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const loadUser = async () => {
        try {
          const response = await fetchSingleUsers(id);
          setUser(response.data);
        } catch (error) {
          toast.error('Error fetching user',toasterTimer);
        }
      };
      loadUser();
    }
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateUser(id, user);
        toast.success('User updated successfully',toasterTimer);
      } else {
        await createUser(user);
        toast.success('User created successfully',toasterTimer);
      }
      navigate('/');
    } catch (error) {
      toast.error('Error saving user',toasterTimer);
    }
  };

  return (
    <div className='formComponent'>
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
      <input type="text" name="phone" placeholder="Phone" value={user.phone} onChange={handleChange} required />
      <button type="submit">{id ? 'Update' : 'Create'} User</button>
    </form>
    </div>
  );
};

export default UserForm;
