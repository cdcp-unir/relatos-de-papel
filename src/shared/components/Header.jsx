import { Link } from 'react-router';
import logo from '../../assets/img/logo.png';
import './Header.css';
import { PATHS } from '../../app/router/paths';


const LanguageSelector = () => (
  <section className="language-selector">
    <span>Español</span>
  </section>
);

export const Header = () => (
  <Link to={PATHS.LANDING} className="header">
    <section className="header-logo">
      <img src={logo} alt="logo" />
      <p>Relatos de Papel</p>
    </section>
    <LanguageSelector />
  </Link>
);
