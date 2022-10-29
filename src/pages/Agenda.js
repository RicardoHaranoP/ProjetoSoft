import './TopNav.css';
import './Agenda.css';

export default function Agenda(){
    return(
        <div>


            <div class="infoGeral">
                <div class="nomeDentista">
                    <p>Agenda de Diolete</p>
                </div>
                <div class="diaMes">
                    <p>27 de Setembro</p>
                </div>
            </div>

            <div class="diaSemana">
                <button type="button" class="hoje" onclick='#'>Hoje</button>
                <p> Terça-Feira</p><br/><br/>
            </div>
            
            <div>  
                <p class="day">27</p>
            </div>

            <ul class="horario">  
                <li>8:00</li>
                <li>8:30</li>
                <li>9:00</li>
                <li>9:30</li>
                <li>10:00</li>
                <li>10:30</li>
                <li>11:00</li>
                <li>11:30</li>
                <li>12:00</li>
            </ul>              
        </div>

    )
}