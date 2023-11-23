
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import dataService from '../services/dataService';
import { MdAddCircle } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { Table } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;


let pacienteAtualNome = null

const OdontogramaLista = () => {

    const navigate = useNavigate();
    const { codPac } = useParams();


    const [pacientes, setPacientes] = useState([])
    const [odontograma, setOdontograma] = useState([])
    const [query, setQuery] = useState("")

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

    async function pegaOdontogramas() {
        try {
            const response = await dataService.getOdontogramas()

            console.log('Odontograma: ', response)


            response.data.forEach(element => {
                if (element.codPac == codPac) {
                    setOdontograma((prevState) => [...prevState, element])
                    console.log('odontograma codpac: ', element)
                }
            })

        }
        catch (error) {
            erroDataService(error)
        };
    }


    useEffect(() => {

        pegaPacientes();
        pegaOdontogramas();

    }, []);

    useEffect(() => {




    }, [odontograma]);


    function changeModal() {
        modal.classList.toggle('hide')
        fade.classList.toggle('hide')
    }

    return (
        <>
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
                                    <li><p>Esta é a página do odontograma do paciente selecionado</p></li>
                                </ul>
                            </div>
                        </div>
                        <h2 className="mb-5 mt-0">Odontograma {pacienteAtualNome} Lista</h2>
                        <div>
                            <a className="novo" href={`http://localhost:3000/paciente/${codPac}/odontograma/cadastro`} role="button" > <MdAddCircle size={30} /> Novo Odontograma</a>
                        </div>
                        <br /><br /><br />
                        <Table
                            height={400}
                            data={odontograma.sort((a,b) => b.codOdon - a.codOdon)}
                            onRowClick={rowData => {
                                console.log(rowData);
                            }}
                        >
                            <Column width={250} align="center" fixed>
                                <HeaderCell>Data Realização</HeaderCell>
                                <Cell dataKey="dataRealizacao" >
                                </Cell>
                            </Column>

                            <Column width={150} align="center">
                                <HeaderCell>Dente</HeaderCell>
                                <Cell dataKey="dente" />
                            </Column>

                            <Column width={150} align="center">
                                <HeaderCell>Face</HeaderCell>
                                <Cell dataKey="face" />
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
            </div >
        </>

    )
}

export default OdontogramaLista;