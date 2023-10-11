import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../../css/Cadastro.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import dataService from "../../services/dataService";
import { DatePicker } from 'rsuite';


const MarcarConsulta = () => {

    const navigate = useNavigate();
    const { codCons } = useParams();

    const [data, setData] = useState('');
    const [paciente, setPaciente] = useState(null);
    const [dentista, setDentista] = useState(null);
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFinal, setHoraFinal] = useState('');
    const [confirmado, setConfirmado] = useState('');
    const [consRealizada, setConsRealizada] = useState('');

    const [pacientes, setPacientes] = useState([]);
    const [dentistas, setDentistas] = useState([]);



    const saveConsulta = (e) => {
        e.preventDefault();

        const consulta = { data, horaInicio, horaFinal, confirmado, consRealizada, paciente, dentista }

        if (codCons) {
            //update
            dataService.updateConsulta(codCons, consulta)
                .then(response => {
                    console.log('consulta atualizada', response.data);
                    navigate('/');
                })
                .catch(error => {
                    erroDataService(error)
                });
        } else {
            //create
            dataService.createConsulta(consulta)
                .then(response => {
                    console.log('Consulta criada', response.data);
                    navigate('/');
                })
                .catch(error => {
                    erroDataService(error)
                });
        }
    }

    async function pegaDentistas() {

        await dataService.getDentistas()
            .then((response) => {
                response.data.sort((a, b) => {
                    if (a.nome < b.nome) return -1
                    if (a.nome > b.nome) return 1
                    return 0
                })
                setDentistas(response.data)
                console.log('dentista: ', response.data)
            })
            .catch(error => {
                erroDataService(error)
            });

    }

    async function pegaPacientes() {

        await dataService.getPacientes()
            .then((response) => {

                response.data.sort((a, b) => {
                    if (a.nome < b.nome) return -1
                    if (a.nome > b.nome) return 1
                    return 0
                })
                console.log(response.data)
                setPacientes(response.data)
                console.log('paciente: ', response.data)
            })
            .catch(error => {
                erroDataService(error)
            });

    }

    useEffect(() => {
        if (codCons) {
            dataService.getConsulta(codCons)
                .then(consulta => {
                    setData(consulta.data.data);
                })
        }

        pegaDentistas()
        pegaPacientes()


    }, [])

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

    const handleDentistaSelection = (e) => {
        setDentista(e.target.value)
    };

    const handlePacienteSelection = (e) => {
        setPaciente(e.target.value)
    };

    function changeModal() {
        modal.classList.toggle('hide')
        fade.classList.toggle('hide')
    }

    return (
        <>

            <div className="col p-4 overflow-auto h-100">
                <div className="row">
                    <div className="col-12">
                        <div className='w-100 d-flex justify-content-between'>
                            <div>

                                <button className='helpButton' onClick={changeModal}>?</button>
                                <h2 className="mb-4 mt-0">Marcar Consulta</h2>

                                <div id='fade' className='hide' ></div>
                                <div id='modal' className='hide'>
                                    <div className='modal-header'>
                                        <h2>Help</h2>
                                        <button id='close-modal' className='fechar-modal' onClick={changeModal}>Fechar</button>
                                    </div>
                                    <div className='modal-body'>
                                        <ul>
                                            <li><p>Esta página serve para cadastrar uma consulta na agenda de um dentista</p></li>
                                            <li><p>Em 'Selecione o Dentista:' pode ser selecionado um dentista já foi registrado no sistema</p></li>
                                            <li><p>Em 'Selecione o Paciente:' pode ser selecionado um paciente já registrado no sistema</p></li>
                                            <li><p>Em 'Data da Consulta:' selecione a data em que a consulta será realizada</p></li>
                                            <li><p>Em 'Horario da consulta' selecione o horario de inicio previsto da consulta</p></li>
                                            <li><p>Em 'Horario de termino' selecione o horario de término previsto da consulta</p></li>
                                        </ul>
                                    </div>
                                </div>

                                <form>
                                    <label>
                                        Selecione o dentista:
                                        <select onChange={handleDentistaSelection}>
                                            <option value={null}>Selecione o dentista</option>
                                            {dentistas.map((dentist) => (
                                                <option key={dentist.codDent} value={dentist.codDent}>
                                                    {dentist.nome}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                    <label>
                                        Selecione o paciente:
                                        <select onChange={handlePacienteSelection}>
                                            <option value={null}>Selecione o paciente</option>
                                            {pacientes.map((patient) => (
                                                <option key={patient.codPac} value={patient.codPac}>
                                                    {patient.nome}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                    <label>data da Consulta:</label>
                                    <input
                                        type="Date"
                                        id="data"
                                        value={data}
                                        onChange={(e) => { setData(e.target.value) }}
                                        name="data"
                                    />
                                    <label>horario da Consulta:</label>
                                    <DatePicker
                                        format="HH:mm"
                                        ranges={[]}
                                        hideHours={hour => hour < 6 || hour > 22}
                                        hideMinutes={minute => minute % 30 !== 0}
                                        style={{ width: 100 }}
                                    />
                                    <input
                                        type="time"
                                        id="horaInicio"
                                        value={horaInicio}
                                        onChange={(e) => setHoraInicio(e.target.value)}
                                        name="horaInicio"
                                    />
                                    <label>duracao da consulta:</label>
                                    <DatePicker
                                        format="HH:mm"
                                        ranges={[]}
                                        hideHours={hour => hour > 3}
                                        hideMinutes={minute => minute % 30 !== 0}
                                        style={{ width: 100 }}
                                    />
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