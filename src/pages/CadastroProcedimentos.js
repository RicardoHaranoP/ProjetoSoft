import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import dataService from "../services/dataService";
import { InputNumber } from 'rsuite';

const CadastroProcedimentos = () => {
    const navigate = useNavigate()

    const [nome, setnome] = useState('')
    const [dente, setdente] = useState(false)
    const [face, setface] = useState(false)
    const [valor, setValor] = useState(0)

    const saveProcedimentos = (e) => {
        
        e.preventDefault()

        const procedimento = { nome, dente, face, valor }
        const camposValidos = isCamposValid()
        if (camposValidos) {
            dataService.createProcedimento(procedimento)
                .then(response => {
                    console.log("Procedimento criado", response.data);
                    navigate('/ListaProcedimentos')
                })
                .catch(error => {
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

            //verificando se o campo está vazio
            if (!campo.value) {
                createError(campo, `O campo "${label}" não pode estar em branco`)
                valid = false;
            }
        }
        //para Validar Procedimento
        for (let campo of formulario.querySelectorAll('.validarValor')) {
            const label = campo.previousElementSibling.innerText;

            //verificando se o campo está vazio
            if (!valor) {
                createError(campo, `O campo "${label}" não pode estar em branco`)
                valid = false;
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

    useEffect(() => {


    }, [])


    return (
        <div className="col p-4 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <h1>Cadastro Procedimentos </h1>
                    <form onSubmit={saveProcedimentos} className="formulario">
                        <label>Nome do procedimento</label>
                        <input
                            id="nome"
                            type="text"
                            value={nome}
                            onChange={(e) => setnome(e.target.value)}
                            className="validar"
                        />
                        {/*                        
                        <input
                            id="dente"
                            type="checkbox"
                            value={dente}
                            onChange={(e) => setdente(!dente)}
                        />
                         <label>Envolve dente?</label>
                        <br /><br />
                        
                        <input
                            id="face"
                            type="checkbox"
                            value={face}
                            onChange={(e) => setface(!face)}
                        />
                        <label >Envolve face?</label> */}

                        <div style={{ width: 160 }}>
                            <label>Valor Sugerido (R$):</label>
                            <InputNumber
                                value={valor}
                                onChange={(e) => setValor(e)}
                                postfix=',00'
                                style={{ width: '150px' }}
                                className="validarValor"
                            />
                        </div>
                        <div>
                            <span>
                                <a type="button" className='btnCancelar' href='../ListaProcedimentos'>Cancelar</a>
                            </span>
                            <button type="submit" className="btnCadastrar">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CadastroProcedimentos;