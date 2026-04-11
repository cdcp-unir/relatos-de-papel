import React from "react";
import {currencyFormat} from "../hooks/useCurrencyFormat";

const CartItem = ({ item, onRemove, mostrarBoton = true }) =>
{
const {formatCurrency} = currencyFormat(); 

    return (
        <li className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-3 gap-3">

            <div className="flex items-center gap-3">
                <img
                    src={item.imagen}
                    alt={item.titulo}
                    className="w-20 h-28 object-cover rounded shadow sm:w-14 sm:h-20"
                />
                <div>
                    <p className="font-medium">{item.titulo}</p>
                    <p className="text-sm text-gray-600">{item.descripcion}</p>
                    <p className="text-sm font-semibold text-green-700">
                        {formatCurrency(item.precio)}
                    </p>
                </div>
            </div>

            {mostrarBoton && (
                <button
                    onClick={() => onRemove(item.id)}
                    className="btn btn-accent px-3 py-1 rounded transition w-full sm:w-auto"
                >
                    Quitar
                </button>
            )}

        </li>
    );
};

export default CartItem;
