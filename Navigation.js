/*import { Link } from "react-router-dom"

const Navigation = () => {
    return (<ul>
        <li>
            <Link to="/">Acceuil</Link>
        </li>
        <li>
            <Link to="/commerce">Commerce</Link>
        </li>
    </ul>)
}
export default Navigation*/
import 'bootstrap-icons/font/bootstrap-icons.css';

import {Outlet,Link} from 'react-router-dom'
const Navigation = () => {
  return (
    <div class='Ennio'>
      {/* Navbar avec une couleur verte uniforme */}
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#095a0f' }}>
        <div className="container-fluid">
          {/* Logo à gauche */}
          <Link className="navbar-brand" to="/">
            <img src="logo-1.png" alt="Logo" width="40" height="40" className="d-inline-block align-text-top" />
          </Link>

          {/* Bouton de navigation pour mobile */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" style={{ color: 'white' }}></span>
          </button>

          {/* Liens de navigation */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/Etat"><i className="bi bi-envelope-fill"></i> Demande</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/Declaration"><i className="bi bi-file-earmark-text"></i> Declaration</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/Affichage"><i className="bi bi-display"></i> Affichage</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/Selection"><i className="bi bi-check2-square"></i> Selection</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/Logout"><i className="bi bi-box-arrow-right"></i> Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};
export default Navigation