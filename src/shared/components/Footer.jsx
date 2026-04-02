import ThemeToggle from "./ThemeToggle";

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal bg-base-300 text-base-content p-10">            
            <nav>
                <h6 className="footer-title">Servicios</h6>
                <a className="link link-hover">Quienes somos</a>
                <a className="link link-hover">Nuestras librerías</a>
                <a className="link link-hover">Entregas a domicilio</a>
                <a className="link link-hover">Facturación electrónica</a>
            </nav>                  
            <div>
                <h6 className="footer-title">Tema</h6>
                <ThemeToggle />
            </div>            
            <div className="col-span-full mt-6 border-t border-base-200 pt-4 text-center text-sm opacity-70">
                © 2026 Relatos de papel. Todos los derechos reservados.
            </div>
        </footer>
    );
};

export default Footer;
