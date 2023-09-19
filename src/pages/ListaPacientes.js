

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { MdAccountCircle } from 'react-icons/md';
import { MdAddCircle } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import '../css/ListaPacientDent.css';
import { Table } from 'rsuite';
import dataService from '../services/dataService';

const { Column, HeaderCell, Cell } = Table;

const ListarPacientes = () => {
    const [pacientes, setPacientes] = useState([]);


    useEffect(() => {
        init();
    }, []);

    const init = () => {
        dataService.getPacientes()
            .then(response => {
                console.log('Pacientes', response.data);



                let pacientesFormatados = response.data.map(paciente => {

                    let data = new Date(paciente.dataNasc)
                    data.setDate(data.getDate() + 2);
                    paciente.dataNasc = data.toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    });
                    return paciente
                })
                pacientesFormatados.sort((a, b) => {
                    if (a.nome < b.nome) return -1
                    if (a.nome > b.nome) return 1
                    return 0
                })
                setPacientes(pacientesFormatados);
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
        var retorno = confirm('Realmente deseja excluir paciente?');
        if (retorno == true) {
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
        } else {
            console.log('Operação cancelada!!');
        }
    }

    function changeModal() {
        modal.classList.toggle('hide')
        fade.classList.toggle('hide')
    }

    return (
        <div className="col p-4 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <button className='helpButton' onClick={changeModal}>?</button>
                    <div id='fade' className='hide' ></div>
                    <div id='modal' className='hide'>
                        <div className='modal-header'>
                            <h2>Help</h2>
                            <button id='close-modal' className='fechar-modal' onClick={changeModal}>Fechar</button>
                        </div>
                        <div className='modal-body'>
                            <ul>
                                <li><p>Esta é a página que lista todos os pacientes registrados</p></li>
                                <li><p>O nome do paciente pode ser clicado para ir para uma página com informações do paciente</p></li>
                                <li><p>Para editar alguma informação do paciente, basta clicar no simbolo de edição <MdEdit /></p></li>
                                <li><p>Para deletar um paciente, basta clicar no simbolo de delete <MdDelete /></p></li>
                                <li><p>Para registrar um novo paciente no sistema, basta clicar no botão 'Novo Paciente'</p></li>
                            </ul>
                        </div>
                    </div>
                    <div className='w-100 d-flex justify-content-between'>
                        <h2 className="mb-4 mt-0">Pacientes</h2>
                        <div>
                            <a className="novo" href="http://localhost:3000/paciente/cadastro" role="button" > <MdAddCircle size={30} /> Novo Paciente</a>
                        </div>
                    </div>
                    <Table
                        height={400}
                        data={pacientes}
                        onRowClick={rowData => {
                            console.log(rowData);
                        }}
                    >
                        <Column width={250} align="center" fixed>
                            <HeaderCell>Nome</HeaderCell>
                            <Cell dataKey="nome" >
                                {rowData => (
                                    <Link to={`../paciente/${rowData.codPac}`}>{rowData.nome}</Link>
                                )}
                            </Cell>
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
                                        <Link to={`../paciente/edit/${rowData.codPac}`} ><MdEdit /></Link>
                                    </span>
                                )}
                            </Cell>
                        </Column>
                        <Column width={80} fixed="right">
                            <HeaderCell>Deletar</HeaderCell>

                            <Cell>
                                {rowData => (
                                    <span>
                                        <a onClick={() => handleDelete(rowData.codPac)}><MdDelete /></a>
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