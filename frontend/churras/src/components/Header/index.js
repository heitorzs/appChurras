import './style.css';
import logo from './img/trinca.png';
import { Link } from 'react-router-dom';


function Header() {
    return (
        <section >
                <Link to="/">
                    <img src={logo} alt="logo" className="img-logo"></img>
                </Link>
                <h1>OS CHURRAS DA TRINCA</h1>
        </section>
    )
}

export default Header;

