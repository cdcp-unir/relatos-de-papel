export const Button = ({ children, onClick, type = "button", className = "", isLoading = false }) => (
  <button 
    type={type} 
    onClick={onClick} 
    className={`btn ${className} rounded-md transition hover:scale-105`} 
    disabled={isLoading}
  >
    {isLoading ? "Cargando..." : children}
  </button>
);
