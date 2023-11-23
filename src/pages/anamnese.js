import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import dataService from "../services/dataService";

let pacienteAtualNome = null

export default function anamnese() {
    const navigate = useNavigate()

    const { nomePaciente, codAnam } = useParams()
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

                setPacientes(response.data)
                console.log('paciente: ', response)
            })
            .catch(error => {
                erroDataService(error)
            });
    }

    function pegaAnamneses() {
        dataService.getAnamnese(codAnam)
            .then(response => {
                console.log('response', response)
                console.log('response.data', response.data)
                console.log('response.data.cirurgia',response.data.cirurgia)
                setCirurgia(response.data.cirurgia)
                setQCirurgia(response.data.qCirurgia)
            })
            .catch(error => {
                erroDataService(error)
            })
    }

    useEffect(() => {

        pegaAnamneses()
        pegaPacientes()

    }, [])




    return (
        <div>

            <h1>Anamnese {nomePaciente}</h1>


            <div className="form-group">
                <input
                    type={"checkbox"}
                    checked={cirurgia}
                    onChange={(e) => setCirurgia(!cirurgia)}
                    disabled
                />
                <label>Fez Cirurgia?</label>
                <label>Qual?</label>
                <input type='text'
                    value={qCirurgia}
                    onChange={(e) => setQCirurgia(e.target.value)}
                    readOnly
                />
            </div>
            <div className="form-group">
                <input
                    type="checkbox"
                    disabled
                />
                <label>Possui alergia a remedio? </label>


                <label>Qual?</label>
                <input
                    type={'text'}
                    readOnly
                />

            </div>
            <div className="form-group">
                <input
                    type="checkbox"
                    disabled
                />
                <label>Possui pressão alta?</label>
            </div>
            <div className="form-group">
                <input
                    type="checkbox"
                    disabled
                />
                <label>Sangra muito em corte?</label>

            </div>
            <div className="form-group">
                <input
                    type='checkbox'
                    disabled
                />
                <label>Alguma mancha rocha?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    disabled
                />
                <label>Cicatrização demorada?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    disabled
                />
                <label>Anemia?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    disabled
                />
                <label>Transfusão de Sangue?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    disabled
                />
                <label>DST?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    disabled
                />
                <label>Tonturas?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    disabled
                />
                <label>Convulsões?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    disabled
                />
                <label>Diabetes?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    disabled
                />
                <label>Fuma?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    disabled
                />
                <label>Alcool?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    disabled
                />
                <label>Asma?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    disabled
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
                    disabled
                />
                <label>Sinusite?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    disabled
                />
                <label>Possui alergia a Peniscilina?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    disabled
                />
                <label>Cancer de Prostata?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    disabled
                />
                <label>Alergia a Iodo?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    disabled
                />
                <label>Dente mole?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    disabled
                />
                <label>Ferida Labio e Lingua?</label>
            </div>

        </div>
    )
}