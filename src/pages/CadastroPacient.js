import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './Cadastro.css';
import api from '../services/api';
import dataService from '../services/dataService';
import ValidaCPF from '../components/ValidaCPF'


const CadastroPacient = () => {

    const navigate = useNavigate();
    const { codPac } = useParams();





    /*
    const[paciente,setPaciente] = useState({
        nome: "",
        dataNascimento: "",
        celular: "",
        email: ""
    })*/

    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [dataNasc, setDataNasc] = useState('')
    const [celular, setCelular] = useState('')
    const [email, setEmail] = useState('')

    api.get('/paciente')
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


    const savePaciente = (e) => {
        e.preventDefault();

        const paciente = { nome, cpf, dataNasc, celular, email };

        const camposValidos = isCamposValid();

        if (codPac) {
            //update
            dataService.updatePaciente(codPac, paciente)
                .then(response => {
                    console.log('paciente atualizado', response.data);
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
            dataService.createPaciente(paciente)

                .then(response => {

                    console.log("Paciente adicionado", response.data);
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

    //Verificando a valida????o dos campos
    function isCamposValid() {
        //flag
        let valid = true;

        const formulario = document.querySelector('.formulario')

        //remove a mensagem de erro anterior
        for (let errorText of formulario.querySelectorAll('.error-text')) {
            errorText.remove()
        }

        //para todo campo no formulario, verifica-se valor v??lido
        for (let campo of formulario.querySelectorAll('.validar')) {
            const label = campo.previousElementSibling.innerText;
            //verificando se o campo est?? vazio
            if (!campo.value) {
                createError(campo, `O campo "${label}" n??o pode estar em branco`)
                valid = false;
            }

            //validando CPF
            if (campo.id == 'cpf') {
                if (!validarCPF(campo)) {                    
                    valid = false
                }
            }
        }
    }

    // cria uma mensagem de erro em uma 'div'
    function createError(campo, msg) {
        const div = document.createElement('div')
        div.innerHTML = msg
        div.classList.add('error-text')
        campo.insertAdjacentElement('afterend', div)
    }

    function validarCPF(campo) {
        const cpf = new ValidaCPF(campo.value)
        if (!cpf.valida()) {
            createError(campo, 'CPF inv??lido')
            return false
        }
        return true
    }

    useEffect(() => {
        if (codPac) {
            dataService.getPaciente(codPac)
                .then(paciente => {
                    setNome(paciente.data.nome);
                    setCpf(paciente.data.cpf);
                    setDataNasc(paciente.data.dataNasc);
                    setCelular(paciente.data.celular);
                    setEmail(paciente.data.email);
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


    /*function cadastrarPaciente() {
        //validateControls();
    }*/
    /*
        function validateControls() {
            //FirstName
            var valor = document.getElementById("fname");
            alert("Voc?? digitou: " + valor);
            /*
            var fname = document.getElementById("fname")
            if (fname == "") {
                window.alert("please enter your first name");
                fname.focus();
                return false;
            }
    
            getControlValues();
            
        }
    
        function getControlValues() {
            alert("First Name= " + fname.value)
        }
    */

    /*
        allInput.foreach(input => {
            if(input.value != ""){
                form.classList.add('secActive');
            }else{
                form.classList.remove('secActive');
                alert("input est?? vazio")
            }
        })*/

    /*
    const response = axios.post('http://localhost:8000/paciente', {
        first_name: 'John Doe',
    });
    console.log(response.data);*/


    return (
        <div className="col p-4 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <div className='w-100 d-flex justify-content-between'>
                        <div>


                            <h2 className="mb-4 mt-0">Cadastro Pacientes</h2>
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


                                <label>CPF:</label>
                                <input
                                    type="text"
                                    id="cpf"
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                    name="cpf"
                                    placeholder="Digite seu CPF"
                                    className='validar'
                                />


                                <label>Data de Nascimento:</label>
                                <input
                                    type="Date"
                                    id="dataNasc"
                                    value={dataNasc}
                                    onChange={(e) => setDataNasc(e.target.value)}
                                    name="dataNascimento"
                                    placeholder="Digite sua Data de Nascimento"
                                    className='validar'
                                />
                                <br />
                                <label>Celular:</label>
                                <input
                                    type="text"
                                    id="celular"
                                    value={celular}
                                    onChange={(e) => setCelular(e.target.value)}
                                    name="celular"
                                    placeholder="Digite seu n??mero de celular"
                                    className='validar'
                                />

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
                                    <button className='btnCadastrar' onClick={(e) => savePaciente(e)}>Cadastrar</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default CadastroPacient;