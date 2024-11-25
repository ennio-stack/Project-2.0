import axios from "axios";
import React from "react";

const ModalEditPersonnel = ({ editPers, onEdit, getPersonnel, showAlert }) => {
  const updatePersonnel = async (data) => {
    try {
      const response = await axios.patch(
        "http://localhost:3002/personnel/" + data.idPers,
        data
      );
      if (response.status === 200) {
        getPersonnel();
        showAlert("success", "MODIFICATION", "Modification effectuée");
      } else {
        showAlert("error", "ERREUR", "Erreur lors de la mise à jour");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const inputs = editPers;

    let isCompleted =
      inputs.nom_complet !== "" &&
      inputs.poste !== "" &&
      inputs.lieuService !== "" &&
      inputs.sexe !== "";

    if (!isCompleted) {
      alert("Veuillez vérifier tous les champs vides!");
    } else {
      const newPersonnel = {
        idPers: inputs.id_pers,
        nomComplet: inputs.nom_complet,
        poste: inputs.poste,
        lieuService: inputs.lieu_service,
        sexe: inputs.sexe,
      };

      updatePersonnel(newPersonnel);
    }
  };

  return (
    <>
      <div>
        <div
          className="modal fade"
          data-bs-backdrop="static"
          role="dialog"
          id="modaleEditPersonnel"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content bg-light">
              <div className="modal-header">
                <h4 className="modal-title">M O D I F I C A T I O N</h4>
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
                      id="enomComplet"
                      placeholder="Nom et Prénoms"
                      value={editPers.nom_complet}
                      onChange={(e) =>
                        onEdit({ ...editPers, nom_complet: e.target.value })
                      }
                    />
                    <label htmlFor="enomComplet" className="form-label">
                      Nom et Prénoms
                    </label>
                  </div>

                  <div className="form-floating mb-2">
                    <select
                      name="poste"
                      id="eposte"
                      className="form-select"
                      value={editPers.poste}
                      onChange={(e) =>
                        onEdit({ ...editPers, poste: e.target.value })
                      }
                    >
                      <option>ADJOINT</option>
                      <option>CONCEPTEUR</option>
                      <option>PROFESSEUR CERTIFIE</option>
                      <option>MEDECIN DIPLOME D'ETAT</option>
                    </select>
                    <label htmlFor="eposte" className="form-label">
                      Poste Occupé
                    </label>
                  </div>
                  <div className="form-floating mb-2">
                    <input
                      type="text"
                      className="form-control"
                      name="elieuService"
                      id="elieuService"
                      placeholder="Lieu de Service"
                      value={editPers.lieu_service}
                      onChange={(e) =>
                        onEdit({ ...editPers, lieu_service: e.target.value })
                      }
                    />
                    <label htmlFor="elieuService" className="form-label">
                      Lieu de Service
                    </label>
                  </div>

                  <div className="d-flex justify-content-center">
                    <h5 className="me-4">Genre : </h5>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="Masculin"
                        name="esexe"
                        checked={editPers.sexe === "Masculin"}
                        value={editPers.sexe}
                        onChange={(e) =>
                          onEdit({ ...editPers, sexe: e.target.id })
                        }
                      />
                      <label className="form-check-label" htmlFor="Masculin">
                        Masculin
                      </label>
                    </div>
                    <div className="form-check mx-4">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="Féminin"
                        name="esexe"
                        checked={editPers.sexe === "Féminin"}
                        value={editPers.sexe}
                        onChange={(e) =>
                          onEdit({ ...editPers, sexe: e.target.id })
                        }
                      />

                      <label className="form-check-label" htmlFor="Féminin">
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
                      Modifier
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
    </>
  );
};

export default ModalEditPersonnel;
