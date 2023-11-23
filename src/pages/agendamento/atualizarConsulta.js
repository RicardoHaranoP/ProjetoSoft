import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../../css/Cadastro.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import dataService from "../../services/dataService";


const atualizarConsulta = () => {

    const navigate = useNavigate();
    const { codCons } = useParams();

    const [data, setData] = useState('');
    const [paciente, setPaciente] = useState(null);
    const [dentista, setDentista] = useState(null);
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFinal, setHoraFinal] = useState('');
    const [duracao, setDuracao] = useState('');
    const [confirmado, setConfirmado] = useState('');
    const [consRealizada, setConsRealizada] = useState('');



    const saveConsulta = (e) => {
        e.preventDefault();

        console.log(horaFinal)

        const consulta = { data, horaInicio, horaFinal, confirmado, consRealizada, paciente, dentista }

        const camposValidos = isCamposValid();

        if (camposValidos) {


            //update
            dataService.updateConsulta(codCons, consulta)
                .then(response => {
                    console.log('Consulta atualizada', response.data);
                    navigate('/');
                })
                .catch(error => {
                    erroDataService(error)
                });


        }
    }

    async function pegaConsulta() {

        await dataService.getConsultas()
            .then((response) => {
                response.data.forEach(element => {
                    if (element.codCons == codCons) {
                        console.log(element)
                        setData(element.data)
                        setPaciente(element.codPac)
                        setDentista(element.codDent)
                        setHoraInicio(element.horaInicio)
                        setHoraFinal(element.horaFinal)

                        let partesHoraInicio = element.horaInicio.split(":")
                        let partesHoraFinal = element.horaFinal.split(":")
                        let horas1 = parseInt(partesHoraInicio[0], 10);
                        let minutos1 = parseInt(partesHoraInicio[1], 10);
                        let horas2 = parseInt(partesHoraFinal[0], 10);
                        let minutos2 = parseInt(partesHoraFinal[1], 10);
                        let diferencaMinutos = (horas2 * 60 + minutos2) - (horas1 * 60 + minutos1);
                        let horasDiferenca = Math.floor(diferencaMinutos / 60);
                        let minutosDiferenca = diferencaMinutos % 60;
                        let aux = horasDiferenca.toString().padStart(2, "0") + ":" + minutosDiferenca.toString().padStart(2, "0")
                        setDuracao(aux)

                    }
                });
            })
            .catch(error => {
                erroDataService(error)
            });

    }

    useEffect(() => {

        pegaConsulta()


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

    const handleDuracaoSelection = (e) => {
        setDuracao(e.target.value)
        colocandoHoraFinal(horaInicio, e.target.value)
    }
    const handleHoraInicioSelection = (e) => {
        setHoraInicio(e.target.value)
        colocandoHoraFinal(e.target.value, duracao)
    }

    const colocandoHoraFinal = (horarioInicial, duracao) => {
        // Converter strings em objetos Date
        var partes = horarioInicial.split(':'); // Divide a string em partes usando ':' como separador
        var horaDeInicio = parseInt(partes[0]); // Converte a parte da horaDeInicio em um número inteiro
        var minutoDeInicio = parseInt(partes[1]); // Converte a parte dos minutoDeInicios em um número inteiro
        console.log('horaDeInicio ', horaDeInicio, 'minutoDeInicio ', minutoDeInicio)

        const horaInicial = new Date();
        horaInicial.setHours(horaDeInicio)
        horaInicial.setHours(minutoDeInicio)

        var partes = duracao.split(':'); // Divide a string em partes usando ':' como separador
        var horaDuracao = parseInt(partes[0]); // Converte a parte da hora em um número inteiro
        var minutoDuracao = parseInt(partes[1]); // Converte a parte dos minutos em um número inteiro
        console.log('hora ', horaDuracao, 'minuto ', minutoDuracao)

        const duracaoHoraEInicio = new Date();
        duracaoHoraEInicio.setHours(horaDuracao)
        duracaoHoraEInicio.setHours(minutoDuracao)


        // Adicionar a duração ao horário inicial
        var horaDeFim = horaDeInicio + horaDuracao;
        var minutoDeFim = minutoDeInicio + minutoDuracao;


        if (minutoDeFim === 60) {
            horaDeFim = horaDeFim + 1
            minutoDeFim = 0
        }

        const horaFormatada = `${horaDeFim.toString().padStart(2, '0')}:${minutoDeFim.toString().padStart(2, '0')}`;
        console.log(horaDeInicio + horaDuracao)
        console.log('horaFormatada ', horaFormatada)

        setHoraFinal(horaFormatada)

    }

    function changeModal() {
        modal.classList.toggle('hide')
        fade.classList.toggle('hide')
    }

    function isCamposValid() {
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
            if (campo.value == 'Selecione o paciente' || campo.value == 'Selecione o dentista' || campo.value == 'escolha') {
                createError(campo, `O campo "${label}" deve ser selecionado`)
                valid = false;
            }


            if (campo.id == 'data') {
                const dataCampo = new Date(campo.value)
                dataCampo.setDate(dataCampo.getDate() + 1)
                const diaAtual = new Date()
                console.log('dataCampo:', dataCampo)
                if (dataCampo < diaAtual) {
                    createError(campo, 'Data não pode ser anterior à atual')
                    valid = false
                }
                console.log('data', campo.value)
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

    return (
        <>

            <div className="col p-4 overflow-auto h-100">
                <div className="row">
                    <div className="col-12">
                        <div className='w-100 d-flex justify-content-between'>

                            <div>

                                <button className='helpButton' onClick={changeModal}>?</button>
                                <h2 className="mb-4 mt-0">Atualizar Consulta</h2>

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

                                <form className="formulario">

                                    <label>data da Consulta:</label>
                                    <input
                                        type="Date"
                                        id="data"
                                        value={data}
                                        onChange={(e) => { setData(e.target.value) }}
                                        name="data"
                                        className="validar"
                                    />
                                    <label>horario da Consulta:</label>
                                    <select
                                        id="horaInicio"
                                        value={horaInicio}
                                        onChange={handleHoraInicioSelection}
                                        name="horaInicio"
                                        className="validar"
                                    >
                                        <option value={null}>escolha</option>
                                        <option value="07:00">07:00</option>
                                        <option value="07:30">07:30</option>
                                        <option value="08:00">08:00</option>
                                        <option value="08:30">08:30</option>
                                        <option value="09:00">09:00</option>
                                        <option value="09:30">09:30</option>
                                        <option value="10:00">10:00</option>
                                        <option value="10:30">10:30</option>
                                        <option value="11:00">11:00</option>
                                        <option value="11:30">11:30</option>
                                        <option value="12:00">12:00</option>
                                        <option value="12:30">12:30</option>
                                        <option value="13:00">13:00</option>
                                        <option value="13:30">13:30</option>
                                        <option value="14:00">14:00</option>
                                        <option value="14:30">14:30</option>
                                        <option value="15:00">15:00</option>
                                        <option value="15:30">15:30</option>
                                        <option value="16:00">16:00</option>
                                        <option value="16:30">16:30</option>
                                        <option value="17:00">17:00</option>
                                        <option value="17:30">17:30</option>
                                        <option value="18:00">18:00</option>
                                        <option value="18:30">18:30</option>
                                        <option value="19:00">19:00</option>
                                        <option value="19:30">19:30</option>
                                        <option value="20:00">20:00</option>
                                        <option value="20:30">20:30</option>
                                        <option value="21:00">21:00</option>
                                    </select>
                                    <label>duracao da consulta:</label>
                                    <select
                                        id="duracao"
                                        value={duracao}
                                        onChange={handleDuracaoSelection}
                                        name="duracao"
                                        className="validar"
                                    >
                                        <option value={null}>escolha</option>
                                        <option value="00:30">00:30</option>
                                        <option value="01:00">01:00</option>
                                        <option value="01:30">01:30</option>
                                        <option value="02:00">02:00</option>
                                    </select>
                                    <div>
                                        <span>
                                            <a type="button" className='btnCancelar' href='../'>Cancelar</a>
                                        </span>
                                        <button className='btnCadastrar' onClick={(e) => saveConsulta(e)} >Salvar</button>
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

export default atualizarConsulta;