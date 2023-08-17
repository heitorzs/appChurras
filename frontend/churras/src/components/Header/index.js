import './style.css';
import logo from './img/trinca.png';
import { Link } from 'react-router-dom';


function Header() {
    return (
        <section>
            <Link to="/">
                <img src={logo} alt="logo" className="img-logo"></img>
            </Link>
            <div className="App-header">
                <ul>
                    <li>A empresa</li>
                    <li>Churrascos</li>
                    <li>Contato</li>
                </ul>
            </div>
        </section>
    )
}

export default Header;

