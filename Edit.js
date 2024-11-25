import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap components

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        id: '',
        nifEntreprise: '',
        statEntreprise: '',
        nomEntreprise: '',
        adresseEntreprise: '',
        telEntreprise: '',
        nomSalarie: '',
        cinSalarie: '',
        adresseSalarie: '',
        telSalarie: '',
        emailSalarie: '',
        lieuTravail: '',
        Annee: '',
        Salaire: '',
        TauxImposition: '',
        Montant: '',
        DateRetard: '',
        Duree: '',
        Penalite: '',
        MontantTotal: '',
        LieuImposition: '',
        DateDepot: ''
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isCorrected, setIsCorrected] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://localhost:8084/api/Read/${id}`)
            .then(res => {
                setValues(res.data[0]);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, [id]);

    const calculerIRSA = (salaire) => {
        let impotTotal = 0;

        const tranches = [
            { limite: 600000, taux: 20 },
            { limite: 500000, taux: 15 },
            { limite: 400000, taux: 10 },
            { limite: 350000, taux: 5 }
        ];

        let revenuRestant = salaire;

        for (let i = 0; i < tranches.length; i++) {
            const tranche = tranches[i];
            const montantLimite = tranche.limite;

            if (revenuRestant > montantLimite) {
                const montantImposable = revenuRestant - montantLimite;
                impotTotal += montantImposable * (tranche.taux / 100);
                revenuRestant = montantLimite;
            }
        }

        return impotTotal;
    };

    const calculateDurationAndPenalty = (DateDepot, DateRetard) => {
        const depotDate = new Date(DateDepot);
        const retardDate = new Date(DateRetard);

        if (isNaN(depotDate.getTime()) || isNaN(retardDate.getTime())) {
            return { duree: 0, penalite: 0 };
        }

        const monthsDiff = (retardDate.getFullYear() - depotDate.getFullYear()) * 12 + (retardDate.getMonth() - depotDate.getMonth());

        let duree = 0;
        let penalite = 0;

        if (monthsDiff > 0) {
            duree = monthsDiff;
            penalite = monthsDiff; // La pénalité est calculée en pourcentage
        }

        return { duree, penalite };
    };

    const handleCalculation = () => {
        const salaire = parseFloat(values.Salaire) || 0;
        const montant = calculerIRSA(salaire);

        let tauxImposition = 0;
        if (salaire > 600000) tauxImposition = 20;
        else if (salaire > 500000) tauxImposition = 15;
        else if (salaire > 400000) tauxImposition = 10;
        else if (salaire > 350000) tauxImposition = 5;

        const { duree, penalite } = calculateDurationAndPenalty(values.DateDepot, values.DateRetard);
        const penaliteMontant = montant * (penalite / 100); // La pénalité est un pourcentage du montant
        const montantTotal = montant + penaliteMontant;

        return { tauxImposition, montant, penalite: penaliteMontant, montantTotal };
    };

    const handleCorrection = () => {
        const { tauxImposition, montant, penalite, montantTotal } = handleCalculation();

        const { duree: calculatedDuree } = calculateDurationAndPenalty(values.DateDepot, values.DateRetard);

        let newErrors = {};

        if (calculatedDuree !== parseInt(values.Duree, 10)) {
            newErrors.Duree = `La Durée est corrigée pour correspondre au nombre de mois. Attendu: ${calculatedDuree}.`;
            setValues(prevValues => ({
                ...prevValues,
                Duree: calculatedDuree.toString()
            }));
        }

        setValues(prevValues => ({
            ...prevValues,
            TauxImposition: tauxImposition.toString(),
            Montant: montant,
            Penalite: penalite,
            MontantTotal: montantTotal
        }));

        setErrors(newErrors);
        setIsCorrected(true);
        console.log("Correction logic applied. Values updated and errors cleared.");
    };

    const handleCheckErrors = () => {
        const calcResults = handleCalculation() || {}; // Handle case where handleCalculation might return undefined
        const { tauxImposition, montant, penalite, montantTotal } = calcResults;

        let newErrors = {};

        // Validation des calculs
        if (parseFloat(values.TauxImposition) !== tauxImposition) {
            newErrors.TauxImposition = `Le Taux d'Imposition doit être ${tauxImposition}%.`;
        }
        if (parseFloat(values.Montant) !== montant) {
            newErrors.Montant = `Le Montant doit être ${montant}.`;
        }
        if (parseFloat(values.Penalite) !== penalite) {
            newErrors.Penalite = `La Pénalité doit être ${penalite}.`;
        }
        if (parseFloat(values.MontantTotal) !== montantTotal) {
            newErrors.MontantTotal = `Le Montant Total doit être ${montantTotal}.`;
        }

        // Validation de la durée
        const { duree: calculatedDuree } = calculateDurationAndPenalty(values.DateDepot, values.DateRetard);
        if (calculatedDuree !== parseInt(values.Duree, 10)) {
            newErrors.Duree = `La Durée est incorrecte. La valeur attendue est ${calculatedDuree}.`;
        }

        // Validation des dates
        const dateError = validateDates();
        if (dateError) {
            newErrors.DateDepot = dateError;
        }

        setErrors(newErrors);
        setShowModal(true); // Show modal with errors
    };

    const validateDates = () => {
        const depotDate = new Date(values.DateDepot);
        const retardDate = new Date(values.DateRetard);

        if (isNaN(depotDate.getTime()) || isNaN(retardDate.getTime())) {
            return '';
        }

        if (depotDate > retardDate) {
            return "La DateDepot ne doit pas dépasser DateRetard.";
        }

        return '';
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!isCorrected) {
            setErrors({ correction: 'Vous devez d\'abord cliquer sur Correction avant de mettre à jour.' });
            return;
        }
        console.log('teste' + JSON.stringify(values));

        axios.put('http://localhost:8084/api/update', values)
            .then(res => {
                console.log(res);
                navigate('/Declaration');
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    console.log(err.response.data);
                    setErrors(err.response.data.errors || {});
                } else {
                    console.log(err);
                }
            });
    };
    const handleMiseAJourEtStockage = (e) => {
        e.preventDefault();
        if (!isCorrected) {
            setErrors({ correction: 'Vous devez d\'abord cliquer sur Correction avant de mettre à jour.' });
            return;
        }

        // Même traitement que l'update mais avec redirection vers "Etat"
        axios.put('http://localhost:8084/api/update', values)
            .then(res => {
                console.log(res);
                
                // Stockage des données mises à jour si nécessaire
                localStorage.setItem('updatedValues', JSON.stringify(values));

                // Redirection vers la page d'État après la mise à jour
                navigate('/Etat');
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    console.log(err.response.data);
                    setErrors(err.response.data.errors || {});
                } else {
                    console.log(err);
                }
            });
    };


    
   
    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <div className='d-flex vh-50 bg-basic justify-content-center align-items-center'>
            <div className='container'>
                <div className='bg-white rounded p-4' style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }}>
                    <form onSubmit={handleUpdate}>
                        <h2 className="text-center">Modifier les informations</h2>
                        <hr />
                        {isLoading ? (
                            <p>Chargement des données...</p>
                        ) : (
                            <>
                                <div className="row">
                                    {/* Left Column */}
                                    <div className="col-md-6">
                                        {['nifEntreprise', 'statEntreprise', 'nomEntreprise', 'adresseEntreprise', 'telEntreprise', 'nomSalarie', 'cinSalarie', 'adresseSalarie', 'telSalarie', 'emailSalarie'].map((fieldName, index) => (
                                            <div className='mb-3' key={index}>
                                                <label htmlFor={fieldName} className='form-label'>
                                                    {fieldName}
                                                </label>
                                                <input
                                                    type={fieldName.includes('Date') ? 'date' : 'text'}
                                                    id={fieldName}
                                                    name={fieldName}
                                                    value={values[fieldName]}
                                                    onChange={handleChange}
                                                    className={`form-control ${errors[fieldName] ? 'is-invalid' : ''}`}
                                                />
                                                {errors[fieldName] && <div className='invalid-feedback'>{errors[fieldName]}</div>}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Right Column */}
                                    <div className="col-md-6">
                                        {['lieuTravail', 'Annee', 'Salaire', 'TauxImposition', 'Montant', 'DateRetard', 'Duree', 'Penalite', 'MontantTotal', 'LieuImposition', 'DateDepot'].map((fieldName, index) => (
                                            <div className='mb-3' key={index}>
                                                <label htmlFor={fieldName} className='form-label'>
                                                    {fieldName}
                                                </label>
                                                <input
                                                    type={fieldName.includes('Date') ? 'date' : 'text'}
                                                    id={fieldName}
                                                    name={fieldName}
                                                    value={values[fieldName]}
                                                    onChange={handleChange}
                                                    className={`form-control ${errors[fieldName] ? 'is-invalid' : ''}`}
                                                />
                                                {errors[fieldName] && <div className='invalid-feedback'>{errors[fieldName]}</div>}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Error message if Correction is not done */}
                                {errors.correction && <div className="alert alert-danger">{errors.correction}</div>}

                                <div className='d-flex justify-content-between'>
                                    <button type="button" onClick={handleCorrection} className="btn btn-dark">
                                    <i className="bi bi-pencil"></i>Correction
                                    </button>
                                    <button type="button" onClick={handleCheckErrors} className="btn btn-danger">
                                    <i className="bi bi-exclamation-triangle"></i>Errors Verification
                                    </button>
                                    <button type="submit" className="btn btn-success" disabled={!isCorrected}>
                                    <i className="bi bi-check"></i>Update 
                                    </button>

                                    <button type="submit"onClick={handleMiseAJourEtStockage}  className="btn btn-secondary">
                                    <i className="bi bi-file-earmark-text"></i>Status
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>

            {/* Modal for displaying errors */}
            {/* Modal for displaying errors */}
            <Modal
            show={showModal}
            onHide={handleCloseModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Validation Errors
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {Object.keys(errors).length > 0 ? (
                <div style={{ border: '1px solid #ff0000', padding: '20px', borderRadius: '5px', backgroundColor: '#ffdddd' }}>
                    {Object.keys(errors).map((key, index) => (
                    <div key={index} style={{ marginBottom: '15px' }}>
                        <strong>{key}:</strong>
                        <div style={{ padding: '10px', backgroundColor: '#fff', border: '1px solid #ff0000', borderRadius: '5px' }}>
                        {errors[key]}
                        </div>
                    </div>
                    ))}
                </div>
                ) : (
                <p>No errors detected.</p> // Adjust this text to suit the feedback you want.
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleCloseModal} className='btn btn-secondary'>Close</Button>
            </Modal.Footer>
            </Modal>

        </div>
    );
};

export default Edit;
