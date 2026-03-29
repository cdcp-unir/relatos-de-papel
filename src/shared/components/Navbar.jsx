import { Link } from "react-router-dom";
import { PATHS } from "./../../app/router/paths";

const Navbar = () => {
    return (
        <>
            <div className="max-auto">
                <div className="flex-1">
                    <Link className="btn btn-ghost text-3xl font-bold" to={PATHS.HOME}>Relatos de papel</Link>                    
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
                                <span className="badge badge-sm indicator-item">8</span>
                            </div>
                        </div>
                        <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                            <div className="card-body">
                                <span className="text-lg font-bold">8 Items</span>
                                <span className="text-info">Subtotal: $999</span>
                                <div className="card-actions">                                    
                                    <Link to={PATHS.CART} className="btn btn-primary btn-block">Ver carrito</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="avatar avatar-placeholder">
                                <div className="bg-neutral text-neutral-content w-8 rounded-full">
                                    <span className="text-xs">CC</span>
                                </div>
                            </div>                            
                        </div>
                        <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li className="p-4 pb-2 tracking-wide text-xs">Hola Cristian Chiguano</li>
                            <li>                                
                                <Link className="text-xs" to={PATHS.PROFILE}>Perfil</Link>
                            </li>
                            <li>
                                <Link className="text-xs" to={PATHS.CHECKOUT}>Checkout</Link>
                            </li>
                            <li>
                                <Link className="text-xs">Salir</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;