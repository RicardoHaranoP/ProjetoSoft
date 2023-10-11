import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import dataService from "../services/dataService";


const CadastroProcedimentos = () => {
    const navigate = useNavigate()

    const [nome, setnome] = useState('')
    const [dente, setdente] = useState(false)
    const [face, setface] = useState(false)
    const [valor, setValor] = useState(0)

    const saveProcedimentos = (e) => {
        e.preventDefault()
        
        const procedimento = { nome, dente, face, valor }

        dataService.createProcedimento(procedimento)
            .then(response => {
                console.log("Procedimento criado", response.data);
                navigate('/')
            })
            .catch(error => {
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
                        />
                        <label>Envolve dente?</label>
                        <input
                            id="dente"
                            type="checkbox"
                            value={dente}
                            onChange={(e) => setdente(!dente)}
                        />
                        <br /><br />
                        <label >Envolve face?</label>
                        <input
                            id="face"
                            type="checkbox"
                            value={face}
                            onChange={(e) => setface(!face)}
                        />
                        <label>valor Sugerido:</label>
                        <input
                            id="valor"
                            type="number"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            style={{ width: '100px' }}
                        />
                        <div>
                            <span>
                                <a type="button" className='btnCancelar' href='../'>Cancelar</a>
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