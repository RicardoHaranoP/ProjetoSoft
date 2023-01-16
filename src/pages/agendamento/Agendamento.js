import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { Component, useEffect } from "react";
import moment from 'moment';
import dataService from "../../services/dataService";

import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';



const localizer = momentLocalizer(moment);

const eventos = []

const Agenda = () => {
    const { codCons } = useParams();

    const [consultas, setConsultas] = useState([])

    const dia = []
    const horaInicio = []
    const horaFinal = []


    //
    useEffect(() => {
        dataService.getConsultas()
            .then((response) => {
                setConsultas(response.data);
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


        pegaEvents()
        console.log(dia, horaInicio, horaFinal)
        console.log(eventos)
    }, [])


    async function pegaEvents() {

        for (let i = 0; i < consultas.length; i++) {
            dia.push(consultas[i].data)
            horaInicio.push(consultas[i].horaInicio)
            horaFinal.push(consultas[i].horaFinal)

            eventos.push(
                {
                    title: 'eventos',
                    start: moment(dia[i] + ' ' + horaInicio[i]).toDate(),
                    end: moment(dia[i] + ' ' + horaFinal[i]).toDate()
                },
            )
        }
    }
    //




    // const previsaoDuracao = (comeco,fim) => {
    //     const ms = moment(fim, 'HH:mm').diff(moment(comeco, 'HH:mm'));
    //     const d = moment.duration(ms);
    //     const s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
    //     console.log(ms);//
    //     console.log(d);
    //     console.log(s);

    //     return s;
    // }

    // const separandoConsultas = async (comprimento) => {

    //     for (let i=0 ;i<comprimento;i++){
    //         console.log(i);
    //         console.log(consultas);
    //         //const a = await setConsultas();
    //         //console.log(a);
    //     }
    // }

    // const horarioDeInicio = async(i,response) => {
    //     const a = await dataService.getConsultas()
    //     a = response.data[i].data+' '+response.data[i].horaInicio
    //     console.log('horarioDeinicio: ',a);
    // }
    //    

    //ESPERA DEIXA EU VER
    // async function pegaConsultas() {
    //     dataService.getConsultas()
    //         .then(response => {
    //             console.log('getConsultas funfando', response.data);
    //             for (let i = 0; i < response.data.length; i++) {

    //                 setInicio(response.data[i].data + ' ' + response.data[i].horaInicio);
    //                 setFim(response.data[i].data + ' ' + response.data[i].horaFinal)

    //             }
    //             //
    //         })
    //         .catch(error => {
    //             if (error.response) {
    //                 // The request was made and the server responded with a status code
    //                 // that falls out of the range of 2xx
    //                 console.log("error.data ", error.response.data);
    //                 console.log("error.status ", error.response.status);
    //                 console.log("error.headers ", error.response.headers);
    //             } else if (error.request) {
    //                 // The request was made but no response was received
    //                 // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //                 // http.ClientRequest in node.js
    //                 console.log('error.request', error.request);
    //             } else {
    //                 // Something happened in setting up the request that triggered an Error
    //                 console.log('Error', error.message);
    //             }
    //             console.log('error.config', error.config);
    //         });
    // }
    //






    return (

        <>
            <div className='col p-5 overflow-auto h-100'>

                <div className="row">
                    <div className="col-12">
                        <h2>Agendamentos</h2>


                        <Calendar
                            localizer={localizer}
                            events={eventos}
                            defaultView="week"
                            selectable
                            popup
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 600 }}
                        />
                    </div>
                </div>
            </div>
        </>
    )

}

export default Agenda;