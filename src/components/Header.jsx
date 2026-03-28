import logo from '../assets/img/logo.png';
import './Header.css';


const LanguageSelector = () => (
  <section className="language-selector">
    <span>Español</span>
  </section>
);

export const Header = () => (
  <header className="header">
    <section className="header-logo">
      <img src={logo} alt="logo" />
      <p>Relatos de Papel</p>
    </section>
    <LanguageSelector />
  </header>
);
