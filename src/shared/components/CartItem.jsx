import React from "react";

const CartItem = ({ item, onRemove, mostrarBoton = true }) =>
{
    return (
        <li className="flex items-center justify-between border-b pb-3">

            <div className="flex items-center gap-3">
                <img
                    src={item.imagen}
                    alt={item.titulo}
                    className="w-14 h-20 object-cover rounded shadow"
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
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                    Quitar
                </button>
            )}

        </li>
    );
};

export default CartItem;
