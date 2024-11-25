import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importation des icônes

const Register = () => {
  const [Nom, setNom] = useState('');
  const [NIF, setNIF] = useState('');
  const [passwd, setPasswd] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialiser useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8084/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Nom, NIF, passwd }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      navigate('/login'); // Redirection vers la page de connexion
    } else {
      alert(data.message || "Erreur lors de l'enregistrement");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5" style={{ height: '50vh' }}>
      <div className="row align-items-center shadow-lg p-4 bg-white rounded" style={{ display: 'flex', width: '80%', borderRadius: '15px' }}>
        
        {/* Formulaire d'inscription */}
        <div className="col-md-12">
          <h2 className="text-center mb-4" style={{ color: '#095a0f' }}>Inscription</h2>
          <form 
            onSubmit={handleRegister} 
            className="p-4 shadow-sm rounded"
            style={{ backgroundColor: '#095a0f', color: 'white' }} // Arrière-plan vert
          >
            <div className="form-group mb-3">
              <label htmlFor='Nom'><strong>Nom</strong></label>
              <input
                type="text"
                name="Nom"
                placeholder='Entrez votre nom'
                value={Nom}
                onChange={(e) => setNom(e.target.value)}
                className='form-control rounded-0'
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor='NIF'><strong>NIF</strong></label>
              <input
                type="text"
                name="NIF"
                placeholder='Entrez votre NIF'
                value={NIF}
                onChange={(e) => setNIF(e.target.value)}
                className='form-control rounded-0'
                required
              />
            </div>

            <div className="form-group mb-3 position-relative">
              <label htmlFor='Mot de passe'><strong>Mot de passe</strong></label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="passwd"
                  placeholder='Entrez votre mot de passe'
                  value={passwd}
                  onChange={(e) => setPasswd(e.target.value)}
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
              S'inscrire
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
