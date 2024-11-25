import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Commerce = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8084/api/crud/')
      .then(res => setData(res.data))
      .catch(err => setError(err.message));
  }, []);

  const handleEdit = (index) => {
    // Implement edit functionality
    console.log(`Edit row at index: ${index}`);
  };

  const handleDelete = (NIF) => {
    axios.delete(`http://localhost:8084/api/delete/${NIF}`)
      .then(res => {
        // Refresh the data after deletion
        axios.get('http://localhost:8084/api/crud/')
          .then(res => setData(res.data))
          .catch(err => setError(err.message));
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <div className="d-flex justify-content-end">
        <Link to="/Create" className="btn btn-warning">Create</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>NIF</th>
            <th>Nom</th>
            <th>CIN</th>
            <th>Adresse</th>
            <th>Tel</th>
            <th>LieuTravail</th>
            <th>Annee</th>
            <th>Impot</th>
            <th>Salaire</th>
            <th>TauxImposition</th>
            <th>Montant</th>
            <th>Mois</th>
            <th>Duree</th>
            <th>Penalite</th>
            <th>MontantTotal</th>
            <th>LieuImposition</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((traitement, index) => (
            <tr key={index}>
              <td>{traitement.NIF}</td>
              <td>{traitement.Nom}</td>
              <td>{traitement.CIN}</td>
              <td>{traitement.Adresse}</td>
              <td>{traitement.Tel}</td>
              <td>{traitement.LieuTravail}</td>
              <td>{traitement.Annee}</td>
              <td>{traitement.Impot}</td>
              <td>{traitement.Salaire}</td>
              <td>{traitement.TauxImposition}</td>
              <td>{traitement.Montant}</td>
              <td>{traitement.Mois}</td>
              <td>{traitement.Duree}</td>
              <td>{traitement.Penalite}</td>
              <td>{traitement.MontantTotal}</td>
              <td>{traitement.LieuImposition}</td>
              <td>
                <Link to={`/Read/${traitement.NIF}`} className="btn btn-warning">Read</Link>&nbsp;
                <Link to={`Edit/${traitement.NIF}`} className="btn btn-success">Edit</Link>&nbsp;
                <button onClick={() => handleDelete(traitement.NIF)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Commerce;
