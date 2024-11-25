import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [values, setValues] = useState({
        id: '',
        nifEntreprise: '',
        statEntreprise: '',
        nomEntreprise: '',
        adresseEntreprise: '',
        telEntreprise: '',
        nomSalarie: '',
        cinSalarie:'',
        adresseSalarie: '',
        telSalarie: '',
        emailSalarie:'',
        lieuTravail:'',
        Annee:'',
        Salaire:'',
        TauxImposition: '',
        Montant: '',
        dateRetard: '', // Changement ici
        Duree: '',
        Penalite: '',
        MontantTotal: '',
        LieuImposition: '',
        DateDepot: '' // Changement ici
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({}); // Réinitialiser toutes les erreurs avant de soumettre

        axios.post('http://localhost:8084/api/crud/', values)
        .then(res => {
            console.log(res);
            navigate('/Declaration');
        })
        .catch(err => {
            if (err.response && err.response.data) {
                console.log(err.response.data);
                // Gérer d'autres erreurs si nécessaire
                setErrors(err.response.data.errors || {});
            } else {
                console.log(err);
            }
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prevValues => ({ ...prevValues, [name]: value }));
    }

    return (
        <div className='d-flex vh-40 bg-basic justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-2'>
                <form onSubmit={handleSubmit} className="container p-4 bg-light shadow-sm rounded">
                    <h2 className="text-center mb-4 text-dark bg-light py-2 rounded">Add Informations</h2>

                    <div className="row">
                        <div className="col-md-6">
                            {Object.keys(values).slice(0, Math.ceil(Object.keys(values).length / 2)).map((key) => (
                                <div className="mb-3" key={key}>
                                    <label htmlFor={key} className="form-label text-capitalize">{key}</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-pencil"></i>
                                        </span>
                                        <input
                                            type={key === 'dateRetard' || key === 'DateDepot' ? 'date' : 'text'}
                                            id={key}
                                            name={key}
                                            placeholder={`Enter ${key}`}
                                            className={`form-control ${errors[key] ? 'is-invalid' : ''}`}
                                            value={values[key]}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {/* Affichage de l'erreur spécifique sous le champ */}
                                    {errors[key] && (
                                        <div className="invalid-feedback">
                                            {errors[key]}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="col-md-6">
                            {Object.keys(values).slice(Math.ceil(Object.keys(values).length / 2)).map((key) => (
                                <div className="mb-3" key={key}>
                                    <label htmlFor={key} className="form-label text-capitalize">{key}</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-pencil"></i>
                                        </span>
                                        <input
                                            type={key === 'dateRetard' || key === 'DateDepot' ? 'date' : 'text'}
                                            id={key}
                                            name={key}
                                            placeholder={`Enter ${key}`}
                                            className={`form-control ${errors[key] ? 'is-invalid' : ''}`}
                                            value={values[key]}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {/* Affichage de l'erreur spécifique sous le champ */}
                                    {errors[key] && (
                                        <div className="invalid-feedback">
                                            {errors[key]}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="d-flex justify-content-center align-items-end mt-4">
                        <button type="submit" className="btn btn-success w-50">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Create;
