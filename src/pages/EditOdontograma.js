import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import '../css/Cadastro.css';
import dataService from '../services/dataService';
import { InputNumber, InputPicker } from 'rsuite';
import { format } from 'date-fns';

let pacienteAtualNome = null

const EditOdontograma = () => {

    const teste = ['extracao', 'limpeza', 'restauracao'].map(
        item => ({ label: item, value: item })
    )


    const [nomesProcedimentos, setNomesProcedimentos] = useState([])
    const [procedimentos, setProcedimentos] = useState([])
    const [pacientes, setPacientes] = useState([])

    const navigate = useNavigate();
    const { codPac, codOdon } = useParams();


    const [dente, setDente] = useState('')
    const [face, setFace] = useState('')
    const [valor, setValor] = useState('')
    const [paciente, setPaciente] = useState()
    const [procedimento, setProcedimento] = useState('')
    const [qProcedimento, setQProcedimento] = useState('')
    const [codProcedimento, setCodProcedimento] = useState()
    const [situacao, setSituacao] = useState('')
    const [quadrante, setQuadrante] = useState('')
    const [auxDente, setAuxDente] = useState('')
    const [dataRealizacao, setDataRealizacao] = useState(new Date());



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

    const tipoSituacao = [
        { id: 1, nome: 'em Procedimento' },
        { id: 2, nome: 'Concluido' }
    ]

    const saveOdontograma = (e) => {
        e.preventDefault();
        // const ano = dataRealizacao.getFullYear()
        // const mes = dataRealizacao.getMonth()
        // const dia = dataRealizacao.getDate()
        // const dataFormatada = `${ano}-${mes}-${dia}`

        // setDataRealizacao(dataFormatada)

        // console.log(dataFormatada)
        const odontograma = { dataRealizacao, dente, face, valor, quadrante, situacao, procedimento, paciente, codPac, codProcedimento }
        const camposValidos = isCamposValid()
        console.log('idPaciente: ', paciente)

        if (camposValidos) {
            dataService.updateOdontograma(codOdon, odontograma)
                .then(response => {
                    console.log('Odontograma atualizado', response.data);
                    navigate('/');
                }).catch(error => {
                    erroDataService(error)
                })
        }
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
                        setPaciente(element.codPac)

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

                response.data.forEach(element => {
                    if (element.codProcedimento == codProcedimento) {
                        setQProcedimento(element.nome)
                        console.log(element.nome)
                    }
                })
                console.log('procedimentos: ', response)
            })
            .catch(error => {
                erroDataService(error)
            });
    }

    function pegaOdontograma() {
        dataService.getOdontograma(codOdon)
            .then(response => {
                console.log('responseODONt', response)
                setDente(response.data.dente)
                setQuadrante(response.data.quadrante)
                setFace(response.data.face)
                setCodProcedimento(response.data.codProcedimento)
                setProcedimento(response.data.codProcedimento)
                setSituacao(response.data.situacao)
                setValor(response.data.valor)
            })
            .catch(error => {
                erroDataService(error)
            })
    }


    const handleDenteSelection = (e) => {
        setDente(e.target.value)
    };

    const handleQuadranteSelection = (e) => {
        setQuadrante(e.target.value)
    };

    const handleFaceSelection = (e) => {
        setFace(e.target.value)
        console.log('face: ', e.target.value)
    };

    const handleProcedimentoSelection = (e) => {
        procedimentos.forEach(element => {
            if (element.nome == e) {
                setCodProcedimento(element.codProcedimento)
                setProcedimento(element.codProcedimento)
                setValor(element.valor)

            }
        })
    }

    const handleSituacaoSelection = (e) => {
        setSituacao(e.target.value)
        console.log('situacao:', e.target.value)
    }

    //Verificando a validação dos campos
    function isCamposValid() {
        //flag
        let valid = true;

        const formulario = document.querySelector('.formulario')

        //remove a mensagem de erro anterior
        for (let errorText of formulario.querySelectorAll('.error-text')) {
            errorText.remove()
        }

        //para todo campo no formulario, verifica-se valor válido
        for (let campo of formulario.querySelectorAll('.validar')) {
            const label = campo.previousElementSibling.previousElementSibling.innerText;
            //verificando se o campo está vazio
            if (!campo.value || campo.value == 'Selecione Dente' || campo.value == 'Selecione Quadrante' || campo.value == 'Selecione Face' || campo.value == 'Selecione Situacao') {
                createError(campo, `O campo "${label}" não pode estar em branco`)
                valid = false;
            }
            //
        }
        return valid
    }

    // cria uma mensagem de erro em uma 'div'
    function createError(campo, msg) {
        const div = document.createElement('div')
        div.innerHTML = msg
        div.classList.add('error-text')
        campo.insertAdjacentElement('afterend', div)
    }


    useEffect(() => {

        pegaPacientes()
        pegaOdontograma()
        pegaProcedimentos()

    }, [])
    useEffect(() => {


        pegaProcedimentos()


    }, [codProcedimento])

    return (
        <div className="col p-4 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <div className='w-100 d-flex justify-content-between'>
                        <div>


                            <h2 className="mb-4 mt-0">Atualizar Odontograma {pacienteAtualNome}</h2>
                            <form method='POST' className='formulario'>
                                <p>{format(dataRealizacao, 'dd/MM/yyyy')}</p>
                                <label>Dente: </label><br />
                                <select
                                    value={dente}
                                    onChange={handleDenteSelection}
                                    className="validar"
                                >
                                    <option value={null}>Selecione Dente</option>
                                    {tipoDente.map((dente) => (

                                        <option key={dente.id} value={dente.id}>

                                            {dente.nome}
                                        </option>
                                    ))}
                                </select><br />
                                <label>Quadrante: </label><br />
                                <select
                                    value={quadrante}
                                    onChange={handleQuadranteSelection}
                                    className="validar"
                                >
                                    <option value={null}>Selecione Quadrante</option>
                                    {quadrantes.map((quadrante) => (

                                        <option key={quadrante.id} value={quadrante.id}>

                                            {quadrante.nome}
                                        </option>
                                    ))}
                                </select><br />

                                <label>Face: </label><br />
                                <select
                                    onChange={handleFaceSelection}
                                    className="validar"
                                    value={face}
                                >
                                    <option value={null}>Selecione Face</option>
                                    {tipoFaces.map((faces) => (

                                        <option key={faces.id} value={faces.id}>

                                            {faces.nome}
                                        </option>
                                    ))}
                                </select><br />

                                <div style={{ width: 160 }}>
                                    <label>Procedimento</label>
                                    <InputPicker
                                        onChange={handleProcedimentoSelection}
                                        data={nomesProcedimentos}
                                        value={qProcedimento}
                                    />
                                </div>
                                <label>Situacao: </label><br />
                                <select
                                    onChange={handleSituacaoSelection}
                                    className="validar"
                                    value={situacao}
                                >
                                    <option value={null}>Selecione Situacao</option>
                                    {tipoSituacao.map((situacao) => (

                                        <option key={situacao.id} value={situacao.nome}>

                                            {situacao.nome}
                                        </option>
                                    ))}
                                </select><br />
                                <div>
                                    <span>
                                        <a type="button" className='btnCancelar' href='../../../../'>Cancelar</a>
                                    </span>
                                    <button className='btnCadastrar' onClick={(e) => saveOdontograma(e)}>Salvar</button>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default EditOdontograma;