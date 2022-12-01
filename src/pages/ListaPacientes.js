

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import {MdAccountCircle} from 'react-icons/md';
import {MdAddCircle} from 'react-icons/md';
import {MdDelete} from 'react-icons/md';
import {MdEdit} from 'react-icons/md';
import './ListaPacientDent.css';
import { Table } from 'rsuite';
import dataService from '../services/dataService';

const { Column, HeaderCell, Cell } = Table;

const ListarPacientes = () => {
    const[pacientes, setPacientes]=useState([]);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        dataService.getPacientes()
            .then(response => {
                console.log('Pacientes', response.data);
                setPacientes(response.data);
            })
            .catch(function (error) {
                if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                }
                console.log(error.config);
            });
        }

    const handleDelete = (codPac) => {
        console.log('id: ', codPac);
        dataService.deletePaciente(codPac)
            .then(response => {                
                console.log('paciente deletado', response.data);
                init();
            })
            .catch(function (error) {
                if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }

    return(
        <div className="col p-4 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <div className='w-100 d-flex justify-content-between'>
                        <h2 className="mb-4 mt-0">Pacientes</h2>
                        <div>
                        <a className="novo" href="http://localhost:3000/paciente/cadastro" role="button" > <MdAddCircle size={30}/> Novo Paciente</a>
                        </div>
                    </div> 
                    <Table
                    height={400}
                    data={pacientes}
                    onRowClick={rowData => {
                        console.log(rowData);
                    }}
                    >
                    <Column width={60} align="center" fixed>
                        <HeaderCell>Id</HeaderCell>
                        <Cell dataKey="codPac" />
                    </Column>

                    <Column width={250} align="center" fixed>
                        <HeaderCell>Nome</HeaderCell>
                        <Cell dataKey="nome" />
                    </Column>

                    <Column width={150} align="center">
                        <HeaderCell>CPF</HeaderCell>
                        <Cell dataKey="cpf" />
                    </Column>

                    <Column width={150} align="center">
                        <HeaderCell>Celular</HeaderCell>
                        <Cell dataKey="celular" />
                    </Column>

                    <Column width={150} align="center">
                        <HeaderCell>Data Nascimento</HeaderCell>
                        <Cell dataKey="dataNasc" />
                    </Column>

                    <Column width={250}>
                        <HeaderCell>Email</HeaderCell>
                        <Cell dataKey="email" />
                    </Column>
                    <Column width={80} fixed="right">
                        <HeaderCell>Editar</HeaderCell>

                        <Cell>
                        {rowData => (
                            <span>                                
                                <Link to={`paciente/edit/${rowData.codPac}`} ><MdEdit/></Link>
                            </span>
                        )}
                        </Cell>
                    </Column>
                    <Column width={80} fixed="right">
                        <HeaderCell>Deletar</HeaderCell>

                        <Cell>
                        {rowData => (
                            <span>                                
                                <a onClick={() => handleDelete(rowData.codPac)}><MdDelete/></a>
                            </span>
                        )}
                        </Cell>
                    </Column>
                </Table>                       
                </div>
            </div>
        </div>
    )
}

export default ListarPacientes;