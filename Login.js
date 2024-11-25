import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [values, setValues] = useState({
    NIF: '',
    passwd: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8084/Login', values)
      .then(res => {
        if (res.data.Status === "Success") {
          navigate('/Selection');
        } else {
          setErrorMessage(res.data.Error);
        }
      })
      .catch(err => {
        console.error(err);
        setErrorMessage("An error occurred during login.");
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5" style={{ height: '50vh' }}>
      
      <div className="row align-items-center shadow-lg p-4 bg-white rounded" style={{ display: 'flex', width: '80%', borderRadius: '15px' }}>
      
        {/* Section de l'image et du logo */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img
            src="logo-1.png"  // Assurez-vous que l'image est dans le dossier public ou src selon votre structure
            alt="Logo"
            className="img-fluid"
            style={{ width: '8000px', height: '420px', margin: 'auto',marginTop:'135px',paddingBottom:'73px' }} // Ajustez les dimensions selon vos besoins
          />
        </div>

        {/* Formulaire de connexion */}
        <div className="col-md-6">
        <h2 className="text-center mb-4" style={{ color: '#095a0f' }}>Connexion</h2>
          <form 
            onSubmit={handleSubmit} 
            className="p-4 shadow-sm rounded"
            style={{ backgroundColor: '#095a0f', color: 'white' }} // Arrière-plan vert et texte blanc
          >
            <div className="form-group mb-3">
              <label htmlFor='NIF'><strong>NIF</strong></label>
              <input
                type="text"
                name="NIF"
                placeholder='Entrez votre NIF'
                value={values.NIF}
                onChange={e => setValues({ ...values, NIF: e.target.value })}
                className='form-control rounded-0'
                required
              />
            </div>

            {/* Champ Mot de passe avec bouton d'affichage */}
            <div className="form-group mb-3 position-relative">
              <label htmlFor='Mot de passe'><strong>Mot de passe</strong></label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="passwd"
                  placeholder='Entrez votre mot de passe'
                  value={values.passwd}
                  onChange={e => setValues({ ...values, passwd: e.target.value })}
                  className='form-control rounded-0'
                  required
                />
                <span
                  className="input-group-text bg-light"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {/* Changement entre les icônes d'œil et d'œil barré */}
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <button type="submit" className="btn btn-secondary w-100 rounded-0">
              Se connecter
            </button>

            {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}

            <p className="text-center mt-4">Vous n'avez pas de compte?</p>
            <Link to='/register' className='btn btn-outline-secondary w-100 rounded-0'>
              Créer un compte
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
