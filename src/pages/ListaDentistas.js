

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
import { SearchBar } from 'rsuite/esm/Picker';

const { Column, HeaderCell, Cell } = Table;

const ListarDentistas = () => {
    const [dentista, setDentista] = useState([]);
    const [query, setQuery] = useState("")

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        dataService.getDentistas()
            .then(response => {
                console.log('dentista', response.data);
                let dentistasFormatados = response.data.map(dentista => {

                    let data = new Date(dentista.dataNasc)
                    data.setDate(data.getDate() + 2);
                    dentista.dataNasc = data.toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    });
                    return dentista
                })
                dentistasFormatados.sort((a, b) => {
                    if (a.nome < b.nome) return -1
                    if (a.nome > b.nome) return 1
                    return 0
                })

                setDentista(dentistasFormatados);

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
        if (retorno == true) {


            dataService.deleteDentista(codDent)
                .then(response => {
                    console.log('dentista deletado', response.data);
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
                                <li><p>Esta é a página que lista todos os dentistas registrados</p></li>
                                <li><p>O nome do dentista pode ser clicado para ir para uma página com informações do dentista e sua agenda</p></li>
                                <li><p>Para editar alguma informação do dentista, basta clicar no simbolo de edição <MdEdit /></p></li>
                                <li><p>Para deletar um dentista, basta clicar no simbolo de delete <MdDelete /></p></li>
                                <li><p>Para registrar um novo dentista no sistema, basta clicar no botão 'Novo Dentista'</p></li>
                            </ul>
                        </div>
                    </div>
                    <div className='w-100 d-flex justify-content-between'>

                        <h2 className="mb-4 mt-0">Dentistas</h2>

                        <div>
                            <a className="novo" href="http://localhost:3000/dentista/cadastro" role="button" > <MdAddCircle size={30} /> Novo Dentista</a>
                        </div>


                    </div>

                    <div>
                        <input placeholder="Digite o Dentista" onChange={event => setQuery(event.target.value)} />
                    </div>
                    <Table
                        height={400}
                        data={dentista.filter(elementos => {
                            if (query === '') {
                                return elementos;
                            } else if (elementos.nome.toLowerCase().includes(query.toLowerCase())) {
                                return elementos;
                            }
                        })}
                        onRowClick={rowData => {
                            console.log('rowdata', rowData);
                        }}
                    >

                        <Column width={250} align="center" fixed>
                            <HeaderCell>Nome</HeaderCell>
                            <Cell dataKey='nome'>
                                {rowData => (

                                    <Link to={`../dentista/${rowData.codDent}`}>{rowData.nome}</Link>

                                )}
                            </Cell>
                        </Column>

                        <Column width={70} align="center">
                            <HeaderCell>UF CRO</HeaderCell>
                            <Cell dataKey="uf" />
                        </Column>
                        <Column width={100} align="center">
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
                                        <Link to={`../dentista/edit/${rowData.codDent}`} ><MdEdit /></Link>
                                    </span>
                                )}
                            </Cell>
                        </Column>
                        <Column width={80} fixed="right">
                            <HeaderCell>Deletar</HeaderCell>

                            <Cell>
                                {rowData => (
                                    <span>
                                        <a onClick={() => handleDelete(rowData.codDent)}><MdDelete /></a>
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
                                número celular
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
                            número celular
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