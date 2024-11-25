import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Declaration = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8084/api/crud/')
      .then(res => {
        setData(res.data);
        setFilteredData(res.data); // Set initial filtered data to all data
      })
      .catch(err => setError(err.message));
  }, []);

  const handleEdit = (id) => {
    navigate(`/Edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      axios.delete(`http://localhost:8084/api/delete/${id}`)
        .then(res => {
          axios.get('http://localhost:8084/api/crud/')
            .then(res => {
              setData(res.data);
              setFilteredData(res.data);
            })
            .catch(err => setError(err.message));
        })
        .catch(err => console.log(err));
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Filter data based on the search term in multiple fields
    const filteredData = data.filter(traitement => {
      const id = traitement.id ? traitement.id.toString().toLowerCase() : '';
      const nif = traitement.nifEntreprise ? traitement.nifEntreprise.toString().toLowerCase() : '';
      const nom = traitement.nomEntreprise ? traitement.nomEntreprise.toString().toLowerCase() : '';
      const adresse = traitement.adresseEntreprise ? traitement.adresseEntreprise.toString().toLowerCase() : '';
      const tel = traitement.telEntreprise ? traitement.telEntreprise.toString().toLowerCase() : '';
      const nomSalarie = traitement.nomSalarie ? traitement.nomSalarie.toString().toLowerCase() : '';

      // Check if any of the fields include the search term
      return (
        id.includes(searchTerm) ||
        nif.includes(searchTerm) ||
        nom.includes(searchTerm) ||
        adresse.includes(searchTerm) ||
        tel.includes(searchTerm) ||
        nomSalarie.includes(searchTerm)
      );
    });
    
    setFilteredData(filteredData); // Update the filtered data
  };

  return (
    <div>
      <div className="container mt-4 p-3 shadow-lg rounded mx-auto" style={{ maxWidth: '90%' }}>
        <div className="d-flex justify-content-end mb-3">
          {/* Barre de recherche alignée à droite avec un espacement à gauche pour le bouton d'ajout */}
          <input
            type="text"
            className="form-control" 
            style={{ maxWidth: '400px', marginRight: '10px' }} // Espace entre la barre de recherche et le bouton
            placeholder="Rechercher par ID ou NIF Entreprise"
            value={searchTerm}
            onInput={handleSearch} // Use onInput for immediate search
          />
          {/* Bouton d'ajout aligné à droite */}
          <Link to="/Create" className="btn btn-success"><i className="bi bi-plus-circle"></i></Link>
        </div>

        {error ? (
          <div className="alert alert-danger" role="alert">
            Error: {error}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table table-striped table-bordered table-hover text-center">
              <thead className="thead-dark">
                <tr>
                  <th>id</th>
                  <th>nifEntreprise</th>
                  <th>statEntreprise</th>
                  <th>nomEntreprise</th>
                  <th>adresseEntreprise</th>
                  <th>telEntreprise</th>
                  <th>nomSalarie</th>
                  <th>cinSalarie</th>
                  <th>adresseSalarie</th>
                  <th>telSalarie</th>
                  <th>emailSalarie</th>
                  <th>lieuTravail</th>
                  <th>Annee</th>
                  <th>Salaire</th>
                  <th>TauxImposition</th>
                  <th>Montant</th>
                  <th>DateRetard</th>
                  <th>Duree</th>
                  <th>Penalite</th>
                  <th>MontantTotal</th>
                  <th>LieuImposition</th>
                  <th>DateDepot</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((traitement, index) => (
                  <tr key={index}>
                    <td>{traitement.id}</td>
                    <td>{traitement.nifEntreprise}</td>
                    <td>{traitement.statEntreprise}</td>
                    <td>{traitement.nomEntreprise}</td>
                    <td>{traitement.adresseEntreprise}</td>
                    <td>{traitement.telEntreprise}</td>
                    <td>{traitement.nomSalarie}</td>
                    <td>{traitement.cinSalarie}</td>
                    <td>{traitement.adresseSalarie}</td>
                    <td>{traitement.telSalarie}</td>
                    <td>{traitement.emailSalarie}</td>
                    <td>{traitement.lieuTravail}</td>
                    <td>{traitement.Annee}</td>
                    <td>{traitement.Salaire}</td>
                    <td>{traitement.TauxImposition}</td>
                    <td>{traitement.Montant}</td>
                    <td>{traitement.DateRetard}</td>
                    <td>{traitement.Duree}</td>
                    <td>{traitement.Penalite}</td>
                    <td>{traitement.MontantTotal}</td>
                    <td>{traitement.LieuImposition}</td>
                    <td>{traitement.DateDepot}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center">
                        <Link to={`/Read/${traitement.id}`} className="btn btn-sm btn-dark mx-1"> <i className="bi bi-eye"></i></Link>
                        <button onClick={() => handleEdit(traitement.id)} className="btn btn-sm btn-success mx-1"><i className="bi bi-pencil"></i></button>
                        <button onClick={() => handleDelete(traitement.id)} className="btn btn-sm btn-danger mx-1"> <i className="bi bi-trash"></i></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Declaration;
