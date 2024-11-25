import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

const Selection = () => {
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setError(null);
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      setFileName('');
      return;
    }

    const fileName = selectedFile.name;
    setFileName(fileName);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const fileContent = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const [header, ...rows] = fileContent;
        const expectedHeaders = ['id', 'nifEntreprise', 'statEntreprise', 'nomEntreprise', 'adresseEntreprise', 'telEntreprise', 'nomSalarie', 'cinSalarie', 'adresseSalarie', 'telSalarie', 'emailSalarie', 'lieuTravail', 'Annee', 'Salaire', 'TauxImposition', 'Montant', 'DateRetard', 'Duree', 'Penalite', 'MontantTotal', 'LieuImposition', 'DateDepot'];

        if (JSON.stringify(header) !== JSON.stringify(expectedHeaders)) {
          setError('Invalid file format. Please ensure the headers match the expected format.');
          return;
        }

        const formattedRows = rows.map(row => ({
          id: row[0] || '',
          nifEntreprise: row[1] || '',
          statEntreprise: row[2] || '',
          nomEntreprise: row[3] || '',
          adresseEntreprise: row[4] || '',
          telEntreprise: row[5] || '',
          nomSalarie: row[6] || '',
          cinSalarie: row[7] || '',
          adresseSalarie: row[8] || '',
          telSalarie: row[9] || '',
          emailSalarie: row[10] || '',
          lieuTravail: row[11] || '',
          Annee: row[12] || '',
          Salaire: row[13] || '',
          TauxImposition: row[14] || '',
          Montant: row[15] || '',
          DateRetard: row[16] || '',
          Duree: row[17] || '',
          Penalite: row[18] || '',
          MontantTotal: row[19] || '',
          LieuImposition: row[20] || '',
          DateDepot: row[21] || ''
        }));

        setFileContent(formattedRows);
        navigate('/Affichage', { state: { fileContent: formattedRows } });
      } catch (error) {
        setError('Error processing file. Please try again.');
        console.error('Error processing file:', error);
      }
    };
    reader.onerror = (error) => {
      setError('Error reading file. Please try again.');
      console.error('Error reading file:', error);
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  return (
    <div className="management-container">
      <div className="file-upload-container">
        <input
          type="file"
          id="file"
          className="file-input"
          onChange={handleFileChange}
        />
        <label htmlFor="file" className="file-label">  <i className="bi bi-file-earmark-plus bi-10x"></i>
          Choose File
        </label>
        {fileName && (
          <div className="file-name">
            {fileName}
          </div>
        )}
      </div>
      {error && (
        <div className="error-message">{error}</div>
      )}
    </div>
  );
};

export default Selection;
