
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import dataService from '../services/dataService';
import { MdAddCircle } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { Table } from 'rsuite';
import { format, addDays } from 'date-fns';

const { Column, HeaderCell, Cell } = Table;


let pacienteAtualNome = null

const OdontogramaLista = () => {

    const navigate = useNavigate();
    const { codPac } = useParams();

    const [nomesProcedimentos, setNomesProcedimentos] = useState([])
    const [procedimentos, setProcedimentos] = useState([])
    const [pacientes, setPacientes] = useState([])
    const [odontograma, setOdontograma] = useState([])
    const [query, setQuery] = useState("")
    const [valorSugerido, setValorSugerido] = useState([])

    const tipoDente = [
        { id: 1, nome: '1ºIncisivo' },
        { id: 2, nome: '2ºIncisivo' },
        { id: 3, nome: 'Canino' },
        { id: 4, nome: '1ºPré-molar' },
        { id: 5, nome: '2ºPré-molar' },
        { id: 6, nome: '1ºMolar' },
        { id: 7, nome: '2ºMolar' },
        { id: 8, nome: 'Siso' },
    ];

    const quadrantes = [
        { id: 1, nome: 'Superior Esquerdo' },
        { id: 2, nome: 'Superior Direito' },
        { id: 3, nome: 'Inferior Direito' },
        { id: 4, nome: 'Inferior Esquerdo' },
    ]

    const tipoFaces = [
        { id: 1, nome: 'Vestibular' },
        { id: 2, nome: 'Lingual' },
        { id: 3, nome: 'Distal' },
        { id: 4, nome: 'Mesial' },
        { id: 5, nome: 'Oclusal' },
    ]


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

    function pegaProcedimentos() {

        dataService.getProcedimentos()
            .then((response) => {

                const mappedProcedimentos = response.data.map(item => ({ label: item.nome, value: item.nome }));

                setNomesProcedimentos(mappedProcedimentos);
                setProcedimentos(response.data);

                console.log('procedimentos: ', response)
            })
            .catch(error => {
                erroDataService(error)
            });
    }

    useEffect(() => {

        pegaPacientes();
        pegaOdontogramas();
        pegaProcedimentos()

    }, []);
//
    const handleDelete = (codOdon) => {
        console.log('id: ', codOdon);
        var retorno = confirm('Realmente deseja excluir odontograma?');
        if (retorno == true) {


            dataService.deleteOdontograma(codOdon)
                .then(response => {
                    console.log('odontograma deletado', response.data);
                    navigate('../../')
                })
                .catch(error => {
                    erroDataService(error)
                });
        } else {
            console.log('Operação cancelada!!');
        }
    }


    function changeModal() {
        modal.classList.toggle('hide')
        fade.classList.toggle('hide')
    }//

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
                            data={odontograma.sort((a, b) => new Date(b.dataRealizacao) - new Date(a.dataRealizacao))}
                            onRowClick={rowData => {
                                console.log(rowData);
                            }}
                        >
                            <Column width={150} align="center" fixed>
                                <HeaderCell>Data Realização</HeaderCell>
                                <Cell dataKey="dataRealizacao" >
                                    {(rowData) => {
                                        let data = new Date(rowData['dataRealizacao'])
                                        data = addDays(data, 1)
                                        const dataFormatada = format(data, 'dd/MM/yyyy')
                                        return <span>{dataFormatada}</span>
                                    }}
                                </Cell>
                            </Column>

                            <Column width={150} align="center">
                                <HeaderCell>Dente</HeaderCell>
                                <Cell dataKey="dente">
                                    {(rowData, rowIndex) => {
                                        const valorDente = rowData['dente'];
                                        for (let i = 0; i <= 7; i++) {
                                            if (valorDente == tipoDente[i].id) {
                                                return (<span>{tipoDente[i].nome}</span>)
                                            }
                                        }
                                    }}
                                </Cell>
                            </Column>

                            <Column width={150} align="center">
                                <HeaderCell>Quadrante</HeaderCell>
                                <Cell dataKey="quadrante">
                                    {(rowData, rowIndex) => {
                                        const valor = rowData['quadrante'];
                                        for (let i = 0; i <= 3; i++) {
                                            if (valor == quadrantes[i].id) {
                                                return (<span>{quadrantes[i].nome}</span>)
                                            }
                                        }
                                    }}
                                </Cell>
                            </Column>

                            <Column width={150} align="center">
                                <HeaderCell>Face</HeaderCell>
                                <Cell dataKey="face">
                                    {(rowData, rowIndex) => {
                                        const valor = rowData['face'];
                                        for (let i = 0; i <= 7; i++) {
                                            if (valor == tipoFaces[i].id) {
                                                return (<span>{tipoFaces[i].nome}</span>)
                                            }
                                        }
                                    }}
                                </Cell>
                            </Column>

                            <Column width={150} align="center">
                                <HeaderCell>Procedimento</HeaderCell>
                                <Cell dataKey="codProcedimento">
                                    {(rowData, rowIndex) => {
                                        const valor = rowData['codProcedimento'];
       
                                        for (let i =0; i<procedimentos.length; i++) {
                                            if(procedimentos[i].codProcedimento == valor){
                                                return (<span>{procedimentos[i].nome}</span>)
                                            }
                                        }

                                    }}
                                </Cell>
                            </Column>

                            <Column width={150} align="center">
                                <HeaderCell>Valor Sugerido</HeaderCell>
                                <Cell dataKey="valor">
                                    {(rowData, rowIndex) => {
                                        const valor = rowData['valor'];
                                        return(<span>{valor}</span>)

                                    }}
                                </Cell>
                            </Column>

                            <Column width={150} align="center">
                                <HeaderCell>Situacao</HeaderCell>
                                <Cell dataKey="situacao">
                                    {(rowData, rowIndex) => {
                                        const valor = rowData['situacao'];
                                        return(<span>{valor}</span>)
                                    }}
                                </Cell>
                            </Column>

                            <Column width={80} fixed="right">
                                <HeaderCell>Editar</HeaderCell>

                                <Cell>
                                    {rowData => (
                                        <span>
                                            <Link to={`../paciente/odontograma/edit/${codPac}/${rowData.codOdon}`} ><MdEdit /></Link>
                                        </span>
                                    )}
                                </Cell>
                            </Column>
                            <Column width={80} fixed="right">
                                <HeaderCell>Deletar</HeaderCell>

                                <Cell>
                                    {rowData => (
                                        <span>
                                            <a onClick={() => handleDelete(rowData.codOdon)}><MdDelete /></a>
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