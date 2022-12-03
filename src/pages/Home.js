import './Home.css'

export default function Home() {
    return(
        <div className="container">

            <a href="/consulta" role="button">Marcar Consulta</a> 

            <a href="./dentistas" role="button">Dentistas</a> 

            <a href="./pacientes" role="button">Pacientes</a> 
        </div>
    )
}