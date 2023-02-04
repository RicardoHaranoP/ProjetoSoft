
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import dataService from '../services/dataService';
import './PacientDent.css';

const Paciente = () => {

    const navigate = useNavigate();
    const {codPac} = useParams();

    const [nome,setNome] = useState('');
    const [email,setEmail]=useState('');
    const [dataNasc,setDataNasc]=useState('');
    const [celular,setCelular]=useState('');
    const [cpf,setCpf]=useState('');

    useEffect(() => {
        //Runs only on the first render
        dataService.getPaciente(codPac)
        .then(response => {
            let data = new Date(response.data.dataNasc)
            data.setDate(data.getDate() + 2);
            response.data.dataNasc = data.toLocaleDateString('pt-BR',{
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            setNome(response.data.nome);
            setEmail(response.data.email);
            setDataNasc(response.data.dataNasc);
            setCelular(response.data.celular);
            setCpf(response.data.cpf);
            console.log(response.data.nome);
            console.log('método get realizado com sucesso',response.data)
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
    }, []);

    return(
        <>
         <div className="col p-4 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <div className='w-100 d-flex justify-content-between'>
                        <div className='d-inline'>
                            <h2 className="mb-5 mt-0">Informações do Paciente</h2>
                            <div>
                               
                                <li className='m-3 fs-4'><b>Nome:</b><br/> {nome}<br/></li>
                                <li className='m-3 fs-4'><b>Email:</b><br/> {email}<br/></li>
                                <li className='m-3 fs-4'><b>CPF:</b><br/> {cpf}<br/></li>
                                <li className='m-3 fs-4'><b>Data de Nascimento:</b><br/> {dataNasc}<br/></li>
                                <li className='m-3 fs-4'><b>Celular:</b><br/> {celular}<br/></li>

                                <div>
                                    <Link to={`../paciente/anamnese/${codPac}`} type='button' className="btnAgenda position-absolute top-50 start-50">Anamnese</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>

    )
}

export default Paciente;