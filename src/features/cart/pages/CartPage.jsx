import React, { useContext } from "react";

import CartItem from "../../../shared/components/CartItem"
import { GlobalContext } from "../../../shared/context/GlobalContext";
import { PATHS } from "../../../app/router/paths";
import { currencyFormat } from "../../../shared/hooks/useCurrencyFormat";
import { useNavigate } from "react-router-dom";

const CartPage = () => {

    const { cart } = useContext(GlobalContext);
    const total = cart.reduce((sum, item) => sum + item.precio, 0);
    const navigate = useNavigate();
    const { formatCurrency } = currencyFormat();

    return (
        <>
            <div className="max-w-4xl mx-auto shadow-md rounded-lg p-6 w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Carrito</h2>

                {cart.length === 0 ? (
                    <p className="text-center text-gray-600">Tu carrito está vacío.</p>
                ) : (
                    <>
                        <CartItem books={cart} mostrarBoton={true} />
                    </>
                )}

                <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <p className="font-bold text-lg text-center md:text-left">
                        Total: {formatCurrency(total)}
                    </p>
                    <button onClick={() => navigate(PATHS.CHECKOUT)} className="w-full md:w-auto btn btn-primary font-semibold py-2 px-6 rounded-md transition">
                        Ir a pagar
                    </button>
                </div>

            </div>
        </>

    );
};

export default CartPage;
