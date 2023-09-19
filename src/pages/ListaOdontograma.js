import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import dataService from "../services/dataService";
import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { Table } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

let pacienteAtualNome = null

export default function ListaOdontograma() {
    const navigate = useNavigate()

    const { codPac } = useParams()

    const [pacientes, setPacientes] = useState([])
    const [odontogramas, setOdontogramas] = useState([])
    

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

    function pegaPacientes() {

        dataService.getPacientes()
            .then((response) => {

                response.data.forEach(element => {

                    if (element.codPac == codPac) {
                        pacienteAtualNome = element.nome
                    }
                });
                setPacientes(response.data)
                console.log('paciente: ', response)
            })
            .catch(error => {
                erroDataService(error)
            });



    }



    useEffect(() => {
        pegaPacientes()

    }, [])




    return (
        <div className="col p-4 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <h1>Odontograma {pacienteAtualNome}</h1>
                    <Table
                        height={400}
                        data={odontogramas}
                        onRowClick={rowData => {
                            console.log('rowdata', rowData);
                        }}
                    >
                        <Column width={250} align="center" fixed>
                            <HeaderCell>Odontograma</HeaderCell>
                            <Cell dataKey='nome'>
                                {rowData => (

                                    <Link to={`../dentista/${rowData.codDent}`}>{rowData.nome}</Link>

                                )}
                            </Cell>
                        </Column>

                        <Column width={80} fixed="right">
                            <HeaderCell>Dente</HeaderCell>
                            <Cell dataKey="dente"/>
                        </Column>
                        <Column width={80} fixed="right">
                            <HeaderCell>Face</HeaderCell>
                            <Cell dataKey="face"/>                                        
                        </Column>
                        <Column width={80} fixed="right">
                            <HeaderCell>Data</HeaderCell>

                            <Cell dataKey="dataProcedimento"/>
                        </Column>
                        <Column width={80} fixed="right">
                            <HeaderCell>Deletar</HeaderCell>

                            <Cell>
                                {rowData => (
                                    <span>
                                        <a><MdDelete /></a>
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