

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

const ListarDentistas = () => {
    const[dentista, setDentista]=useState([]);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        dataService.getDentistas()
            .then(response => {
                console.log('dentista', response.data);
                setDentista(response.data);
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

    const handleDelete = (codDent) => {
        console.log('id: ', codDent);
        var retorno = confirm('Realmente deseja excluir dentista?');
        if (retorno==true){

        
        dataService.deleteDentista(codDent)
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
            
        }else{
            console.log('Opera????o cancelada!!');
        }
    }

    return(
        <div className="col p-4 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <div className='w-100 d-flex justify-content-between'>
                        <h2 className="mb-4 mt-0">Dentistas</h2>
                        <div>
                        <a className="novo" href="http://localhost:3000/dentista/cadastro" role="button" > <MdAddCircle size={30}/> Novo Dentista</a>
                        </div>
                    </div> 
                    <Table
                    height={400}
                    data={dentista}
                    onRowClick={rowData => {
                        console.log(rowData);
                    }}
                    >
                    <Column width={100} fixed="left">
                        <HeaderCell></HeaderCell>
                        <Cell>
                        {rowData => (
                            <span>                                
                                <Link to={`../dentista/${rowData.codDent}`} >Informa????es</Link>
                            </span>
                        )}
                        </Cell>
                    </Column>

                    <Column width={250} align="center" fixed>
                        <HeaderCell>Nome</HeaderCell>
                        <Cell dataKey="nome" />
                    </Column>

                    <Column width={150} align="center">
                        <HeaderCell>CRO</HeaderCell>
                        <Cell dataKey="cro" />
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
                                <Link to={`../dentista/edit/${rowData.codDent}`} ><MdEdit/></Link>
                            </span>
                        )}
                        </Cell>
                    </Column>
                    <Column width={80} fixed="right">
                        <HeaderCell>Deletar</HeaderCell>

                        <Cell>
                        {rowData => (
                            <span>                                
                                <a onClick={() => handleDelete(rowData.codDent)}><MdDelete/></a>
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

export default ListarDentistas;
{/*
import './ListaPacientDent.css';

import {MdAccountCircle} from 'react-icons/md';
import {MdAddCircle} from 'react-icons/md';

export default function ListaDentistas() {
    return(
        <div>
            
            <a class="novo" href="http://localhost:3000/dentista/cadastro" role="button" > <MdAddCircle size={30}/> Novo Dentista</a> 

            <div class="paraEspecifico">
                <a href="./dentista">
                    <button>
                        <div class="AccountCircleIcon">
                            <MdAccountCircle size={150}/>
                        </div>
                        <div class="linha">
                            <div class="nome">
                                Diolete
                            </div>
                            <div class="idade">
                                Idade
                            </div>
                            <div class="celular">
                                n??mero celular
                            </div>
                            <div class="email">
                                exemplo@email.com
                            </div>                        
                        </div>
                    </button>
                </a>
                <button>
                    <div class="AccountCircleIcon">
                        <MdAccountCircle size={150}/>
                    </div>
                    <div class="linha">
                        <div class="nome">
                            Ezequiel
                        </div>
                        <div class="idade">
                            Idade
                        </div>
                        <div class="celular">
                            n??mero celular
                        </div>
                        <div class="email">
                            exemplo@email.com
                        </div>                        
                    </div>
                </button>
            </div>

        </div>
    )
}
 */}