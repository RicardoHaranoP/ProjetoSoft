

import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { MdAccountCircle } from 'react-icons/md';
import { MdAddCircle } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import '../css/ListaPacientDent.css';
import { Table } from 'rsuite';
import dataService from '../services/dataService';


const { Column, HeaderCell, Cell } = Table;



const ListaAnamnese = () => {
    const [anamnese, setAnamnese] = useState([]);
    const [pacienteAtualNome, setPacienteAtualNome] = useState(null);

    const { codPac } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        console.log('codPac', codPac)
        pegarAnamneses()
        pegaPacienteAtual()
    }, []);

    const pegarAnamneses = () => {
        dataService.getAnamneses()
            .then(response => {
                console.log('anamnese', response.data)
                response.data.forEach(element => {
                    if (element.codPac == codPac) {
                        setAnamnese((prevState) => [...prevState, element])
                    }
                })
            })
            .catch(function (error) {
                erroDataService(error)
            });
    }

    function pegaPacienteAtual() {

        dataService.getPacientes()
            .then((response) => {

                response.data.forEach(element => {

                    if (element.codPac == codPac) {
                        setPacienteAtualNome(element.nome)

                    }
                });

            })
            .catch(error => {
                erroDataService(error)
            });
    }

    const handleDelete = (id) => {
        var retorno = confirm(`Realmente deseja excluir a anamnese?`);
        if (retorno == true) {
            dataService.deleteAnamnese(id)
                .then((response) => {
                    console.log('anamnese deletada ', response)
                    navigate('../')

                })
                .catch(error => {
                    erroDataService(error)
                });
        } else {
            console.log('operação cancelada')
        }
    }

    function changeModal() {
        modal.classList.toggle('hide')
        fade.classList.toggle('hide')
    }

    const erroDataService = (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("error.data ", error.response.data);
            console.log("error.status ", error.response.status);
            console.log("error.headers ", error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log('error.request', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log('error.config', error.config);
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
                                <li><p>Esta é a página que lista a anamnese do paciente</p></li>
                                <li><p>Para editar alguma informação da anamnese, basta clicar no simbolo de edição <MdEdit /></p></li>
                                <li><p>Para deletar uma anamnese, basta clicar no simbolo de delete <MdDelete /></p></li>
                            </ul>
                        </div>
                    </div>
                    <div className='w-100 d-flex justify-content-between'>
                        <h2 className="mb-4 mt-0">Lista Anamnese {pacienteAtualNome}</h2>
                        <div>
                            <a className="novo" href={`http://localhost:3000/paciente/${codPac}/anamnese/cadastro`} role="button" > <MdAddCircle size={30} /> Nova Anamnese</a>
                        </div>
                    </div>
                    <Table
                        height={400}
                        data={anamnese.sort((a, b) => new Date(b.dataRealizacao) - new Date(a.dataRealizacao))}
                        onRowClick={rowData => {
                            console.log('rowdata', rowData);
                        }}
                    >
                        <Column width={250} align="center" fixed>
                            <HeaderCell>Anamnese</HeaderCell>
                            <Cell dataKey='nome'>
                                {rowData => (

                                    <Link to={`../../paciente/anamnese/${pacienteAtualNome}/${rowData.codAnam}`}>Anamnese do dia {rowData.dataRealizacao}</Link>

                                )}
                            </Cell>
                        </Column>

                        <Column width={80} fixed="right">
                            <HeaderCell>Editar</HeaderCell>

                            <Cell>
                                {rowData => (
                                    <span>
                                        <Link to={`../paciente/anamnese/edit/${pacienteAtualNome}/${codPac}/${rowData.codAnam}`} ><MdEdit /></Link>
                                    </span>
                                )}
                            </Cell>
                        </Column>
                        <Column width={80} fixed="right">
                            <HeaderCell>Deletar</HeaderCell>

                            <Cell>
                                {rowData => (
                                    <span>
                                        <a onClick={() => handleDelete(rowData.codAnam)}><MdDelete /></a>
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

export default ListaAnamnese;
