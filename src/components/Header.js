import '../styles.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return(
        <header className="container-fluid d-flex">
            <div className="d-flex align-items-center">
                <div className="faixa">
                    <a href="/">Home</a>
                    <a href="/dentistas">Dentistas</a>
                    <a href="/pacientes">Pacientes</a>
                </div>
                <div className='btn-login d-flex justify-content-end' >
                    <a href='/login' >Login</a>
                </div>
            </div>
            
        </header>
    )
};

export default Header;