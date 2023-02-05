import Home from './pages/Home.js';
import ListaDentistas from './pages/ListaDentistas.js';
import ListaPacientes from './pages/ListaPacientes.js';
import Dentista from './pages/Dentista.js';
import CadastroDent from './pages/CadastroDent';
import Agendamento from './pages/agendamento/Agendamento.js';
import CadastroPacient from './pages/CadastroPacient.js';
import MarcarConsulta from './pages/agendamento/MarcarConsulta.js';
import Paciente from './pages/Paciente.js';
import Teste from './pages/agendamento/teste.js'
import PaginaLogin from './pages/login.js'
import Anamnese from './pages/anamnese.js'

import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";

const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' }
];

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated'||false))

  return isAuthenticated ? <Outlet /> : <PaginaLogin setIsAuthenticated={setIsAuthenticated} />;
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path='/dentistas' element={<ListaDentistas />} />
          <Route path='/' element={<Home />} />
          <Route path='/pacientes' element={<ListaPacientes />} />
        </Route>


        <Route path='/dentista/:codDent' element={<Dentista />} />
        <Route path='/dentista/cadastro' element={<CadastroDent />} />
        <Route path='/dentista/edit/:codDent' element={<CadastroDent />} />
        <Route path='/dentista/agendamento/:codDent' element={<Agendamento />} />

        <Route path='/paciente/:codPac' element={<Paciente />} />
        <Route path='/paciente/cadastro' element={<CadastroPacient />} />
        <Route path='/paciente/edit/:codPac' element={<CadastroPacient />} />
        <Route path='/consulta' element={<MarcarConsulta />} />
        <Route path='/teste' element={<Teste />} />

        <Route path='/paciente/anamnese/:codPac' element={<Anamnese />} />
      </Routes>
    </BrowserRouter>
  )
}



export default App;
