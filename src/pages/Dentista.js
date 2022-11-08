
import './PacientDent.css';

export default function Dentista(){
    return(
        <div>


            <a href="http://localhost:3000/dentista/agendamento">
                <button type="button" class="agenda">Agenda</button>
            </a> 

            <div className="informacoes">
                <p>Dentista:<br/>Diolete</p>
                <p>Celular:<br/>(42)99999-9999</p>
                <p>Email:<br/>exemplo@gmail.com</p>
                <p>CPF:<br/>111.222.333-44</p>
                <p>Data Nascimento:<br/>00/00/0000</p>
            </div>
        </div>

    )
}