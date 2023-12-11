
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import dataService from '../services/dataService';
import { MdAddCircle } from 'react-icons/md';

let pacienteAtualNome = null

const Odontograma = () => {

    const navigate = useNavigate();
    const { codPac } = useParams();


    const [pacientes, setPacientes] = useState([])
    const [odontograma, setOdontograma] = useState([])

    const primeiraLinha = Array.from({ length: 16 }, (_, index) => index + 1);
    const segundaLinha = Array.from({ length: 16 }, (_, index) => index + 17);

    const numQuadradosLinha = 16;
    const [cores, setCores] = useState(Array(numQuadradosLinha).fill('white'));


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

    async function pegaOdontogramas() {
        try {
            const response = await dataService.getOdontogramas()

            console.log('Odontograma: ', response)
            // setOdontograma(response.data)
            console.log(response.data[0])

            response.data.forEach(element => {
                if (element.codPac == codPac) {
                    setOdontograma((prevState) => [...prevState, element])
                }
            })

        }
        catch (error) {
            erroDataService(error)
        };
    }

    function colocaNoOdontograma() {
        console.log('vei ', odontograma)
        odontograma.forEach(element => {
            console.log('element', element)

            let elementoDente = document.getElementById(`coluna${element.quadrante}${element.dente}`)
            console.log('elemento dente', elementoDente)
            console.log('element.face ', element.face)

            let elementoFace = elementoDente.querySelector(`.quad${element.face}`)
            let numFace = parseFloat(element.face) + 5
            if (!elementoFace) {
                let aux = elementoDente.querySelectorAll('.linha')
                elementoFace = aux[0].querySelector(`.quad${numFace}`)

                if (!elementoFace) {
                    elementoFace = aux[1].querySelector(`.quad${numFace}`)
                }

                console.log(' ajdfsadsfadxf ', aux)
            }
            console.log('ElementoDente: ', elementoDente)
            console.log('ElementoFace: ', elementoFace)

            console.log('situacao', element.situacao)
            if (element.situacao == 'Concluido' || element.situacao == 'Concluído') {
                elementoFace.style.backgroundColor = 'green'
            } else {
                elementoFace.style.backgroundColor = 'red'
            }
        })

    }


    useEffect(() => {

        pegaPacientes();
        pegaOdontogramas();

    }, []);

    useEffect(() => {

        if (odontograma) {

            colocaNoOdontograma()
        }

    }, [odontograma]);


    const QuadradosLinha1 = () => {



        return (<>
            {
                cores.map((cor, index) => (

                    <div id={`coluna${index + 1}`} className='coluna'>

                        <div className='linha'>

                            <div
                                className=" quad1"
                                style={{ marginLeft: '15px' }}
                            ></div>

                        </div>


                        <div className='linha'>
                            <div
                                className=" quad3"
                            ></div>
                            <div
                                className=" quad4"
                            ></div>
                            <div
                                className=" quad5"
                            ></div>
                        </div >

                        <div className='linha'>
                            <div
                                className=" quad2"
                                style={{ marginLeft: '15px' }}
                            ></div>
                        </div>


                    </div>
                ))
            }
        </>

        );
    };



    const NumberLine = ({ start, end }) => {
        const generateNumberLine = () => {
            let line = '';

            if (start > end) {
                for (let i = start; i >= end; i--) {

                    line += i + ' ';
                }
                return line.trim();
            } else {

                for (let i = start; i <= end; i++) {
                    line += i + ' ';
                }
                return line.trim();
            }
        };

        return (
            <div>
                {generateNumberLine().split(' ').map((number, index) => (
                    <span key={index} style={{ margin: '22px' }}>
                        {number}
                    </span>
                ))}
            </div>
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
                        <div>
                            <a className="novo" href={`http://localhost:3000/paciente/${codPac}/odontograma/cadastro`} role="button" > <MdAddCircle size={30} /> Incluir novo Procedimento no Odontograma</a>
                        </div><br /><br /><br /><br />
                        <div style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex' }}>
                                <NumberLine start={18} end={11} />
                                <NumberLine start={21} end={28} />
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div id={`coluna18`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>


                                    <div className='linha'>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                        <div
                                            className="quadrado quad5"
                                        ></div>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna17`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>


                                    <div className='linha'>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                        <div
                                            className="quadrado quad5"
                                        ></div>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna16`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>


                                    <div className='linha'>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                        <div
                                            className="quadrado quad5"
                                        ></div>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna15`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>


                                    <div className='linha'>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                        <div
                                            className="quadrado quad5"
                                        ></div>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna14`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>


                                    <div className='linha'>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                        <div
                                            className="quadrado quad5"
                                        ></div>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna13`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>


                                    <div className='linha'>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                        <div
                                            className="quadrado quad5"
                                        ></div>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna12`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>


                                    <div className='linha'>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                        <div
                                            className="quadrado quad5"
                                        ></div>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna11`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>


                                    <div className='linha'>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                        <div
                                            className="quadrado quad5"

                                        ></div>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna21`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>


                                    <div className='linha'>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                        <div
                                            className="quadrado quad5"

                                        ></div>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna22`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>


                                    <div className='linha'>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                        <div
                                            className="quadrado quad5"

                                        ></div>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna23`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>


                                    <div className='linha'>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                        <div
                                            className="quadrado quad5"

                                        ></div>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna24`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>


                                    <div className='linha'>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                        <div
                                            className="quadrado quad5"

                                        ></div>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna25`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                        <div
                                            className="quadrado quad5"

                                        ></div>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                    </div >
                                    <div className='linha'>
                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna26`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>


                                    <div className='linha'>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                        <div
                                            className="quadrado quad5"

                                        ></div>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna27`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                        <div
                                            className="quadrado quad5"

                                        ></div>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                    </div >
                                    <div className='linha'>
                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna28`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                        <div
                                            className="quadrado quad5"

                                        ></div>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                            </div>

                            <div style={{ display: 'flex' }}>
                                <div id={`coluna48`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>


                                    <div className='linha'>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                        <div
                                            className="quadrado quad5"

                                        ></div>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna47`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                        <div
                                            className="quadrado quad5"

                                        ></div>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                    </div >
                                    <div className='linha'>
                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna46`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>


                                    <div className='linha'>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                        <div
                                            className="quadrado quad5"

                                        ></div>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna45`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>


                                    <div className='linha'>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                        <div
                                            className="quadrado quad5"

                                        ></div>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna44`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>


                                    <div className='linha'>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                        <div
                                            className="quadrado quad5"

                                        ></div>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna43`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>


                                    <div className='linha'>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                        <div
                                            className="quadrado quad5"

                                        ></div>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna42`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>


                                    <div className='linha'>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                        <div
                                            className="quadrado quad5"

                                        ></div>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna41`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                        <div
                                            className="quadrado quad5"

                                        ></div>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna31`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>


                                    <div className='linha'>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                        <div
                                            className="quadrado quad5"

                                        ></div>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna32`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>


                                    <div className='linha'>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                        <div
                                            className="quadrado quad5"

                                        ></div>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna33`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>


                                    <div className='linha'>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                        <div
                                            className="quadrado quad5"

                                        ></div>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna34`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>


                                    <div className='linha'>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                        <div
                                            className="quadrado quad5"

                                        ></div>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna35`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>


                                    <div className='linha'>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                        <div
                                            className="quadrado quad5"

                                        ></div>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna36`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>


                                    <div className='linha'>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                        <div
                                            className="quadrado quad5"

                                        ></div>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna37`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>


                                    <div className='linha'>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                        <div
                                            className="quadrado quad5"

                                        ></div>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                    </div >

                                    <div className='linha'>
                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                                <div id={`coluna38`} className='coluna'>

                                    <div className='linha'>

                                        <div
                                            className="quadrado quad2"
                                            style={{ marginLeft: '15px' }}
                                        ></div>

                                    </div>


                                    <div className='linha'>
                                        <div
                                            className="quadrado quad4"
                                        ></div>
                                        <div
                                            className="quadrado quad5"

                                        ></div>
                                        <div
                                            className="quadrado quad3"
                                        ></div>
                                    </div >
                                    <div className='linha'>
                                        <div
                                            className="quadrado quad1"
                                            style={{ marginLeft: '15px' }}
                                        ></div>
                                    </div>


                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <NumberLine start={48} end={41} />
                                <NumberLine start={31} end={38} />
                            </div>
                        </div>
                        <div>

                            {QuadradosLinha1()}

                        </div>

                        <div className='legenda'>
                            <div style={{ display: "flex" }}>
                                <div className="quadrado" style={{ margin: "10px", backgroundColor: "green" }}></div>
                                <span>Concluido</span>
                            </div>
                            <div style={{ display: "flex" }}>
                                <div className="quadrado" style={{ margin: "10px", backgroundColor: "red" }}></div>
                                <span>Em procedimento</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}

export default Odontograma;