export const Button = ({ children, onClick, type = "button", className = "", isLoading = false }) => (
  <button 
    type={type} 
    onClick={onClick} 
    className={`btn ${className}`} 
    disabled={isLoading}
  >
    {isLoading ? "Cargando..." : children}
  </button>
);
