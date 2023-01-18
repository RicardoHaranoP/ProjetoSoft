import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { Component, useEffect } from "react";
import moment from 'moment';
import dataService from "../../services/dataService";
import 'moment/locale/pt-br';

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
    const { codCons } = useParams();


    const dia = []
    const horaInicio = []
    const horaFinal = []



    //
    useEffect(() => {
        dataService.getConsultas()
            .then((response) => {
                pegaEvents()
            })
            .catch(error => {
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




        //console.log(dia, horaInicio, horaFinal)
        //console.log(eventos)
    }, [])

    //
    async function pegaEvents() {
        var consultas = await dataService.getConsultas()
        consultas = consultas.data
        console.log(consultas)
        for (let i = 0; i < consultas.length; i++) {
            dia.push(consultas[i].data)
            horaInicio.push(consultas[i].horaInicio)
            horaFinal.push(consultas[i].horaFinal)

            eventos.push(
                {
                    title: 'Meeting',
                    start: moment(dia[i] + ' ' + horaInicio[i]).toDate(),
                    end: moment(dia[i] + ' ' + horaFinal[i]).toDate()
                },
            )
        }

    }


    const eventPropGetter = useCallback(
        (event, start, end, isSelected) => ({
            ...(moment(end)<moment(Date()) && {
                style: {backgroundColor: 'MediumSeaGreen',},
            }),
            ...(moment(start)>moment(Date()) && {
                style: {backgroundColor: 'DarkOrange',},
            })
        }),
        []
    )

    return (

        <>
            <div className='col p-5 overflow-auto h-100'>

                <div className="row">
                    <div className="col-12">
                        <h2>Agendamentos</h2>

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
                        />
                    </div>
                </div>
            </div>
        </>
    )

}

export default Agenda;