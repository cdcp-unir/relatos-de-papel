import { Link, useNavigate } from "react-router-dom";

import { Button } from "./Button";
import { PATHS } from "../../app/router/paths";
import spanish from "../../assets/svg/spanish.svg";

const LanguageSelector = () => (
  <div className="dropdown dropdown-end">
    <label tabIndex={0} className="btn btn-ghost gap-2">
      <img src={spanish} alt="Español" className="w-6 h-6" />
      <span className="hidden sm:inline">Español</span>
    </label>
    <ul
      tabIndex={0}
      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
    >
      <li><a>Español</a></li>
      <li><a>English</a></li>
    </ul>
  </div>
);

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 bg-base-100 border-b border-base-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link className="flex items-center gap-2 cursor-pointer">
            <span className="text-xl font-bold tracking-tight">
              Relatos <span className="text-primary">de Papel</span>
            </span>
          </Link>
          <div className="flex-none flex items-center gap-4">
            <LanguageSelector />
            <Button
              className="btn btn-accent"
              onClick={() => navigate(PATHS.LOGIN)}
            >
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
