import './TopNav.css';
import './ListaPacientDent.css';

import {MdAccountCircle} from 'react-icons/md';
import {MdAddCircle} from 'react-icons/md';


export default function ListaPacientes() {
    return(
        <div>


            <a class="novo" href="http://localhost:3000/" role="button" > <MdAddCircle size={30}/> Novo Paciente</a> 

            <div class="paraEspecifico">
                <button>
                    <div class="AccountCircleIcon">
                        <MdAccountCircle size={150}/>
                    </div>
                    <div class="linha">
                        <div class="nome">
                            Ricardo
                        </div>
                        <div class="idade">
                            Idade
                        </div>
                        <div class="celular">
                            número celular
                        </div>
                        <div class="email">
                            exemplo@email.com
                        </div>                        
                    </div>
                </button>
                <button>
                    <div class="AccountCircleIcon">
                        <MdAccountCircle size={150}/>
                    </div>
                    <div class="linha">
                        <div class="nome">
                            Fernando
                        </div>
                        <div class="idade">
                            Idade
                        </div>
                        <div class="celular">
                            número celular
                        </div>
                        <div class="email">
                            exemplo@email.com
                        </div>                        
                    </div>
                </button>
            </div>
        </div>
    )
}