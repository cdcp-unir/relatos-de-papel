import React, { useContext } from "react";

import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import { PATHS } from "./../../app/router/paths";
import { avatar } from "../hooks/avatar";
import { currencyFormat } from "../hooks/useCurrencyFormat";
import { useLoginState } from "../../state/loginState";

const Navbar = () => {

    const { formatCurrency } = currencyFormat();
    const { initials } = avatar("Cristian", "Chiguano");
    const { isAuthenticated } = useLoginState();
    const { cart } = useContext(GlobalContext);

    return (
        <>
            <div className="sticky top-0 z-50 bg-base-100 border-b border-base-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to={PATHS.HOME} className="flex items-center gap-2 cursor-pointer">
                            <span className="text-xl font-bold tracking-tight">
                                Relatos <span className="text-primary">de Papel</span>
                            </span>
                        </Link>
                        <div className="flex items-center gap-4">
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                    <div className="indicator">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 
                      2.293c-.63.63-.184 1.707.707 1.707H17m0 
                      0a2 2 0 100 4 2 2 0 000-4zm-8 
                      2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <span className="badge badge-sm indicator-item bg-primary text-white">{cart.length}</span>
                                    </div>
                                </div>
                                <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 mt-3 w-56 shadow-lg">
                                    <div className="card-body">
                                        <span className="text-sm font-semibold">{cart.length} Items</span>
                                        <span className="text-xs opacity-70">Subtotal: {formatCurrency(cart.reduce((sum, item) => sum + item.subtotal, 0))}</span>
                                        <div className="card-actions mt-2">
                                            <Link to={PATHS.CART} className="btn btn-primary btn-sm w-full">Ver carrito</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                isAuthenticated ?
                                    <div className="dropdown dropdown-end">
                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                            <div className="w-8 rounded-full bg-primary text-white flex items-center justify-center">
                                                <span className="text-xs font-bold">{initials}</span>
                                            </div>
                                        </div>
                                        <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow-lg">
                                            <li className="px-2 py-1 text-xs opacity-70">Hola Cristian Chiguano</li>
                                            <li><Link className="text-xs" to={PATHS.PROFILE}>Perfil</Link></li>
                                            <li><Link className="text-xs" to={PATHS.CHECKOUT}>Checkout</Link></li>
                                            <li><Link className="text-xs text-error">Salir</Link></li>
                                        </ul>
                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
