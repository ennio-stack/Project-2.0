import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Logout = () => {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  

  // useNavigate hook to handle redirects
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8084')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:8084/logout')
      .then(() => {
        setAuth(false);
        navigate('/login'); // Navigate to login after successful logout
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='container mt-4'>
      {auth ? (
        <div>
          <h3>Welcome, {name}!</h3>
          <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h3>{message || 'You are not authorized'}</h3>
          <h3>Please Login Now</h3>
          <Link to="/login" className="btn btn-success">Logout</Link>
        </div>
      )}
    </div>
  );
};

export default Logout;
