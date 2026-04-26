import React, {useContext} from "react";

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
                            <th>Cantidad</th>
                            <th>Precio unitario</th>
                            <th>Subtotal</th>
                            {mostrarBoton && (<th>Acciones</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((item) => (
                            <tr>
                                <td>{item.titulo}</td>
                                <td>
                                    <div className="flex items-center justify-center space-x-2">
                                        <button onClick={() => decreaseQuantity(item.id)} className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400">
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => increaseQuantity(item.id)} className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400">
                                            +
                                        </button>
                                    </div>
                                </td>
                                <td>{formatCurrency(item.precio)}</td>
                                <td>{formatCurrency(item.subtotal)}</td>
                                {mostrarBoton && (
                                    <td>
                                        <button onClick={() => remove(item.id)} className="btn btn-error px-3 py-1 rounded transition w-full sm:w-auto">Quitar</button>
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
