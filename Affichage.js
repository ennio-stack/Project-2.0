

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';



const Affichage = () => {
  const location = useLocation();
  const initialFileContent = location.state?.fileContent || [];
  const validationResults = location.state?.validationResults || [];
  
  const [fileContent, setFileContent] = useState(initialFileContent);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleInputChange = (rowIndex, key, value) => {
    const newData = fileContent.map((row, i) => (i === rowIndex ? { ...row, [key]: value } : row));
    setFileContent(newData);
  };

  const handleAddRow = () => {
    const newRow = {
      id:'',
      nifEntreprise: '',
      statEntreprise: '',
      nomEntreprise: '',
      adresseEntreprise: '',
      telEntreprise: '',
      nomSalarie: '',
      cinSalarie: '',
      adresseSalarie: '',
      telSalaire: '',
      emailSalarie:'',
      lieuTravail:'',
      Annee:'',
      Salaire:'',
      TauxImposition: '',
      Montant: '',
      DateRetard: '',
      Duree: '',
      Penalite: '',
      MontantTotal: '',
      LieuImposition: '',
      DateDepot:''
    };
    setFileContent([...fileContent, newRow]);
  };

  const handleDeleteRows = () => {
    const newData = fileContent.filter((_, i) => !selectedRows.includes(i));
    setFileContent(newData);
    setSelectedRows([]);
  };

  const handleSelectRow = (rowIndex) => {
    setSelectedRows(prev =>
      prev.includes(rowIndex)
        ? prev.filter(i => i !== rowIndex)
        : [...prev, rowIndex]
    );
  };



  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8084/api/import', { fileContent });
      console.log(response.data);
      alert('Data imported successfully!');
    } catch (error) {
      console.error('Error importing data:', error);
      alert('Error importing data. Please try again.');
    }
  };

  return (
<div className="container-fluid p-4" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', backgroundColor: '#fff', margin: 'auto', maxWidth: '90%' }}>
  <div className="file-content">
    {fileContent.length > 0 ? (
      <>
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-light me-2" onClick={handleAddRow}>Add Row</button>
          <button className="btn btn-danger" onClick={handleDeleteRows} disabled={selectedRows.length === 0}>Delete Selected Rows</button>
        </div>
        <div style={{ maxHeight: '600px', overflowY: 'scroll', overflowX: 'auto' }}>
          <table className="table table-bordered table-striped text-center">
            <thead className="table-dark-green">
              <tr>
                <th>Select</th>
                <th style={{ minWidth: '120px' }}>id</th>
                <th style={{ minWidth: '300px' }}>nifEntreprise</th>
                <th style={{ minWidth: '120px' }}>statEntreprise</th>
                <th style={{ minWidth: '300px' }}>nomEntreprise</th>
                <th style={{ minWidth: '120px' }}>adresseEntreprise</th>
                <th style={{ minWidth: '150px' }}>telEntreprise</th>
                <th style={{ minWidth: '100px' }}>nomSalarie</th>
                <th style={{ minWidth: '150px' }}>cinSalarie</th>
                <th style={{ minWidth: '150px' }}>adresseSalarie</th>
                <th style={{ minWidth: '100px' }}>telSalarie</th>
                <th style={{ minWidth: '150px' }}>emailSalarie</th>
                <th style={{ minWidth: '150px' }}>lieuTravail</th>
                <th style={{ minWidth: '150px' }}>Annee</th>
                <th style={{ minWidth: '150px' }}>Salaire</th>
                <th style={{ minWidth: '150px' }}>TauxImposition</th>
                <th style={{ minWidth: '150px' }}>Montant</th>
                <th style={{ minWidth: '100px' }}>DateRetard</th>
                <th style={{ minWidth: '100px' }}>Duree</th>
                <th style={{ minWidth: '150px' }}>Penalite</th>
                <th style={{ minWidth: '150px' }}>MontantTotal</th>
                <th style={{ minWidth: '150px' }}>LieuImposition</th>
                <th style={{ minWidth: '150px' }}>DateDepot</th>
              </tr>
            </thead>
            <tbody>
              {fileContent.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(rowIndex)}
                      onChange={() => handleSelectRow(rowIndex)}
                    />
                  </td>
                  {Object.keys(row).map((key) => (
                    <td key={key} style={{ minWidth: '150px' }}>
                      <input
                        className="form-control"
                        type="text"
                        value={row[key]}
                        onChange={(e) => handleInputChange(rowIndex, key, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="btn btn-success mt-3" onClick={handleSubmit}>Submit</button>
      </>
    ) : (
      <div className="alert alert-warning text-center">The file does not contain any valid data.</div>
    )}
    <div className="validation-results mt-4">
      {validationResults.length > 0 ? (
        validationResults.map((result, index) => (
          <div key={index} className="validation-result">
            <strong>Row {result.rowIndex}:</strong>
            {result.isValid ? (
              <span className="text-success">Valid</span>
            ) : (
              <span className="text-danger">
                Invalid - {result.errors.join(', ')}
              </span>
            )}
          </div>
        ))
      ) : (
        <div className="alert alert-light text-center"> validation results available.</div>
      )}
    </div>
  </div>
</div>

  );
};

export default Affichage;
