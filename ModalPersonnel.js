import React from "react";
import { createPersonnel } from "../services/PersonnelService";

const ModalPersonnel = ({ getPersonnel, showAlert }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    let nomComplet = formData.get("nomComplet");
    let poste = formData.get("poste");
    let lieuService = formData.get("lieuService");
    let genre = formData.get("genre");

    let isCompleted =
      nomComplet !== "" && poste !== "" && lieuService !== "" && genre !== null;

    if (!isCompleted) {
      alert("Veuillez vérifier tous les champs vides!");
    } else {
      const newPersonnel = {
        nomComplet: nomComplet,
        poste: poste,
        lieuService: lieuService,
        sexe: genre,
      };
      const r = createPersonnel(newPersonnel);
      r.then((v) => {
        if (v === 200) {
          getPersonnel();
          showAlert("success", "INSERTION", "Ajout effectué");
        }
        if (v === 400) {
          showAlert(
            "warning",
            "ATTENTION",
            "La personne portant ce nom existe dejà ! "
          );
        }
        if (v === 500) {
          showAlert(
            "error",
            "ERREUR",
            "Une erreur est survenue lors de la l'insertion! "
          );
        }
      });
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        data-bs-backdrop="static"
        role="dialog"
        id="modalPersonnel"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content bg-light">
            <div className="modal-header">
              <h4 className="modal-title">P E R S O N N E L</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <form
                className="form"
                autoComplete="off"
                id="formPersonnel"
                onSubmit={handleSubmit}
              >
                <div className="form-floating mb-2">
                  <input
                    type="text"
                    className="form-control"
                    name="nomComplet"
                    id="nomComplet"
                    placeholder="Nom et Prénoms"
                  />
                  <label htmlFor="nomComplet" className="form-label">
                    Nom et Prénoms
                  </label>
                </div>
                <div className="form-floating mb-2">
                  <select name="poste" id="poste" className="form-select">
                    <option value="CONCEPTEUR">CONCEPTEUR</option>
                    <option value="PROFESSEUR CERTIFIE">
                      PROFESSEUR CERTIFIE
                    </option>
                    <option value="MEDECIN DIPLOME D'ETAT">
                      MEDECIN DIPLOME D'ETAT
                    </option>
                  </select>
                  <label htmlFor="poste" className="form-label">
                    Poste Occupé
                  </label>
                </div>
                <div className="form-floating mb-2">
                  <input
                    type="text"
                    className="form-control"
                    name="lieuService"
                    id="lieuService"
                    placeholder="Lieu de Service"
                  />
                  <label htmlFor="lieuService" className="form-label">
                    Lieu de Service
                  </label>
                </div>

                <div className="d-flex justify-content-center">
                  <h5 className="me-4">Genre : </h5>
                  <div className="form-check">
                    <input
                      defaultChecked={true}
                      type="radio"
                      className="form-check-input"
                      id="masculin"
                      name="genre"
                      value="Masculin"
                    />
                    <label className="form-check-label" htmlFor="masculin">
                      Masculin
                    </label>
                  </div>
                  <div className="form-check mx-4">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="feminin"
                      name="genre"
                      value="Féminin"
                    />

                    <label className="form-check-label" htmlFor="feminin">
                      Féminin
                    </label>
                  </div>
                </div>
                <div className="d-flex justify-content-end border-top border-top-5 mt-2 p-2">
                  <button
                    type="submit"
                    className="btn btn-sm btn-secondary mt-2 mx-2"
                    data-bs-dismiss="modal"
                  >
                    Ajouter
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger mt-2"
                    data-bs-dismiss="modal"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPersonnel;
