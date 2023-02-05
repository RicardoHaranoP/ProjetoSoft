import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import dataService from "../services/dataService";

let pacienteAtualNome = null

export default function anamnese() {
    const navigate = useNavigate()

    const { codPac } = useParams()
    const [pacientes, setPacientes] = useState([])


    const [cirurgia, setCirurgia] = useState(false)
    const [qCirurgia, setQCirurgia] = useState('')
    const [alergiaRemedio, setAlergiaRemedio] = useState(false)
    const [qAlergiaRemedio, setQAlergiaRemedio] = useState('')
    const [pressaoAlta, setPressaoAlta] = useState(false)
    const [sangraCorte, setSangraCorte] = useState(false)
    const [manchasRochas, setManchasRochas] = useState(false)
    const [cicatrizacaoDemorada, setCicatrizacaoDemorada] = useState(false)
    const [anemia, setAnemia] = useState(false)
    const [transfusaoSangue, setTransfusaoSangue] = useState(false)
    const [dst, setDst] = useState(false)
    const [tonturas, setTonturas] = useState(false)
    const [convulsoes, setConvulsoes] = useState(false)
    const [diabetes, setDiabetes] = useState(false)
    const [fuma, setFuma] = useState(false)
    const [alcool, setAlcool] = useState(false)
    const [asma, setAsma] = useState(false)
    const [bronquite, setBronquite] = useState(false)
    const [rinite, setRinite] = useState(false)
    const [sinusite, setSinusite] = useState(false)
    const [gastrite, setGastrite] = useState(false)
    const [alergiaPeniscilina, setAlergiaPeniscilina] = useState(false)
    const [cancerDeProstata, setCancerDeProstata] = useState(false)
    const [alergiaIodo, setAlergiaIodo] = useState(false)
    const [denteMole, setDenteMole] = useState(false)
    const [feridaLabioeLingua, setFeridaLabioeLingua] = useState(false)

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
        if (codPac) {
            dataService.getAnamnese(codPac)
                .then(anamnese => {
                    console.log('anamnese', anamnese)
                    setCirurgia(anamnese.data[anamnese.data.length-1].cirurgia)
                    setQCirurgia(anamnese.data[anamnese.data.length-1].qCirurgia)
                })
                .catch(error => {
                    erroDataService(error)
                })
        }
        pegaPacientes()

    }, [])


    const handleSubmit = (event) => {
        event.preventDefault();

        const anamnese = {
            cirurgia, qCirurgia, alergiaRemedio, qAlergiaRemedio, pressaoAlta, sangraCorte,
            manchasRochas, cicatrizacaoDemorada, anemia, transfusaoSangue, dst, tonturas,
            convulsoes, diabetes, fuma, alcool, asma, bronquite, rinite, sinusite, gastrite,
            alergiaPeniscilina, cancerDeProstata, alergiaIodo, denteMole, feridaLabioeLingua
        }


        //create
        dataService.createAnamnese(codPac,anamnese)
            .then(response => {
                console.log('Anamnese criada', response.data)
                navigate('/')
            })
            .catch(error => {
                erroDataService(error)
            })


    }

    return (
        <div>

            <h1>Anamnese {pacienteAtualNome}</h1>
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <input
                        type={"checkbox"}
                        checked={cirurgia}
                        onChange={(e) => setCirurgia(!cirurgia)}
                    />
                    <label>Fez Cirurgia?</label>
                    <label>Qual?</label>
                    <input type='text'
                    value={qCirurgia}
                    onChange={(e)=> setQCirurgia(e.target.value)}
                    />
                </div>
                {/* <div className="form-group">
                    <input
                        type="checkbox"
                        value={patientInfo.age}
                        onChange={handleInputChange}
                    />
                    <label>Possui alergia a remedio? </label>


                    <label>Qual?</label>
                    <input
                        type={'text'}
                    />

                </div>
                <div className="form-group">
                    <input
                        type="checkbox"
                        value={patientInfo.address}
                        onChange={handleInputChange}
                    />
                    <label>Possui pressão alta?</label>
                </div>
                <div className="form-group">
                    <input
                        type="checkbox"
                        value={patientInfo.phone}
                        onChange={handleInputChange}
                    />
                    <label>Sangra muito em corte?</label>

                </div>
                <div className="form-group">
                    <input
                        type='checkbox'
                        value={patientInfo.symptoms}
                        onChange={handleInputChange}
                    />
                    <label>Alguma mancha rocha?</label>
                </div>
                <div className="form-group">
                    <input
                        type={'checkbox'}
                    />
                    <label>Cicatrização demorada?</label>
                </div>
                <div className="form-group">
                    <input
                        type={'checkbox'}
                    />
                    <label>Anemia?</label>
                </div>
                <div className="form-group">
                    <input
                        type={'checkbox'}
                    />
                    <label>Transfusão de Sangue?</label>
                </div>
                <div className="form-group">
                    <input
                        type={'checkbox'}
                    />
                    <label>DST?</label>
                </div>
                <div className="form-group">
                    <input
                        type={'checkbox'}
                    />
                    <label>Tonturas?</label>
                </div>
                <div className="form-group">
                    <input
                        type={'checkbox'}
                    />
                    <label>Convulsões?</label>
                </div>
                <div className="form-group">
                    <input
                        type={'checkbox'}
                    />
                    <label>Diabetes?</label>
                </div>
                <div className="form-group">
                    <input
                        type={'checkbox'}
                    />
                    <label>Fuma?</label>
                </div>
                <div className="form-group">
                    <input
                        type={'checkbox'}
                    />
                    <label>Alcool?</label>
                </div>
                <div className="form-group">
                    <input
                        type={'checkbox'}
                    />
                    <label>Asma?</label>
                </div>
                <div className="form-group">
                    <input
                        type={'checkbox'}
                    />
                    <label>Bronquite?</label>
                </div>
                <div className="form-group">
                    <input
                        type={'checkbox'}
                    />
                    <label>Rinite?</label>
                </div>
                <div className="form-group">
                    <input
                        type={'checkbox'}
                    />
                    <label>Sinusite?</label>
                </div>
                <div className="form-group">
                    <input
                        type={'checkbox'}
                    />
                    <label>Possui alergia a Peniscilina?</label>
                </div>
                <div className="form-group">
                    <input
                        type={'checkbox'}
                    />
                    <label>Cancer de Prostata?</label>
                </div>
                <div className="form-group">
                    <input
                        type={'checkbox'}
                    />
                    <label>Alergia a Iodo?</label>
                </div>
                <div className="form-group">
                    <input
                        type={'checkbox'}
                    />
                    <label>Dente mole?</label>
                </div>
                <div className="form-group">
                    <input
                        type={'checkbox'}
                    />
                    <label>Ferida Labio e Lingua?</label>
                </div> */}
                <button type="submit" className="btnCadastrar">Salvar</button>
            </form>
        </div>
    )
}