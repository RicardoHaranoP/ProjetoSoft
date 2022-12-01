import Home from './pages/Home.js';
import ListaDentistas from './pages/ListaDentistas.js';
import ListaPacientes from './pages/ListaPacientes.js';
import Dentista from './pages/Dentista.js';
import CadastroDent from './pages/CadastroDent';
import Agendamento from './pages/agendamento/Agendamento.js';
import CadastroPacient from './pages/CadastroPacient.js';
import EditPaciente from './pages/EditPaciente.js';

import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/'                       element={<Home/>}/>
      <Route path='/dentistas'              element={<ListaDentistas/>}/>
      <Route path='/pacientes'              element={<ListaPacientes/>}/>      
      <Route path='/dentista'               element={<Dentista/>}/>
      <Route path='/dentista/cadastro'      element={<CadastroDent/>}/>
      <Route path='/dentista/agendamento'   element={<Agendamento/>}/>
      <Route path='/paciente/cadastro'      element={<CadastroPacient/>}/>
      <Route path='/paciente/edit/:codPac'  element={<EditPaciente/>}/>
    </Routes>
    </BrowserRouter>
  )
}



export default App;
