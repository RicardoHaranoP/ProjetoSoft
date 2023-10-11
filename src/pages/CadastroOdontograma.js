import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import '../css/Cadastro.css';
import dataService from '../services/dataService';
import { InputNumber, InputPicker } from 'rsuite';
import { format } from 'date-fns';

let pacienteAtualNome = null

const CadastroOdontograma = () => {

    const teste = ['extracao', 'limpeza', 'restauracao'].map(
        item => ({ label: item, value: item })
    )


    const [nomesProcedimentos, setNomesProcedimentos] = useState([])
    const [procedimentos, setProcedimentos] = useState([])
    const [pacientes, setPacientes] = useState([])

    const navigate = useNavigate();
    const { codPac } = useParams();

    const [dataRealizacao, setDataRealizacao] = useState(new Date())
    const [dente, setDente] = useState('')
    const [face, setFace] = useState('')
    const [valor, setValor] = useState('')
    const [orcamento, setOrcamento] = useState('')
    const [procedimento, setProcedimento] = useState(0)
    const [qProcedimento, setQProcedimento] = useState('')
    const [codProcedimento, setCodProcedimento] = useState(0)



    const saveOdontograma = (e) => {
        e.preventDefault();

        for (const dados of procedimentos){

            if(qProcedimento == dados.nome) {

                setProcedimento(dados.codProcedimento)
                
                console.log(procedimento)
                break;
            }
        }


        const odontograma = { dataRealizacao, dente, face, valor, orcamento, procedimento }


        dataService.createOdontograma(codPac, odontograma)
            .then(response => {
                console.log('Odontograma adicionado', response.data);
                navigate('/');
            }).catch(error => {
                erroDataService(error)
            })
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

        pegaPacientes()
        pegaProcedimentos()

    }, [])


    return (
        <div className="col p-4 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <div className='w-100 d-flex justify-content-between'>
                        <div>


                            <h2 className="mb-4 mt-0">Cadastro Odontograma {pacienteAtualNome}</h2>
                            <form method='POST' className='formulario'>
                                <p>{format(dataRealizacao, 'dd/MM/yyyy')}</p>
                                <div style={{ width: 160 }}>
                                    <label>Dente</label>

                                    <InputNumber
                                        value={dente}
                                        onChange={(e) => setDente(e)}
                                        min={1} max={32}
                                    />
                                </div>
                                <div style={{ width: 160 }}>
                                    <label>Face</label>
                                    <InputNumber
                                        value={face}
                                        onChange={(e) => setFace(e)}
                                        id='face' min={0} max={5}
                                    />
                                </div>
                                <div style={{ width: 160 }}>
                                    <label>Valor</label>
                                    <InputNumber
                                        value={valor}
                                        onChange={(e) => setValor(e)}
                                    />
                                </div>
                                <div style={{ width: 160 }}>
                                    <label>Orçamento</label>
                                    <InputNumber
                                        value={orcamento}
                                        onChange={(e) => setOrcamento(e)}
                                    />
                                </div>
                                <div style={{ width: 160 }}>
                                    <label>Procedimento</label>
                                    <InputPicker
                                        onChange={(e) => setQProcedimento(e)}
                                        data={nomesProcedimentos}
                                    />
                                </div>
                                <div>
                                    <span>
                                        <a type="button" className='btnCancelar' href='../../../pacientes'>Cancelar</a>
                                    </span>
                                    <button className='btnCadastrar' onClick={(e) => saveOdontograma(e)}>Cadastrar</button>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default CadastroOdontograma;