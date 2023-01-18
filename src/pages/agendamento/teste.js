import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';


const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const [events, setEvents] = useState([
        {
            start: new Date(),
            end: new Date(moment().add(1, 'days')),
            title: 'Evento 1'
        },
        {
            start: new Date(moment().add(3, 'days')),
            end: new Date(moment().add(4, 'days')),
            title: 'Evento 2'
        }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [eventTitle, setEventTitle] = useState('');
    const [eventStart, setEventStart] = useState(new Date());
    const [eventEnd, setEventEnd] = useState(new Date());

    const handleSelectEvent = (event) => {
        alert(event.title);
    };

    const handleAddEvent = () => {
        setShowModal(true);
    };

    const handleEventTitleChange = (event) => {
        setEventTitle(event.target.value);
    };

    const handleEventStartChange = (date) => {
        setEventStart(date);
    };

    const handleEventEndChange = (date) => {
        setEventEnd(date);
    };

    const handleSaveEvent = () => {
        const newEvent = {
            start: eventStart,
            end: eventEnd,
            title: eventTitle
        };
        setEvents([...events, newEvent]);
        setShowModal(false);
        setEventTitle('');
        setEventStart(new Date());
        setEventEnd(new Date());
    };

    return (
        <div>
            <button onClick={handleAddEvent}>Adicionar Evento</button>
            {showModal && (
                <div>
                    <label>Título do Evento:</label>
                    <input type="text" value={eventTitle} onChange={handleEventTitleChange} />
                    <br />
                    <label>Data de Início:</label>
                    <input type="datetime-local" value={eventStart} onChange={handleEventStartChange} />
                    <br />
                    <label>Data de Término:</label>
                    <input type="datetime-local" value={eventEnd} onChange={handleEventEndChange} />
                    <br />
                    <button onClick={handleSaveEvent}>Salvar</button>
                    <button onClick={() => setShowModal(false)}>Cancelar</button>
                </div>
            )}
            <Calendar
                localizer={localizer}
                events={events}
                onSelectEvent={handleSelectEvent}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
            />
        </div>
    );
};

export default MyCalendar;


// const MyCalendar = () => {


//     return (
//      <div>
//        <button >Adicionar Evento</button>
//         </div>
// );
// };

// export default MyCalendar
