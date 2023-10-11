import { useState } from 'react'
import '../css/Home.css'

export default function Home() {

    function changeModal() {
        modal.classList.toggle('hide')
        fade.classList.toggle('hide')
    }

    return (
        <div className="container">
            <button className='helpButton' onClick={changeModal}>?</button>
            <div id='fade' className='hide' ></div>
            <div id='modal' className='hide'>
                <div className='modal-header'>
                    <h2>Help</h2>
                    <button id='close-modal' className='fechar-modal' onClick={changeModal}>Fechar</button>
                </div>
                <div className='modal-body'>
                    <ul>
                        <li><p>Esta é a página inicial do sistema</p></li>
                        <li><p>O botão 'Marcar Consulta' vai para uma página para cadastrar uma consulta</p></li>
                        <li><p>O botão 'Dentistas' vai para uma página com os dentistas registrados</p></li>
                        <li><p>O botão 'Pacientes' vai para uma página com os pacientes registrados</p></li>
                    </ul>
                </div>
            </div>
            <a href="/consulta" role="button">Marcar Consulta</a>

            <a href="./dentistas" role="button">Dentistas</a>

            <a href="./pacientes" role="button">Pacientes</a>

            <a href="./cadastroProcedimentos" role="button">Procedimentos</a>
        </div>
    )
}