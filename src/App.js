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
import ListaAnamnese from './pages/ListaAnamnese.js'
import Anamnese from './pages/anamnese.js'
import CadastroAnamnese from './pages/cadastroAnamnese.js'
import CadastroProcedimentos from './pages/CadastroProcedimentos.js'
import Odontograma from './pages/odontograma.js'
import CadastroOdontograma from './pages/CadastroOdontograma.js'
import AtualizarConsulta from './pages/agendamento/atualizarConsulta.js'
import OdontogramaCadastroTeste from './pages/cadastroOdontogramaTeste.js'
import OdontogramaLista from './pages/odontogramaLista.js';
import EditAnamnese from './pages/editAnamnese.js';
import ListaProcedimentos from './pages/ListaProcedimentos.js';
import EditOdontograma from './pages/EditOdontograma.js';

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
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated' || false))

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
          <Route path='/dentista/agendamento/edit/:codCons' element={<AtualizarConsulta/>}/>

          <Route path='/paciente/:codPac' element={<Paciente />} />
          <Route path='/paciente/cadastro' element={<CadastroPacient />} />
          <Route path='/paciente/edit/:codPac' element={<CadastroPacient />} />
          <Route path='/consulta' element={<MarcarConsulta />} />
          <Route path='/teste' element={<Teste />} />

          <Route path='/paciente/ListaAnamnese/:codPac' element={<ListaAnamnese />} />
          <Route path='/paciente/:codPac/anamnese/cadastro' element={<CadastroAnamnese />} />
          <Route path='/paciente/anamnese/edit/:nomePaciente/:codPac/:codAnam' element={<EditAnamnese />} />
          <Route path='/paciente/anamnese/:codPac' element={<Anamnese />} />
          <Route path='/paciente/anamnese/:nomePaciente/:codAnam' element={<Anamnese />} />

          <Route path='/cadastroProcedimentos' element={<CadastroProcedimentos />} />
          <Route path='/ListaProcedimentos'    element={<ListaProcedimentos/>}/>
          
          <Route path='/paciente/odontograma/edit/:codPac/:codOdon' element={<EditOdontograma/>}/>
          <Route path='/paciente/OdontogramaLista/:codPac' element={<OdontogramaLista />} />
          <Route path='/paciente/:codPac/odontograma/cadastro' element={<CadastroOdontograma />} />
          <Route path='/paciente/odontograma/:codPac' element={<Odontograma />} />
          <Route path='/paciente/odontograma/:codPac/cadastroTeste' element={<OdontogramaCadastroTeste />} />

        </Routes>
      </BrowserRouter>
  )
}



export default App;
