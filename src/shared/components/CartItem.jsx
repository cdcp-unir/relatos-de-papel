import React from "react";
import { currencyFormat } from "../hooks/useCurrencyFormat";

const CartItem = ({ books, mostrarBoton = true }) => {
    const { formatCurrency } = currencyFormat();

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
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((item) => (
                            <tr>
                                <td>{item.titulo}</td>
                                <td>{item.quantity}</td>
                                <td>{formatCurrency(item.precio)}</td>
                                <td>{formatCurrency(item.subtotal)}</td>
                                <td>
                                    {mostrarBoton && (
                                        <button className="btn btn-error px-3 py-1 rounded transition w-full sm:w-auto">Quitar</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CartItem;
