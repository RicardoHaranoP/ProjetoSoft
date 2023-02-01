import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { Component, useEffect, useLayoutEffect, useRef } from "react";
import moment from 'moment';
import dataService from "../../services/dataService";
import 'moment/locale/pt-br';
import './modal.css'

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';

const messages = {
    allDay: 'Dia Inteiro',
    previous: '<',
    next: '>',
    today: 'Hoje',
    month: 'Mês',
    week: 'Semana',
    day: 'Dia',
    agenda: 'Agenda',
    date: 'Data',
    time: 'Hora',
    event: 'Evento',
    showMore: (total) => `+ (${total}) Eventos`,
}

const localizer = momentLocalizer(moment);

const eventos = []


const Agenda = () => {

    const [list, setList] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [dentista, setDentista] = useState([]);
    const [pacientes, setPacientes] = useState([])
    const clickRef = useRef(null)
    //

    let { codDent } = useParams()
    //
    useEffect(() => {


        const modal = document.querySelector("#modal");
        const fade = document.querySelector("#fade");

        pegaDentistas()
        pegaPacientes()


        return () => {
            window.clearTimeout(clickRef?.current)
        }


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

    //
    async function pegaEvents() {

        await dataService.getConsultas()
            .then((response) => {

                console.log('consulta: ', response)
                response = response.data

                for (let i = 0; i < response.length; i++) {

                    if (response[i].codDent == codDent) {
                        // pacientes.forEach(element =>{
                        //     if(response[i].codPac == element.codPac) {
                        //         var nomePac = element.nome
                                
                        //     }
                        // });
                    
                        
                        eventos.push(
                            {
                                codCons: response[i].codCons,
                                title: `m`,
                                start: moment(response[i].data + ' ' + response[i].horaInicio).toDate(),
                                end: moment(response[i].data + ' ' + response[i].horaFinal).toDate()
                            },
                        )
                    }
                }
            })
            .catch(error => {
                erroDataService(error)
            });



    }




    async function pegaDentistas() {

        await dataService.getDentistas()
            .then((response) => {
                response.data.forEach(element => {
                    if(element.codDent == codDent){
                        setDentista(element)
                    }
                });
                console.log('dentista: ', response)
            })
            .catch(error => {
                erroDataService(error)
            });

    }

    async function pegaPacientes() {

        await dataService.getPacientes()
            .then((response) => {
                setPacientes(response)
                console.log('paciente: ', response)
            })
            .catch(error => {
                erroDataService(error)
            });

    }

    const handleDelete = (codCons) => {
        console.log('id: ', codCons);
        var retorno = confirm('Realmente deseja cancelar consulta?');
        if (retorno == true) {


            dataService.deleteConsulta(codCons)
                .then(response => {
                    console.log('consulta cancelada', response.data);
                    pegaEvents();
                })
                .catch(function (error) {
                    erroDataService(error)
                });

        } else {
            console.log('Operação cancelada!!');
        }
    }

    const eventPropGetter = useCallback(
        (event, start, end, isSelected) => ({
            ...(moment(end) < moment(Date()) && {
                style: { backgroundColor: 'MediumSeaGreen', },
            }),
            ...(moment(start) > moment(Date()) && {
                style: { backgroundColor: 'DarkOrange', },
            })
        }),
        []
    )

    const onSelectEvent = useCallback((event) => {
        setSelectedEvent(event);

        window.clearTimeout(clickRef?.current)
        clickRef.current = window.setTimeout(() => {
            changeModal()
        }, 250)
    }, [])


    function changeModal() {
        modal.classList.toggle('hide')
        fade.classList.toggle('hide')
    }

    //tentativa numero 2
    async function fetchData() {
        const response = await dataService.getConsultas()

        const filteredList = response.data.filter(item => item.codDent == codDent)
        //console.log(filteredList)
        setList(filteredList)
        //console.log('list: ',list)
        //console.log('eventos',eventos)

    }

    useLayoutEffect(() => {
        pegaPacientes()
        pegaEvents()
        fetchData()
    }, [])

    console.log('haha pacientes: ',pacientes)
    return (

        <>
            <div className='col p-5 overflow-auto h-100'>

                <div className="row">
                    <div className="col-12">
                        <h2>Agendamentos {dentista.nome}</h2>

                        <Calendar
                            localizer={localizer}
                            messages={messages}
                            culture={'pt-BR'}
                            events={eventos}
                            defaultView="week"
                            popup
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 500 }}
                            eventPropGetter={eventPropGetter}
                            onSelectEvent={onSelectEvent}                        
                        />
                        <div id='fade' className='hide' ></div>
                        <div id='modal' className='hide'>
                            <div className='modal-header'>
                                <h2>Este é o modal</h2>
                                <button id='close-modal' className='fechar-modal' onClick={changeModal}>Fechar</button>
                            </div>
                            {selectedEvent && (<div className='modal-body'>
                                <p>Data: {selectedEvent.start.toLocaleDateString()}</p>
                                <p>Horario Inicio: {selectedEvent.start.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'})}</p>
                                <p>Horario Fim: {selectedEvent.end.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'})}</p>
                                <button className='cancelar' onClick={() => (handleDelete(selectedEvent.codCons))}>Cancelar Consulta</button>
                            </div>)}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )

}

export default Agenda;