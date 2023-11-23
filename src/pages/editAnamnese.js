import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import dataService from "../services/dataService";

let pacienteAtualNome = null

const EditAnamnese = () => {
    const navigate = useNavigate()

    const { pacienteNome, codPac, codAnam } = useParams()
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
    const [paciente, setPaciente] = useState()

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
                        
                        setPaciente(element)
                    }
                });
                setPacientes(response.data)
                console.log('paciente: ', response)
            })
            .catch(error => {
                erroDataService(error)
            });



    }

    function pegaAnamnese() {
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


        pegaPacientes()
        pegaAnamnese()

    }, [])


    const handleSubmit = (event) => {
        event.preventDefault();

        const anamnese = {
            cirurgia, qCirurgia, alergiaRemedio, qAlergiaRemedio, pressaoAlta, sangraCorte,
            manchasRochas, cicatrizacaoDemorada, anemia, transfusaoSangue, dst, tonturas,
            convulsoes, diabetes, fuma, alcool, asma, bronquite, rinite, sinusite, gastrite,
            alergiaPeniscilina, cancerDeProstata, alergiaIodo, denteMole, feridaLabioeLingua,
            anotacao, paciente
        }


        //update
        dataService.updateAnamnese(codAnam, anamnese)
            .then(response => {
                console.log('Anamnese atualizada', response.data)
                navigate('/')
            })
            .catch(error => {
                erroDataService(error)
            })


    }

    return (
        <div>

            <h1>Anamnese {pacienteAtualNome}</h1>
            <form onSubmit={handleSubmit} >

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="checkbox"
                            checked={cirurgia}
                            onChange={(e) => setCirurgia(!cirurgia)}
                            style={{ marginRight: '5px' }}
                        />
                        <label style={{ marginRight: '5px' }}>Fez Cirurgia?</label>
                    </div>
                    <label>Qual?</label>
                    <input type='text'
                        value={qCirurgia}
                        onChange={(e) => setQCirurgia(e.target.value)}
                    />
                </div>
                {/* <div className="form-group">
                    <input
                        type="checkbox"
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
                    />
                    <label>Possui pressão alta?</label>
                </div>
                <div className="form-group">
                    <input
                        type="checkbox"
                    />
                    <label>Sangra muito em corte?</label>

                </div>
                <div className="form-group">
                    <input
                        type='checkbox'
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
                </div>
                <div className="form-group">
                    <input
                        type='text'
                    />
                    <label>Anotações?</label>
                </div>
                 */}
                <button type="submit" className="btnCadastrar">Salvar</button>
            </form>
        </div>
    )
}

export default EditAnamnese;