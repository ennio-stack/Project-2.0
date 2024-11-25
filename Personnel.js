import React, { useEffect, useState } from "react";


import axios from "axios";

import Swal from "sweetalert2";

import ModalConfirm from "./ModalConfirm";
import ModalPersonnel from "./ModalPersonnel"
import ModalEditPersonnel from "./ModalEditPersonnel"

const Personnel = () => {
  const [pers, setPers] = useState([]);
  const [search, setSearch] = useState("");
  const [myBg, setBg] = useState({
    backgroundColor: "#6495ED",
  });

  const [editPers, setEditPers] = useState({
    id_pers: "",
    nom_complet: "",
    poste: "",
    lieu_service: "",
    sexe: "",
  });

  const showAlert = (icon, title, texte, buttonColor = "green") => {
    Swal.fire({
      icon: icon,
      title: title,
      text: texte,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const getPersonnel = async () => {
    const response = await axios.get("http://localhost:3002/personnel");
    setPers(response.data);
  };

  useEffect(() => {
    getPersonnel();
  }, []);

  const getPersonnelById = async (id) => {
    const response = await axios.get("http://localhost:3002/personnel/" + id);
    setEditPers({
      ...editPers,
      id_pers: response.data.id_pers,
      nom_complet: response.data.nom_complet,
      poste: response.data.poste,
      lieu_service: response.data.lieu_service,
      sexe: response.data.sexe,
    });
  };

  const visibleEmployee = pers.filter((employee) => {
    if (search === "") {
      return true;
    }

    return (
      employee.id_pers.toString().includes(search.toLocaleLowerCase()) ||
      employee.nom_complet
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()) ||
      employee.poste.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      employee.lieu_service
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()) ||
      employee.sexe.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  });

  return (
    <>
      <button
        type="button"
        className="btn btn-sm btn-success rounded mx-2"
        data-bs-toggle="modal"
        data-bs-target="#modalPersonnel"
      >
        <span className="text-light h6">+</span>
      </button>
      <div className="d-grid">
        <h4 className="mt-2 text-secondary">Liste de tous les personnels</h4>
        <div className="input-group">
          <input
            type="text"
            className="d-flex justify-content-end form-control bg-light"
            id="recherche"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-info" type="submit">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <ModalConfirm
        idToDelete={editPers.id_pers}
        getPersonnel={getPersonnel}
        showAlert={showAlert}
      />
      <ModalPersonnel getPersonnel={getPersonnel} showAlert={showAlert} />
      <ModalEditPersonnel
        editPers={editPers}
        onEdit={setEditPers}
        getPersonnel={getPersonnel}
        showAlert={showAlert}
      />

      <table className="table table-borderless mt-3 table-light text-center">
        <thead>
          <tr>
            <th className="text-light" style={myBg}>
              N⁰
            </th>
            <th className="text-light" style={myBg}>
              N⁰ Matricule
            </th>
            <th className="text-light" style={myBg}>
              Nom complet
            </th>
            <th className="text-light" style={myBg}>
              Poste
            </th>
            <th className="text-light" style={myBg}>
              Lieu Service
            </th>
            <th className="text-light" style={myBg}>
              Sexe
            </th>
            <th className="text-light" style={myBg}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {visibleEmployee.map((p, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{p.id_pers}</td>
              <td>{p.nom_complet}</td>
              <td>{p.poste}</td>
              <td>{p.lieu_service}</td>
              <td>{p.sexe}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning mx-2"
                  data-bs-toggle="modal"
                  data-bs-target="#modaleEditPersonnel"
                  onClick={() => {
                    getPersonnelById(p.id_pers);
                  }}
                >
                  <i className="fa fa-pencil"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#modalConfirm"
                  onClick={() => {
                    getPersonnelById(p.id_pers);
                  }}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Personnel;

export const showAlert = (icon, title, texte, buttonColor = "green") => {
  Swal.fire({
    icon: icon,
    title: title,
    text: texte,
    confirmButtonColor: buttonColor,
  });
};
