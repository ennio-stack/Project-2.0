import React from 'react'
import Navigation from './Navigation'
import Commerce from './Commerce'
import Declaration from './Declaration'

import Selection from './Selection'
import Affichage from './Affichage'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import Data from '../data'
import Create from './Create'
import Read from './Read'
import Edit from './Edit'
import Etat from './Etat'
import Login from './Login'
import Register from './Register'
import Logout from './Logout'


import '../css/style.css'; 

class Acceuil extends React.Component{
    render(){
      return (
        <div>
         <BrowserRouter>
            <Routes>
                <Route path="Login" element={<Login/>}/>
                <Route path="Register" element={<Register/>}/>
                <Route path="/" element={<Navigation />}>
              
                <Route path="/Declaration" element={<Declaration tasks={Data} />}/>
              
                <Route path="Selection" element={<Selection/>}/>
                <Route path="Affichage" element={<Affichage/>}/>
                <Route path="Create" element={<Create/>}/>
                <Route path="Read/:id" element={<Read/>}/>
                <Route path="Edit/:id" element={<Edit/>}/>
                <Route path="Etat" element={<Etat/>}/>
                <Route path="Logout" element={<Logout/>}/>

                </Route>
            </Routes >
         </BrowserRouter>   
         
      
        </div>
      )
    }
  }
export default Acceuil  

/*import React from "react";
import Navigation from "./Navigation";

const Acceuil =()=>{

    
    return (
    <div>
       <Navigation />
        <h1>Acceuil</h1>
       
        
    </div>
    )
        
     
};*/
