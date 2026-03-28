import './Button.css';

export const Button = ({ children, onClick, type = "button", className = "", isLoading = false }) => (
  <button type={type} onClick={onClick} className={`button ${className}`} disabled={isLoading}>
    {isLoading ? "Cargando..." : children}
  </button>
);
