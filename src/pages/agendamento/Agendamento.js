import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { Component } from "react";
import moment from 'moment';
import DataService from "../../services/dataService";

import { useState } from 'react';
import axios from 'axios';

const localizer = momentLocalizer(moment);

export default class Agenda extends Component {
    constructor(props){
        super(props);
        this.retrieveData = this.retrieveData.bind(this);
    }

    componentDidMount() {
        this.retrieveData();
      }



    retrieveData() {
        DataService.getAll()
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }
    
    
  
    

/*
        axios.get("http://localhost:8000/dentista")
            .then(function (response){
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    */

    render(){
        

        return(
            
            <>
            <div className='col p-5 overflow-auto h-100'>

                <div className="row">
                    <div className="col-12">
                        <h2>Agendamentos</h2>
                        <button id="btnCons" >Hello</button>
                        
        
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
}