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
    const clickRef = useRef(null)


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
                        eventos.push(
                            {
                                title: 'Meeting',
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

        var dentistas = await dataService.getDentistas()
            .then((response) => {

                console.log('dentista: ', response)
            })
            .catch(error => {
                erroDataService(error)
            });

    }

    async function pegaPacientes() {

        var pacientes = await dataService.getPacientes()
            .then((response) => {

                console.log('paciente: ', response)
            })
            .catch(error => {
                erroDataService(error)
            });

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

    const onSelectEvent = useCallback(() => {
        window.clearTimeout(clickRef?.current)
        clickRef.current = window.setTimeout(() => {
            changeModal()
        }, 250)
    }, [])


    function changeModal() {
        modal.classList.toggle('hide')
        fade.classList.toggle('hide')
    }

    useLayoutEffect(() => {
        pegaEvents()
        //tentativa numero 2
        async function fetchData() {
            const response = await dataService.getConsultas()
            
            const filteredList = response.data.filter(item => item.codDent == codDent)
            console.log(filteredList)
            setList(filteredList)
            console.log('list: ',list)
            console.log('eventos',eventos)

        }
        fetchData()


        // //tentativa numero 1
        // const teste = dataService.getConsultas()

        // teste
        //     .then(response => {

        //         const list = Array.from(response.data)
        //         console.log('list: ', list)
        //         for (let i = 0; i < list.length; i++) {

        //             if (list[i].codDent == codDent) {
        //                 eventos.push(
        //                     {
        //                         title: 'Meeting',
        //                         start: moment(list[i].data + ' ' + list[i].horaInicio).toDate(),
        //                         end: moment(list[i].data + ' ' + list[i].horaFinal).toDate()
        //                     },
        //                 )
        //             }
        //         }
        //         console.log(eventos)
        //     })



    }, [])

    return (

        <>
            <div className='col p-5 overflow-auto h-100'>

                <div className="row">
                    <div className="col-12">
                        <h2>Agendamentos</h2>
                        {console.log('html: ', eventos)}
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
                            <div className='modal-body'>
                                <p>lorem</p>
                                <button className='cancelar'>Cancelar Consulta</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )

}

export default Agenda;