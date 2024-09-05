import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Adjust path as per your file structure



const App = () => {
  return (
    <Router>
      <div>
        <ToastContainer />
        <Routes>  {/* Replacing Switch with Routes */}
          <Route path="/" element={<UserList />} />
          <Route path="/create" element={<UserForm />} />
          <Route path="/edit/:id" element={<UserForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
