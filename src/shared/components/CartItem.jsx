import React from "react";

const CartItem = ({ item, onRemove, mostrarBoton = true }) =>
{
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
                        ${item.precio.toFixed(2)}
                    </p>
                </div>
            </div>

            {mostrarBoton && (
                <button
                    onClick={() => onRemove(item.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition w-full sm:w-auto"
                >
                    Quitar
                </button>
            )}

        </li>
    );
};

export default CartItem;
