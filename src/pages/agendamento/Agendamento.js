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
    const [consultas, setConsultas]=useState([]);
    const [inicio,setInicio]=useState('');
    const [comprimento, setComprimento]=useState('');
////
    const teste = [
        {   
            title: "Evento Teste", 
            start: moment('2022-12-06 16:00').toDate() ,
            end: moment('2022-12-06 17:00').toDate() 
        },
        {
            title: 'TESTEZAO',
            start: moment(inicio).toDate(),
            end: moment(fim).toDate()
        }
    ];

    const previsaoDuracao = (comeco,fim) => {
        const ms = moment(fim, 'HH:mm').diff(moment(comeco, 'HH:mm'));
        const d = moment.duration(ms);
        const s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
        console.log(ms);//
        console.log(d);
        console.log(s);

        return s;
    }

    const separandoConsultas = async (comprimento) => {
        
        for (let i=0 ;i<comprimento;i++){
            console.log(i);
            console.log(consultas);
            //const a = await setConsultas();
            //console.log(a);
        }
    }

    const horarioDeInicio = async(i,response) => {
        const a = await dataService.getConsultas()
        a = response.data[i].data+' '+response.data[i].horaInicio
        console.log('horarioDeinicio: ',a);
    }
    //
    useEffect(() => {
        dataService.getConsultas()
            .then(response => {
                console.log('getConsultas funfando', response.data);
                setConsultas(response);
                setComprimento(response.data.length);
                //separandoConsultas(response.data.length);
                //.log(eventos.data[1].data);
                //setComeco(eventos.data[1].horaInicio);
                //setFim(eventos.data[1].horaFinal)
                //setDia(eventos.data[1].data);
                //console.log(comeco, fim);
                //console.log('vamo porra, ', dia+' '+ comeco);
                //setInicio(response.data[1].data+' '+response.data[1].horaInicio);
                for (let i=0;i<response.data.length;i++){
                    console.log(i);
                    setInicio(response.data[i].data+' '+response.data[i].horaInicio);
                    setFim(response.data[i].data+' '+response.data[i].horaFinal)
                    //inicio.push(response.data[i].data+' '+response.data[i].horaInicio)
                    //inicio.concat(response.data[i].data+' '+response.data[i].horaInicio)
                    console.log('inicio: ',inicio);
                    console.log('final: ',fim)

                }
//
                //console.log(moment(dia,comeco).toDate());
                //previsaoDuracao(comeco,fim);
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
        
        console.log(inicio);
        //
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