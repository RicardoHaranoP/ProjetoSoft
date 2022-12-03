import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { Component } from "react";
import moment from 'moment';
import dataService from "../../services/dataService";

import { useState } from 'react';
import axios from 'axios';

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
  
    

        

        return(
            
            <>
            <div className='col p-5 overflow-auto h-100'>

                <div className="row">
                    <div className="col-12">
                        <h2>Agendamentos</h2>
                        
        
                        <Calendar
                        localizer={localizer}
                        events={[
                            {   
                                title: "Evento Teste", 
                                start: moment().toDate(), 
                                end: moment().add(30, 'minutes').toDate() 
                            }
                        ]}
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