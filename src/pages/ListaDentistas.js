import './TopNav.css';
import './ListaPacientDent.css';

import {MdAccountCircle} from 'react-icons/md';
import {MdAddCircle} from 'react-icons/md';

export default function ListaDentistas() {
    return(
        <div>
            
            <a class="novo" href="http://localhost:3000/dentista/cadastro" role="button" > <MdAddCircle size={30}/> Novo Dentista</a> 

            <div class="paraEspecifico">
                <a href="./dentista">
                    <button>
                        <div class="AccountCircleIcon">
                            <MdAccountCircle size={150}/>
                        </div>
                        <div class="linha">
                            <div class="nome">
                                Diolete
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
                </a>
                <button>
                    <div class="AccountCircleIcon">
                        <MdAccountCircle size={150}/>
                    </div>
                    <div class="linha">
                        <div class="nome">
                            Ezequiel
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