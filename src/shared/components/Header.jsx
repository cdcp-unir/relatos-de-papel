import { Link } from 'react-router';
import logo from '../../assets/img/logo.svg';
import { PATHS } from '../../app/router/paths';
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
  <div className="navbar bg-color-info-content-100 shadow-sm">
  <div className="flex-1">
    <Link className="btn btn-info-content text-xl"> <img src={logo} alt="logo" className="w-12 h-12 text-blue-700 dark:text-white"/>Relatos de papel</Link>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <LanguageSelector />
      <li><a>Link</a></li>
      <li>
        <details>
          <summary>Parent</summary>
          <ul className="bg-base-100 rounded-t-none p-2">
            <li><a>Link 1</a></li>
            <li><a>Link 2</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</div>
);
