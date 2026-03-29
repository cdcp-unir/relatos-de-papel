import { Link } from 'react-router';
import { PATHS } from '../../app/router/paths';
import logo from '../../assets/img/logo.png';
import spanish from '../../assets/svg/spanish.svg';

const LanguageSelector = () => (
  <section className="text-md text-white cursor-pointer select-none">
    <span className="hover:underline flex gap-2 items-center">
      <img src={spanish} alt="spanish" className="w-6 h-6" />
      Español
    </span>
  </section>
);

export const Header = () => (
  <Link to={PATHS.LANDING} className="w-full flex justify-between items-center py-4 px-6 no-underline">
    <section className="flex items-center gap-4">
      <img src={logo} alt="logo" className="w-12 h-auto" />
      <p className="text-md font-bold m-0 text-white">Relatos de Papel</p>
    </section>
    <LanguageSelector />
  </Link>
);
