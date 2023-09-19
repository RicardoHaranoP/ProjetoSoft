
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import dataService from '../services/dataService';
import { FaTooth } from 'react-icons/fa'
import { BiSquare } from 'react-icons/bi'

let pacienteAtualNome = null

const Odontograma = () => {

    const navigate = useNavigate();
    const { codPac } = useParams();

    const [pacientes, setPacientes] = useState([])

    const primeiraLinha = Array.from({ length: 16 }, (_, index) => index + 1);
    const segundaLinha = Array.from({ length: 16 }, (_, index) => 32 - index);

    const numQuadradosLinha = 16;
    const numQuadradosDente = 5;
    const [cores, setCores] = useState(Array(numQuadradosLinha).fill('white'));
    const [clickCounts, setClickCounts] = useState(Array(numQuadradosLinha).fill(0));
    const numQuadradosLinha2 = 16;
    const [cores2, setCores2] = useState(Array(numQuadradosLinha).fill('white'));


    let clickCount = 0

    const erroDataService = (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("error.data ", error.response.data);
            console.log("error.status ", error.response.status);
            console.log("error.headers ", error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log('error.request', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log('error.config', error.config);
    }

    function pegaPacientes() {

        dataService.getPacientes()
            .then((response) => {

                response.data.forEach(element => {

                    if (element.codPac == codPac) {
                        pacienteAtualNome = element.nome
                    }
                });
                setPacientes(response.data)
                console.log('paciente: ', response)
            })
            .catch(error => {
                erroDataService(error)
            });
    }

    useEffect(() => {

        pegaPacientes()

    }, []);

    const getColor = (index) => {
        const colors = ['white', 'red', 'green', 'black'];
        return colors[index];
    };


    const QuadradosLinha1 = () => {

        const handleQuadradoClick1 = (index) => {
            var elemento = document.getElementsByClassName('quad1');

            if (clickCount === 0) {
                elemento[index].style.backgroundColor = 'green';
            } else if (clickCount === 1) {
                elemento[index].style.backgroundColor = 'red';
            } else if (clickCount === 2) {
                elemento[index].style.backgroundColor = 'black';
            }

            clickCount = (clickCount + 1) % 3;
        };

        const handleQuadradoClick2 = (index) => {
            var elemento = document.getElementsByClassName('quad2');

            if (clickCount === 0) {
                elemento[index].style.backgroundColor = 'green';
            } else if (clickCount === 1) {
                elemento[index].style.backgroundColor = 'red';
            } else if (clickCount === 2) {
                elemento[index].style.backgroundColor = 'black';
            }

            clickCount = (clickCount + 1) % 3;
        };

        const handleQuadradoClick3 = (index) => {
            var elemento = document.getElementsByClassName('quad3');

            if (clickCount === 0) {
                elemento[index].style.backgroundColor = 'green';
            } else if (clickCount === 1) {
                elemento[index].style.backgroundColor = 'red';
            } else if (clickCount === 2) {
                elemento[index].style.backgroundColor = 'black';
            }

            clickCount = (clickCount + 1) % 3;
        };

        const handleQuadradoClick4 = (index) => {
            var elemento = document.getElementsByClassName('quad4');

            if (clickCount === 0) {
                elemento[index].style.backgroundColor = 'green';
            } else if (clickCount === 1) {
                elemento[index].style.backgroundColor = 'red';
            } else if (clickCount === 2) {
                elemento[index].style.backgroundColor = 'black';
            }

            clickCount = (clickCount + 1) % 3;
        };

        const handleQuadradoClick5 = (index) => {
            var elemento = document.getElementsByClassName('quad5');

            if (clickCount === 0) {
                elemento[index].style.backgroundColor = 'green';
            } else if (clickCount === 1) {
                elemento[index].style.backgroundColor = 'red';
            } else if (clickCount === 2) {
                elemento[index].style.backgroundColor = 'black';
            }

            clickCount = (clickCount + 1) % 3;
        };

        

            return (<>
                {
                    cores.map((cor, index) => (

                        <div className='coluna'>

                            <div className='linha'>

                                <div
                                    className="quadrado quad1"
                                    onClick={() => handleQuadradoClick1(index)}
                                    style={{ cursor: 'pointer', marginLeft: '15px' }}
                                ></div>

                            </div>


                            <div className='linha'>
                                <div
                                    className="quadrado quad3"
                                    onClick={() => handleQuadradoClick3(index)}
                                    style={{ cursor: 'pointer' }}
                                ></div>
                                <div
                                    className="quadrado quad4"
                                    onClick={() => handleQuadradoClick4(index)}
                                    style={{ cursor: 'pointer' }}
                                ></div>
                                <div
                                    className="quadrado quad5"
                                    onClick={() => handleQuadradoClick5(index)}
                                    style={{ cursor: 'pointer' }}
                                ></div>
                            </div >


                            <div
                                className="quadrado quad2"
                                onClick={() => handleQuadradoClick2(index)}
                                style={{ cursor: 'pointer', marginLeft: '15px' }}
                            ></div>

                        </div>
                    ))
                }
            </>

            );
        };

        const QuadradosLinha2 = () => {

            const handleQuadradoClick1 = (index) => {
                var elemento = document.getElementsByClassName('quad6');
    
                if (clickCount === 0) {
                    elemento[index].style.backgroundColor = 'green';
                } else if (clickCount === 1) {
                    elemento[index].style.backgroundColor = 'red';
                } else if (clickCount === 2) {
                    elemento[index].style.backgroundColor = 'black';
                }
    
                clickCount = (clickCount + 1) % 3;
            };
    
            const handleQuadradoClick2 = (index) => {
                var elemento = document.getElementsByClassName('quad7');
    
                if (clickCount === 0) {
                    elemento[index].style.backgroundColor = 'green';
                } else if (clickCount === 1) {
                    elemento[index].style.backgroundColor = 'red';
                } else if (clickCount === 2) {
                    elemento[index].style.backgroundColor = 'black';
                }
    
                clickCount = (clickCount + 1) % 3;
            };
    
            const handleQuadradoClick3 = (index) => {
                var elemento = document.getElementsByClassName('quad8');
    
                if (clickCount === 0) {
                    elemento[index].style.backgroundColor = 'green';
                } else if (clickCount === 1) {
                    elemento[index].style.backgroundColor = 'red';
                } else if (clickCount === 2) {
                    elemento[index].style.backgroundColor = 'black';
                }
    
                clickCount = (clickCount + 1) % 3;
            };
    
            const handleQuadradoClick4 = (index) => {
                var elemento = document.getElementsByClassName('quad9');
    
                if (clickCount === 0) {
                    elemento[index].style.backgroundColor = 'green';
                } else if (clickCount === 1) {
                    elemento[index].style.backgroundColor = 'red';
                } else if (clickCount === 2) {
                    elemento[index].style.backgroundColor = 'black';
                }
    
                clickCount = (clickCount + 1) % 3;
            };
    
            const handleQuadradoClick5 = (index) => {
                var elemento = document.getElementsByClassName('quad10');
    
                if (clickCount === 0) {
                    elemento[index].style.backgroundColor = 'green';
                } else if (clickCount === 1) {
                    elemento[index].style.backgroundColor = 'red';
                } else if (clickCount === 2) {
                    elemento[index].style.backgroundColor = 'black';
                }
    
                clickCount = (clickCount + 1) % 3;
            };
    
            
    
                return (<>
                    {
                        cores.map((cor, index) => (
    
                            <div className='coluna'>
    
                                <div className='linha'>
    
                                    <div
                                        className="quadrado quad6"
                                        onClick={() => handleQuadradoClick1(index)}
                                        style={{ cursor: 'pointer', marginLeft: '15px' }}
                                    ></div>
    
                                </div>
    
    
                                <div className='linha'>
                                    <div
                                        className="quadrado quad8"
                                        onClick={() => handleQuadradoClick3(index)}
                                        style={{ cursor: 'pointer' }}
                                    ></div>
                                    <div
                                        className="quadrado quad9"
                                        onClick={() => handleQuadradoClick4(index)}
                                        style={{ cursor: 'pointer' }}
                                    ></div>
                                    <div
                                        className="quadrado quad10"
                                        onClick={() => handleQuadradoClick5(index)}
                                        style={{ cursor: 'pointer' }}
                                    ></div>
                                </div >
    
    
                                <div
                                    className="quadrado quad7"
                                    onClick={() => handleQuadradoClick2(index)}
                                    style={{ cursor: 'pointer', marginLeft: '15px' }}
                                ></div>
    
                            </div>
                        ))
                    }
                </>
    
                );
            };


        function changeModal() {
            modal.classList.toggle('hide')
            fade.classList.toggle('hide')
        }

        return (
            <>
                <div className="col p-4 overflow-auto h-100">
                    <div className="row">
                        <div className="col-12">
                            <button className='helpButton' onClick={changeModal}>?</button>
                            <div id='fade' className='hide' ></div>
                            <div id='modal' className='hide'>
                                <div className='modal-header'>
                                    <h2>Help</h2>
                                    <button id='close-modal' className='fechar-modal' onClick={changeModal}>Fechar</button>
                                </div>
                                <div className='modal-body'>
                                    <ul>
                                        <li><p>Esta é a página do odontograma do paciente selecionado</p></li>
                                    </ul>
                                </div>
                            </div>
                            <h2 className="mb-5 mt-0">Odontograma {pacienteAtualNome} </h2>
                            <div className="number-line">
                                {primeiraLinha.map((number) => (
                                    <span key={number} className="number">
                                        {number}
                                    </span>
                                ))}
                            </div>
                            <div className='number-line'>

                                {QuadradosLinha1()}

                            </div>

                            <div className='number-line'>
                                {QuadradosLinha2()}
                            </div>
                            <div className="number-line">
                                {segundaLinha.map((number) => (
                                    <span key={number} className="number">
                                        {number}
                                    </span>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </>

        )
    }

    export default Odontograma;