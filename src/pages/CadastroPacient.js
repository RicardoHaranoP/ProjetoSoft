
import './Cadastro.css';
import api from '../services/api';
import axios from 'axios';



export default function CadastroPacient(){
/*
    constructor(props) {
        super(props);

        this.onChangeNome= this.onChangeNome.bind(this);
 
    
        this.state = {
            id: null,
            nome: ""
          };
    }


    onChangeNome(e) {
        this.setState({
          nome: e.target.value
        });
      }
*/


    function cadastrarPaciente() {
        validateControls();
    }

    function validateControls() {
        //FirstName
        var valor = document.getElementById("fname");
        alert("Você digitou: " + valor);
        /*
        var fname = document.getElementById("fname")
        if (fname == "") {
            window.alert("please enter your first name");
            fname.focus();
            return false;
        }

        getControlValues();
        */
    }

    function getControlValues() {
        alert("First Name= " + fname.value)
    }


/*
    allInput.foreach(input => {
        if(input.value != ""){
            form.classList.add('secActive');
        }else{
            form.classList.remove('secActive');
            alert("input está vazio")
        }
    })*/

    /*
    const response = axios.post('http://localhost:8000/paciente', {
        first_name: 'John Doe',
    });
    console.log(response.data);*/



    api.get('/paciente')
      .then(function (response) {
        // handle success
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })


    return(
        <div className="col p-4 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <div className='w-100 d-flex justify-content-between'>                        
                        <div>
                            

                            <h2 className="mb-4 mt-0">Cadastro Pacientes</h2>

                            <label>Nome:</label>                                        
                            <input id="fname" type="text"  name="firstname"  placeholder="Digite seu nome"></input>
                            <label>CPF:</label>
                            <input type="text" id="cpf" name="cpf"  placeholder="Digite seu CPF"></input>
                            <label>Data de Nascimento:</label>                                        
                            <input type="text" id="dataNascimento" name="dataNascimento" placeholder="Digite sua Data de Nascimento"></input>
                            <label>Celular:</label>
                            <input type="text" id="celular" name="celular"  placeholder="Digite seu número de celular"></input>  
                            <label>email:</label>                                        
                            <input type="text" id="email" name="email" placeholder="Digite seu email"></input>

                            
                            <div>
                                <span>
                                    <a type="button" className='btnCancelar' href='../pacientes'>Cancelar</a>
                                </span>                           
                                <button type="submit" className='btnCadastrar' onClick={cadastrarPaciente()}>Cadastrar</button>
                            </div>
                        </div>
                        
                    </div>           
                </div>
            </div>
        </div>

    )



}