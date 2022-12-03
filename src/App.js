import Home from './pages/Home.js';
import ListaDentistas from './pages/ListaDentistas.js';
import ListaPacientes from './pages/ListaPacientes.js';
import Dentista from './pages/Dentista.js';
import CadastroDent from './pages/CadastroDent';
import Agendamento from './pages/agendamento/Agendamento.js';
import CadastroPacient from './pages/CadastroPacient.js';
import MarcarConsulta from './pages/agendamento/MarcarConsulta.js';
import Paciente from './pages/Paciente.js';

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
      <Route path='/'                                 element={<Home/>}/>
      <Route path='/dentistas'                        element={<ListaDentistas/>}/>   
      <Route path='/dentista/:codDent'                element={<Dentista/>}/>
      <Route path='/dentista/cadastro'                element={<CadastroDent/>}/>
      <Route path='/dentista/edit/:codDent'           element={<CadastroDent/>}/>
      <Route path='/dentista/agendamento/:codDent'    element={<Agendamento/>}/>
      <Route path='/pacientes'                        element={<ListaPacientes/>}/>  
      <Route path='/paciente/:codPac'                 element={<Paciente/>}/>
      <Route path='/paciente/cadastro'                element={<CadastroPacient/>}/>
      <Route path='/paciente/edit/:codPac'            element={<CadastroPacient/>}/>
      <Route path='/consulta'                         element={<MarcarConsulta/>}/>
    </Routes>
    </BrowserRouter>
  )
}



export default App;
