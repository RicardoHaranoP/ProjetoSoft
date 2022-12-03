
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import dataService from '../services/dataService';
import './PacientDent.css';

const Dentista = () => {

    const navigate = useNavigate();
    const {codDent} = useParams();

    const [nome,setNome] = useState('');
    const [email,setEmail]=useState('');
    const [dataNasc,setDataNasc]=useState('');
    const [celular,setCelular]=useState('');
    const [cro,setCro]=useState('');

    useEffect(() => {
        //Runs only on the first render
        dataService.getDentista(codDent)
        .then(response => {
            setNome(response.data.nome);
            setEmail(response.data.email);
            setDataNasc(response.data.dataNasc);
            setCelular(response.data.celular);
            setCro(response.data.cro);
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
                        <div>
                            <h2 className="mb-5 mt-0">Informações do Dentista</h2>
                            <div>
                               
                                <li className='m-3 fs-4'><b>Nome:</b><br/> {nome}<br/></li>
                                <li className='m-3 fs-4'><b>Email:</b><br/> {email}<br/></li>
                                <li className='m-3 fs-4'><b>cro:</b><br/> {cro}<br/></li>
                                <li className='m-3 fs-4'><b>Data de Nascimento:</b><br/> {dataNasc}<br/></li>
                                <li className='m-3 fs-4'><b>Celular:</b><br/> {celular}<br/></li>

                                <div>
                                    <Link to={`../dentista/agendamento/${codDent}`} type='button' className="btnAgenda position-absolute top-50 start-50">Agenda</Link>
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

export default Dentista;