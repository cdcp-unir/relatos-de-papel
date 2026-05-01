import React, {useContext} from "react";

import {Button} from './Button';
import { GlobalContext } from "../context/GlobalContext";
import { currencyFormat } from "../hooks/useCurrencyFormat";

const CartItem = ({ books, mostrarBoton = true }) => {
    const { formatCurrency } = currencyFormat();
    const { decreaseQuantity, increaseQuantity, remove } = useContext(GlobalContext);    

    return (
        <>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    <thead className="bg-accent">
                        <tr>
                            <th>Libro</th>
                            <th className="text-center">Cantidad</th>
                            <th className="text-center">Precio unitario</th>
                            <th className="text-center">Subtotal</th>
                            {mostrarBoton && (<th className="text-center">Acciones</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((item) => (
                            <tr>
                                <td>{item.titulo}</td>
                                <td>
                                    <div className="flex items-center justify-center space-x-2">
                                        {mostrarBoton && (
                                            <button onClick={() => decreaseQuantity(item.id)} className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400">
                                                -
                                            </button>
                                        )}
                                        <span>{item.quantity}</span>
                                        {mostrarBoton && (
                                            <button onClick={() => increaseQuantity(item.id)} className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400">
                                            +
                                        </button>)}
                                    </div>
                                </td>
                                <td className="text-right">{formatCurrency(item.precio)}</td>
                                <td className="text-right">{formatCurrency(item.subtotal)}</td>
                                {mostrarBoton && (
                                    <td className="text-center">
                                        <Button onClick={() => remove(item.id)} className="btn-error px-3 py-1">Quitar</Button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CartItem;
