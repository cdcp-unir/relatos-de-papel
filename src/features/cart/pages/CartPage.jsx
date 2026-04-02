import React, { useState } from "react";
import { PATHS } from "../../../app/router/paths";
import books from "../../../mocks/cartbooks.json";
import CartItem from "../../../shared/components/CartItem"
import { useNavigate } from "react-router-dom";

const CartPage = () =>
{
    const [items, setItems] = useState(books);

    const removeItem = (id) =>
    {
        setItems(items.filter((item) => item.id !== id));
    };

    const total = items.reduce((sum, item) => sum + item.precio, 0);

    const navigate = useNavigate();

    return (
        <div className="max-w-4xl mx-auto shadow-md rounded-lg p-6 w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Carrito</h2>

            {items.length === 0 ? (
                <p className="text-center text-gray-600">Tu carrito está vacío.</p>
            ) : (
                <>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {items.map((item) => (
                            <CartItem key={item.id} item={item} onRemove={removeItem} />
                        ))}
                    </ul>

                    <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <p className="font-bold text-lg text-center md:text-left">
                            Total: ${total.toFixed(2)}
                        </p>
                        <button
                            onClick={() => navigate(PATHS.CHECKOUT)}
                            className="w-full md:w-auto bg-blue-900  text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 transition"
                        >
                            Ir a pagar
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
