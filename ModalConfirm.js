import axios from "axios";
import React from "react";

const ModalConfirm = ({ idToDelete, getPersonnel, showAlert }) => {
  const deletePersonnel = async (id) => {
    try {
      const response = await axios.delete(
        "http://localhost:3002/personnel/" + id
      );

      if (response.status === 200) {
        getPersonnel();
        showAlert("success", "SUPPRESSION", "Suppression effectuée");
      } else {
        alert("Une erreur est survenue lors de la suppression");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className="modal fade"
        id="modalConfirm"
        data-bs-backdrop="static"
        role="dialog"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-light">
            <div className="modal-header">
              <h5 className="modal-title text-danger">Suppression ! </h5>
            </div>

            <div className="modal-body">
              <p>Voulez-vous vraiment le supprimer ? </p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => {
                  deletePersonnel(idToDelete);
                }}
              >
                OUI
              </button>
              <button
                type="button"
                className="btn btn-dark"
                data-bs-dismiss="modal"
              >
                NON
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalConfirm;
