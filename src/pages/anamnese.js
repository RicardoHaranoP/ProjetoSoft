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
    const [anotacao, setAnotacao] = useState('')

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
                setAlergiaRemedio(response.data.alergiaRemedio)
                setQAlergiaRemedio(response.data.qAlergiaRemedio)
                setPressaoAlta(response.data.pressaoAlta)
                setSangraCorte(response.data.sangraCorte)
                setManchasRochas(response.data.manchasRochas)
                setCicatrizacaoDemorada(response.data.cicatrizacaoDemorada)
                setAnemia(response.data.anemia)
                setTransfusaoSangue(response.data.transfusaoSangue)
                setDst(response.data.dst)
                setTonturas(response.data.tonturas)
                setConvulsoes(response.data.convulsoes)
                setDiabetes(response.data.diabetes)
                setFuma(response.data.fuma)
                setAlcool(response.data.alcool)
                setAsma(response.data.asma)
                setBronquite(response.data.bronquite)
                setRinite(response.data.rinite)
                setSinusite(response.data.sinusite)
                setGastrite(response.data.gastrite)
                setAlergiaPeniscilina(response.data.alergiaPeniscilina)
                setCancerDeProstata(response.data.cancerDeProstata)
                setAlergiaIodo(response.data.alergiaIodo)
                setDenteMole(response.data.denteMole)
                setFeridaLabioeLingua(response.data.feridaLabioeLingua)
                setAnotacao(response.data.anotacao)
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
                />
                <label>Fez Cirurgia?</label>
                <label>Qual?</label>
                <input type='text'
                    value={qCirurgia}
                    readOnly
                />
            </div>
            <div className="form-group">
                <input
                    type="checkbox"
                    checked={alergiaRemedio}
                />
                <label>Possui alergia a remedio? </label>


                <label>Qual?</label>
                <input
                    type={'text'}
                    value={qAlergiaRemedio}
                    readOnly
                />

            </div>
            <div className="form-group">
                <input
                    type="checkbox"
                    checked={pressaoAlta}
                />
                <label>Possui pressão alta?</label>
            </div>
            <div className="form-group">
                <input
                    type="checkbox"
                    checked={sangraCorte}
                />
                <label>Sangra muito em corte?</label>

            </div>
            <div className="form-group">
                <input
                    type='checkbox'
                    checked={manchasRochas}
                />
                <label>Alguma mancha rocha?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    checked={cicatrizacaoDemorada}
                />
                <label>Cicatrização demorada?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    checked={anemia}
                />
                <label>Anemia?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    checked={transfusaoSangue}
                />
                <label>Transfusão de Sangue?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    checked={dst}
                />
                <label>DST?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    checked={tonturas}
                />
                <label>Tonturas?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    checked={convulsoes}
                />
                <label>Convulsões?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    checked={diabetes}
                />
                <label>Diabetes?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    checked={fuma}
                />
                <label>Fuma?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    checked={alcool}
                />
                <label>Alcool?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    checked={asma}
                />
                <label>Asma?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    checked={bronquite}
                />
                <label>Bronquite?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    checked={rinite}
                />
                <label>Rinite?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    checked={sinusite}
                />
                <label>Sinusite?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    checked={alergiaPeniscilina}
                />
                <label>Possui alergia a Peniscilina?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    checked={cancerDeProstata}
                />
                <label>Cancer de Prostata?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    checked={alergiaIodo}
                />
                <label>Alergia a Iodo?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    checked={denteMole}
                />
                <label>Dente mole?</label>
            </div>
            <div className="form-group">
                <input
                    type={'checkbox'}
                    checked={feridaLabioeLingua}
                />
                <label>Ferida Labio e Lingua?</label>
            </div>
            <div className="form-group">
            <label>Anotações?</label>
                    <input
                        type='text'
                        value={anotacao}
                    />
                    
                </div>

        </div>
    )
}