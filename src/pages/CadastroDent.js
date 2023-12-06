import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import '../css/Cadastro.css';
import api from '../services/api';
import dataService from '../services/dataService';
import InputMask from "react-input-mask";

const CadastroDent = () => {

    const navigate = useNavigate();
    const { codDent } = useParams();

    /*
    const[paciente,setPaciente] = useState({
        nome: "",
        dataNascimento: "",
        celular: "",
        email: ""
    })*/

    const [opcaoSelecionada, setOpcaoSelecionada] = useState('UF')

    const [nome, setNome] = useState('')
    const [cro, setCro] = useState('')
    const [dataNasc, setDataNasc] = useState('')
    const [celular, setCelular] = useState('')
    const [email, setEmail] = useState('')


    api.get('/dentista')
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
    /*
        //Dob
        var data = document.getElementById("data")
        if (data.value == "") {
            window.alert("please enter your Date of Birth");
            data.focus();
            return false;
        }*/


    const saveDentista = (e) => {
        e.preventDefault();
        let uf = opcaoSelecionada
        const dentista = { nome, cro, dataNasc, celular, email, uf };
        console.log(cro)
        const camposValidos = isCamposValid();

        if (camposValidos) {
            if (codDent) {
                //update
                dataService.updateDentista(codDent, dentista)
                    .then(response => {
                        console.log('Dentista atualizado', response.data);
                        navigate('/');
                    })
                    .catch(error => {
                        //if (error.)
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
                    });
            } else {
                //create
                dataService.createDentista(dentista)

                    .then(response => {

                        console.log("Dentista adicionado", response.data);
                        navigate("/");
                    })
                    .catch(error => {
                        //if (error.)
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
                    });
            }
        }
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
            const label = campo.previousElementSibling.innerText;
            if (campo.id == 'uf') {
                console.log('deu uf', opcaoSelecionada)
                if (opcaoSelecionada == 'UF') { 
                    createError(campo, `O campo "${label}" deve ser selecionado`)
                    valid = false
                }
            } else {
                //verificando se o campo está vazio
                if (!campo.value) {
                    createError(campo, `O campo "${label}" não pode estar em branco`)
                    valid = false;
                }

                //validando email
                if (campo.id == 'email') {
                    if (!validarEmail(campo)) {
                        valid = false
                    }
                }

                if (campo.id == 'cro') {
                    if (isNaN(campo.value.replace(/\D/g, ''))) {
                        createError(campo, 'CRO deve ser um número')
                        valid = false
                    }
                }

                if (campo.id == 'dataNasc') {
                    if (!validarDataNasc(campo)) {
                        valid = false
                    }
                }
            }


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


    function validarEmail(campo) {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(campo.value)) {
            createError(campo, 'Email inválido')
            return false
        }

        return true
    }

    function validarDataNasc(campo) {
        if (new Date(campo.value) > new Date()) {
            createError(campo, 'Data não pode ser posterior ao dia atual')
            return false
        }
        return true
    }

    useEffect(() => {
        if (codDent) {
            console.log('passando pelo if do useeffect');
            dataService.getDentista(codDent)
                .then(dentista => {
                    setNome(dentista.data.nome);
                    setCro(dentista.data.cro);
                    setDataNasc(dentista.data.dataNasc);
                    setCelular(dentista.data.celular);
                    setEmail(dentista.data.email);
                    setOpcaoSelecionada(dentista.data.uf)
                })
                .catch(error => {
                    //if (error.)
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
                });
        }
    }, [])

    const handleOptionClick = (option) => {
        setOpcaoSelecionada(option);
    };

    const handleCRO = (e) => {
        console.log('va',e.target.value.replace(/\D/g, ''))
        setCro(e.target.value.replace(/\D/g, ''))
    }

    return (
        <div className="col p-4 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <div className='w-100 d-flex justify-content-between'>
                        <div>


                            <h2 className="mb-4 mt-0">Cadastro Dentistas</h2>
                            <form method='POST' className='formulario'>
                                <label>Nome:</label>
                                <input
                                    type="text"
                                    id="nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    placeholder="Digite seu nome"
                                    className='validar'
                                />

                                <label>CRO:</label><br />
                                CRO/
                                <div className="dropdown">
                                    <div className="dropbtn" placeholder='UF'>{opcaoSelecionada}</div>
                                    <div id='uf' className="dropdown-content validar" >
                                        <a onClick={() => handleOptionClick('AC')}>AC</a>
                                        <a onClick={() => handleOptionClick('AL')}>AL</a>
                                        <a onClick={() => handleOptionClick('AP')}>AP</a>
                                        <a onClick={() => handleOptionClick('AM')}>AM</a>
                                        <a onClick={() => handleOptionClick('BA')}>BA</a>
                                        <a onClick={() => handleOptionClick('CE')}>CE</a>
                                        <a onClick={() => handleOptionClick('DF')}>DF</a>
                                        <a onClick={() => handleOptionClick('ES')}>ES</a>
                                        <a onClick={() => handleOptionClick('GO')}>GO</a>
                                        <a onClick={() => handleOptionClick('MA')}>MA</a>
                                        <a onClick={() => handleOptionClick('MT')}>MT</a>
                                        <a onClick={() => handleOptionClick('MS')}>MS</a>
                                        <a onClick={() => handleOptionClick('MG')}>MG</a>
                                        <a onClick={() => handleOptionClick('PA')}>PA</a>
                                        <a onClick={() => handleOptionClick('PB')}>PB</a>
                                        <a onClick={() => handleOptionClick('PR')}>PR</a>
                                        <a onClick={() => handleOptionClick('PE')}>PE</a>
                                        <a onClick={() => handleOptionClick('PI')}>PI</a>
                                        <a onClick={() => handleOptionClick('RJ')}>RJ</a>
                                        <a onClick={() => handleOptionClick('RN')}>RN</a>
                                        <a onClick={() => handleOptionClick('RS')}>RS</a>
                                        <a onClick={() => handleOptionClick('RO')}>RO</a>
                                        <a onClick={() => handleOptionClick('RR')}>RR</a>
                                        <a onClick={() => handleOptionClick('SC')}>SC</a>
                                        <a onClick={() => handleOptionClick('SP')}>SP</a>
                                        <a onClick={() => handleOptionClick('SE')}>SE</a>
                                        <a onClick={() => handleOptionClick('TO')}>TO</a>
                                    </div>
                                </div>
                                <InputMask
                                    mask='999999'
                                    type="text"
                                    id="cro"
                                    value={cro}
                                    onChange={handleCRO}
                                    name="cro"
                                    placeholder="CRO"
                                    className='validar'
                                    style={{ width: '80px' }}
                                />

                                <label>Data de Nascimento:</label>

                                <input
                                    type="Date"
                                    id="dataNasc"
                                    value={dataNasc}
                                    onChange={(e) => { setDataNasc(e.target.value); console.log(e) }}
                                    name="dataNascimento"
                                    className='validar'
                                />

                                <br />
                                <label>Celular:</label><br />
                                <InputMask
                                    mask="(99) 99999-9999"
                                    value={celular}
                                    id='celular'
                                    onChange={(e) => setCelular(e.target.value)}
                                    placeholder="Digite seu número de celular"
                                    className="validar"
                                    style={{ width: '120px' }}
                                >
                                    {(inputProps) => <input {...inputProps} />}
                                </InputMask><br />

                                <label>email:</label>
                                <input
                                    type="text"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="email"
                                    placeholder="Digite seu email"
                                    className='validar' />


                                <div>
                                    <span>
                                        <a type="button" className='btnCancelar' href='../pacientes'>Cancelar</a>
                                    </span>
                                    <button className='btnCadastrar' onClick={(e) => saveDentista(e)}>Cadastrar</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default CadastroDent;
