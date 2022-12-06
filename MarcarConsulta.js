import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../Cadastro.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import dataService from "../../services/dataService";


const MarcarConsulta = () => {

    const navigate = useNavigate();
    const {codCons} = useParams();

    const[data, setData]=useState('');
    const[paciente, setPaciente]=useState('');
    const[dentista, setDentista]=useState('');
    const[horaInicio, setHoraInicio]=useState('');
    const[horaFinal, setHoraFinal]=useState('');
    const[confirmado, setConfirmado]=useState('');
    const[consRealizada, setConsRealizada]=useState('');


    const saveConsulta = (e) => {
        e.preventDefault();

        const consulta = {data, horaInicio, horaFinal, confirmado, consRealizada, paciente, dentista}

        if (codCons){
            //update
            dataService.updateConsulta(codCons,consulta)
                .then(response => {
                    console.log('consulta atualizada', response.data);
                    navigate('/');
                })
                .catch(error => {
                    //if (error.)
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log("error.data ",error.response.data);
                        console.log("error.status ",error.response.status);
                        console.log("error.headers ",error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log('error.request',error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                        console.log('error.config', error.config);
                    });
        } else {
            //create
            dataService.createConsulta(consulta)
                .then(response => {
                    console.log('Consulta criada', response.data);
                    navigate('/');
                })
                .catch(error => {
                    //if (error.)
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log("error.data ",error.response.data);
                        console.log("error.status ",error.response.status);
                        console.log("error.headers ",error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log('error.request',error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                        console.log('error.config', error.config);
                    });
        }
    }

    useEffect(() => {
        if (codCons) {
            dataService.getConsulta(codCons)
                .then(consulta => {
                    setData(consulta.data.data);
                })
        }
    })

    return(
        <>
        
            <div className="col p-4 overflow-auto h-100">
                <div className="row">
                    <div className="col-12">
                        <div className='w-100 d-flex justify-content-between'>                        
                            <div>
                                

                                <h2 className="mb-4 mt-0">Marcar Consulta</h2>

                                <form>
                                    <label>Paciente:</label>
{/*
                                    <datalist id="pacientes">
                                        <option value="Boston"/>
                                        <option value="Cambridge"/>
                                    </datalist>
                                    <input type="text" name="city" list="pacientes"/>
 */}
                                    <input
                                        type="text" 
                                        id="paciente"
                                        value={paciente} 
                                        onChange={(e) => setPaciente(e.target.value)}
                                        name="paciente"
                                    />
{/*
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Dropdown button
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a className="dropdown-item" href="#">Action</a>
                                            <a className="dropdown-item" href="#">Another action</a>
                                            <a className="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </div>*/}
                                    <label>Dentista:</label>
                                    <input
                                        type="text" 
                                        id="dentista"
                                        value={dentista} 
                                        onChange={(e) => setDentista(e.target.value)}
                                        name="dentista" 
                                    />
                                    <label>data da Consulta:</label>
                                    <input
                                        type="Date" 
                                        id="data"
                                        value={data} 
                                        onChange={(e) => setData(e.target.value)}
                                        name="data" 
                                    />
                                    <label>horario da Consulta:</label>
                                    <input
                                        type="time" 
                                        id="horaInicio"
                                        value={horaInicio} 
                                        onChange={(e) => setHoraInicio(e.target.value)}
                                        name="horaInicio" 
                                    />
                                    <label>horario de Término:</label>
                                    <input
                                        type="time" 
                                        id="horaFinal"
                                        value={horaFinal} 
                                        onChange={(e) => setHoraFinal(e.target.value)}
                                        name="horaFinal" 
                                    />                                               
                                    <div>
                                        <span>
                                            <a type="button" className='btnCancelar' href='../'>Cancelar</a>
                                        </span>                           
                                        <button className='btnCadastrar' onClick={(e) => saveConsulta(e)} >Cadastrar</button>
                                    </div>
                                </form>
                            </div>                            
                        </div>           
                    </div>
                </div>
            </div>
        </>
    )
}

export default MarcarConsulta;