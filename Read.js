import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const Read = () => {
    const { id } = useParams();
    const [traitement, setTraitement] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8084/api/Read/${id}`)
            .then(res => {
                if (res.data.length > 0) {
                    setTraitement(res.data[0]);  // Assuming the response is an array
                } else {
                    setTraitement({});
                }
            })
            .catch(err => console.log(err));
    }, [id]);

    if (traitement === null) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className='d-flex vh-60 justify-content-center align-items-center bg-light'>
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <div className='card shadow-sm p-4 rounded'>
                        <h2 className="text-center mb-4 text-success">Traitement Details</h2>
                        {Object.keys(traitement).length > 0 ? (
                            <>
                                <div className="mb-3"><strong>id:</strong> {traitement.id}</div>
                                <div className="mb-3"><strong>nifEntreprise:</strong> {traitement.nifEntreprise}</div>
                                <div className="mb-3"><strong>statEntreprise:</strong> {traitement.statEntreprise}</div>
                                <div className="mb-3"><strong>nomEntreprise:</strong> {traitement.nomEntreprise}</div>
                                <div className="mb-3"><strong>adresseEntreprise:</strong> {traitement.adresseEntreprise}</div>
                                <div className="mb-3"><strong>telEntreprise:</strong> {traitement.telEntreprise}</div>
                                <div className="mb-3"><strong>nomSalarie:</strong> {traitement.nomSalarie}</div>
                                <div className="mb-3"><strong>cinSalarie:</strong> {traitement.cinSalarie}</div>
                                <div className="mb-3"><strong>adresseSalarie:</strong> {traitement.adresseSalarie}</div>
                                <div className="mb-3"><strong>telSalarie:</strong> {traitement.telSalarie}</div>
                                <div className="mb-3"><strong>emailSalarie:</strong> {traitement.emailSalarie}</div>
                                <div className="mb-3"><strong>lieuTravail:</strong> {traitement.lieuTravail}</div>
                                <div className="mb-3"><strong>Annee:</strong> {traitement.Annee}</div>
                                <div className="mb-3"><strong>Salaire:</strong> {traitement.Salaire}</div>
                                <div className="mb-3"><strong>Taux d'Imposition:</strong> {traitement.TauxImposition}</div>
                                <div className="mb-3"><strong>Montant:</strong> {traitement.Montant}</div>
                                <div className="mb-3"><strong>DateRetard:</strong> {traitement.DateRetard}</div>
                                <div className="mb-3"><strong>Durée:</strong> {traitement.Duree}</div>
                                <div className="mb-3"><strong>Pénalité:</strong> {traitement.Penalite}</div>
                                <div className="mb-3"><strong>Montant Total:</strong> {traitement.MontantTotal}</div>
                                <div className="mb-3"><strong>Lieu d'Imposition:</strong> {traitement.LieuImposition}</div>
                                <div className="mb-3"><strong>DateDepot:</strong> {traitement.DateDepot}</div>
                            </>
                        ) : (
                            <h2 className="text-center text-danger">No data found</h2>
                        )}
                        <div className="d-flex justify-content-between mt-4">
                            <Link to="/Declaration" className="btn btn-success">Back</Link>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    );
};

export default Read;
