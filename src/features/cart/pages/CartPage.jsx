import React, { useContext } from "react";

import CartItem from "../../../shared/components/CartItem";
import { GlobalContext } from "../../../shared/context/GlobalContext";
import { PATHS } from "../../../app/router/paths";
import { currencyFormat } from "../../../shared/hooks/useCurrencyFormat";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const { cart } = useContext(GlobalContext);
    const total = cart.reduce((sum, item) => sum + item.precio, 0);
    const navigate = useNavigate();
    const { formatCurrency } = currencyFormat();
    const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-8 text-center">Tu Carrito</h2>

            {cart.length === 0 ?
                (
                    <div className="bg-gray-50 p-6 rounded-lg shadow text-center">
                        <p className="text-gray-600">Tu carrito está vacío.</p>
                    </div>
                ) :
                (
                    <div className="flex flex-col gap-4">
                        <div className="bg-white shadow rounded-lg p-4">
                            <CartItem books={cart} mostrarBoton={true} />
                        </div>
                        <div className="text-right font-semibold text-lg mb-6">
                            <span>Total:</span>
                            <span>{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-end gap-4 mb-6">
                            <button
                                onClick={() => navigate(PATHS.CHECKOUT)}
                                className="btn btn-primary font-semibold py-3 px-6 rounded-md transition hover:scale-105"
                            >
                                Ir a pagar
                            </button>
                            <button
                                onClick={() => navigate(PATHS.HOME)}
                                className="btn btn-soft font-semibold py-3 px-6 rounded-md transition hover:scale-105"
                            >
                                Regresar
                            </button>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default CartPage;
