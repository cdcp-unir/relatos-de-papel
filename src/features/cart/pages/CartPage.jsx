import React, { useContext } from "react";

import { Button } from "../../../shared/components/Button";
import CartItem from "../../../shared/components/CartItem";
import { GlobalContext } from "../../../shared/context/GlobalContext";
import { PATHS } from "../../../app/router/paths";
import { currencyFormat } from "../../../shared/hooks/useCurrencyFormat";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const { cart, total } = useContext(GlobalContext);    
    const navigate = useNavigate();
    const { formatCurrency } = currencyFormat();    

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
                        <div>
                            <CartItem books={cart} mostrarBoton={true} />
                        </div>
                        <div className="text-right font-semibold text-lg mb-6">
                            <span>Total:</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                        <div className="flex justify-end gap-4 mb-6">
                            <Button
                                onClick={() => navigate(PATHS.CHECKOUT)}
                                className="btn-primary font-semibold py-3 px-6"
                            >
                                Ir a pagar
                            </Button>
                            <Button
                                onClick={() => navigate(PATHS.HOME)}
                                className="btn-soft font-semibold py-3 px-6"
                            >
                                Regresar
                            </Button>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default CartPage;
