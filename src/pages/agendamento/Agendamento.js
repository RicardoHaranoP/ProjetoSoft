import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { Component, useEffect } from "react";
import moment from 'moment';
import dataService from "../../services/dataService";

import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const localizer = momentLocalizer(moment);


const Agenda = () => {
   /*

    retrieveData() {
        dataService.getAll()
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }
    
    */

    const {codCons} = useParams();
    
    const [comeco, setComeco]=useState('');
    const [fim, setFim]=useState('');
    const [dia, setDia]=useState('');
    const [confirmado, setConfirmado]=useState('');
    const [consRealizada, setConsRealizada]=useState('');
    const [eventos, setEventos]=useState([]);
//
    const teste = [
        {   
            title: "Evento Teste", 
            start: moment(dia).toDate() ,
            end: moment(dia).add(30, 'minutes').toDate() 
        },
        {
            title: 'VAMOS TENTAR ENTÂO Né',
            start: moment(dia).toDate(),
            end: moment(dia).add(2, 'hour').toDate()
        },
        {
            title: 'TESTEZAO',
            start: moment().add(4, 'hour').toDate(),
            end: moment().add(5, 'hour').toDate()
        }
    ];
  
    const teste2 = [
        {
            start: comeco,
        }
    ]

    const previsaoDuracao = (comeco,fim) => {
        const ms = moment(fim, 'HH:mm').diff(moment(comeco, 'HH:mm'));
        const d = moment.duration(ms);
        const s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
        console.log(ms);//
        console.log(d);
        console.log(s);

        return s;
    }//
    
    useEffect(() => {
        dataService.getConsultas()
            .then(response => {
                console.log('getConsultas funfando', response.data);
                setEventos(response);
                console.log(eventos.data[1].data);
                setComeco(eventos.data[1].horaInicio);
                setFim(eventos.data[1].horaFinal)
                setDia(eventos.data[1].data);
                console.log(comeco, fim);
                previsaoDuracao(comeco,fim);
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
    },[])
    

        return(
            
            <>
            <div className='col p-5 overflow-auto h-100'>

                <div className="row">
                    <div className="col-12">
                        <h2>Agendamentos</h2>
                        
        
                        <Calendar
                        localizer={localizer}
                        events={teste}
                        defaultView="week"
                        selectable
                        popup
                        style={{ height: 600 }}
                        />
                    </div>
                </div>            
            </div>
            </>
        )
    
}

export default Agenda;