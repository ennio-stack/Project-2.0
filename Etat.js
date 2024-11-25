import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const Etat = () => {
    const [updatedValues, setUpdatedValues] = useState(null);

    useEffect(() => {
        const storedValues = localStorage.getItem('updatedValues');
        if (storedValues) {
            setUpdatedValues(JSON.parse(storedValues));
        }
    }, []);

    // Réorganiser les headers pour placer Pénalité et Durée en premier
    const headers = [
        "id", "NIF Entreprise", "Stat Entreprise", "Nom Entreprise", 
        "Adresse Entreprise", "Tel Entreprise", "Nom Salarié", "CIN Salarié", 
        "Adresse Salarié", "Tel Salarié", "Email Salarié", "Lieu Travail", "Année", 
        "Salaire", "Taux Imposition", "Montant", "Durée", "Pénalité", "Montant Total", "Date Dépôt", "Date Retard"
    ];

    const rows = updatedValues ? [
        [
            updatedValues.id || "", 
            updatedValues.nifEntreprise || "",
            updatedValues.statEntreprise || "",
            updatedValues.nomEntreprise || "",
            updatedValues.adresseEntreprise || "",
            updatedValues.telEntreprise || "",
            updatedValues.nomSalarie || "",
            updatedValues.cinSalarie || "",
            updatedValues.adresseSalarie || "",
            updatedValues.telSalarie || "",
            updatedValues.emailSalarie || "",
            updatedValues.lieuTravail || "",
            updatedValues.Annee || "",
            updatedValues.Salaire || "",
            updatedValues.TauxImposition || "",
            updatedValues.Montant || "0",
            updatedValues.Duree || "0", // Durée
            updatedValues.Penalite || "0", // Pénalité
            updatedValues.MontantTotal || "0",
            updatedValues.DateDepot || "",
            updatedValues.DateRetard || ""
        ]
    ] : [];

    const exportToExcel = () => {
        if (!updatedValues) return;

        const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);

        // Appliquer le style de centrage à chaque cellule
        const range = XLSX.utils.decode_range(worksheet['!ref']);
        for (let row = range.s.r; row <= range.e.r; row++) {
            for (let col = range.s.c; col <= range.e.c; col++) {
                const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
                if (!worksheet[cellAddress]) continue;

                // Définir le style de centrage pour chaque cellule
                worksheet[cellAddress].s = {
                    alignment: { horizontal: 'center', vertical: 'center' }
                };
            }
        }

        // Définir les largeurs de colonne pour chaque attribut
        worksheet['!cols'] = [
            { wpx: 30 },  // id
            { wpx: 100 }, // NIF Entreprise
            { wpx: 100 }, // Stat Entreprise
            { wpx: 150 }, // Nom Entreprise
            { wpx: 200 }, // Adresse Entreprise
            { wpx: 100 }, // Tel Entreprise
            { wpx: 100 }, // Nom Salarié
            { wpx: 100 }, // CIN Salarié
            { wpx: 200 }, // Adresse Salarié
            { wpx: 100 }, // Tel Salarié
            { wpx: 150 }, // Email Salarié
            { wpx: 100 }, // Lieu Travail
            { wpx: 50 },  // Année
            { wpx: 100 }, // Salaire
            { wpx: 100 }, // Taux Imposition
            { wpx: 100 }, // Montant
            { wpx: 50 },  // Pénalité
            { wpx: 100 }, // Durée
            { wpx: 100 }, // Montant Total
            { wpx: 100 }, // Date Dépôt
            { wpx: 100 }, // Date Retard
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'État des Informations');

        // Exporter le fichier Excel
        XLSX.writeFile(workbook, 'entreprise.xlsx');
    };

    if (!updatedValues) {
        return <div>Aucune information disponible pour le moment.</div>;
    }

    return (
        <div className="container-fluid mt-5 p-4 shadow-lg bg-white rounded">
            <h2 className="text-center mb-4">État des informations mises à jour</h2>

            {/* Bouton pour exporter les données en Excel */}
            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-success" onClick={exportToExcel}>
                    Exporter en Excel
                </button>
            </div>

            {/* Table affichant les informations */}
            <div className="table-responsive">
                <table className="table table-bordered w-100">
                    <thead className="thead-dark">
                        <tr>
                            {headers.map(header => (
                                <th key={header} style={{ minWidth: '150px', textAlign: 'center' }}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {rows[0].map((value, index) => (
                                <td key={index} style={{ textAlign: 'center' }}>
                                    {value !== null && value !== undefined ? value : "N/A"}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Etat;
