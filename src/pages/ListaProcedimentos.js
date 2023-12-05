import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom"
import dataService from "../services/dataService";
import { MdAddCircle } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { Table } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;



export default function ListaProcedimentos() {
    const navigate = useNavigate()

    const [pacientes, setPacientes] = useState([])
    const [procedimentos, setProcedimentos] = useState([])
    const [query, setQuery] = useState("")
    const [erro, setErro] = useState()

    

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


    function pegaProcedimentos() {

        dataService.getProcedimentos()
            .then((response) => {


                setProcedimentos(response.data);

                console.log('procedimentos: ', response)
            })
            .catch(error => {
                erroDataService(error)
            });
    }

    const handleDeleteProcedimento = (codProcedimento) => {
        console.log('codProc', codProcedimento)
        var retorno = confirm('Realmente deseja excluir procedimento?');
        if (retorno == true) {
            dataService.deleteProcedimento(codProcedimento)
                .then(response => {
                    console.log('procedimento deletado', response.data);
                    navigate('../')
                })
                .catch(function (error) {
                    erroDataService(error)

                    if (error.message == 'Request failed with status code 500') {
                        alert('Não é possível deletar este procedimento, pois está sendo utilizado em um Odontograma')
                    }
                });
        } else {
            console.log('Operação cancelada!!');
        }

    }


    useEffect(() => {

        pegaProcedimentos()

    }, [])

    function changeModal() {
        modal.classList.toggle('hide')
        fade.classList.toggle('hide')
    }


    return (
        <div className="col p-4 overflow-auto h-100">
            <div className="row">
                <div className="col-12 aux">

                    <button className='helpButton' onClick={changeModal}>?</button>
                    <div id='fade' className='hide' ></div>
                    <div id='modal' className='hide'>
                        <div className='modal-header'>
                            <h2>Help</h2>
                            <button id='close-modal' className='fechar-modal' onClick={changeModal}>Fechar</button>
                        </div>
                        <div className='modal-body'>
                            <ul>
                                <li><p>Esta é a página que lista todos os procedimentos registrados</p></li>

                            </ul>
                        </div>
                    </div>
                    <div className='w-100 d-flex justify-content-between'>

                        <h2>Procedimentos </h2>

                        <div>
                            <a className="novo" href="http://localhost:3000/cadastroProcedimentos" role="button" > <MdAddCircle size={30} /> Novo Procedimento</a>
                        </div>


                    </div>
                    <div>
                        <input placeholder="Digite o Procedimento" onChange={event => setQuery(event.target.value)} />
                    </div>
                    <Table
                        height={400}
                        data={procedimentos.filter(elementos => {
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
                            <HeaderCell>Procedimentos</HeaderCell>
                            <Cell dataKey='nome' />
                        </Column>
                        <Column width={80} fixed="right">
                            <HeaderCell>Valor</HeaderCell>
                            <Cell dataKey="valor"></Cell>
                        </Column>
                        <Column width={80} fixed="right">
                            <HeaderCell>Deletar</HeaderCell>

                            <Cell>
                                {rowData => (
                                    <span>
                                        <a onClick={() => handleDeleteProcedimento(rowData.codProcedimento)}><MdDelete /></a>
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