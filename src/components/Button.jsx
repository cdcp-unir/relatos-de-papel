import './Button.css';

export const Button = ({ children, onClick, type = "button", className = "" }) => (
  <button type={type} onClick={onClick} className={`button ${className}`}>
    {children}
  </button>
);
