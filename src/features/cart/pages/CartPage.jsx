import React, { useState } from "react";
import { PATHS } from "../../../app/router/paths";
import books from "../../../mocks/cartbooks.json";
import CartItem from "../../../shared/components/CartItem"

const CartPage = () =>
{
    const [items, setItems] = useState(books);

    const removeItem = (id) =>
    {
        setItems(items.filter((item) => item.id !== id));
    };

    const goToPay = () =>
    {
        alert("Ir a pagar")
    };

    const total = items.reduce((sum, item) => sum + item.precio, 0);

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Carrito</h2>

            {items.length === 0 ? (
                <p className="text-center text-gray-600">Tu carrito está vacío.</p>
            ) : (
                <>
                    <ul className="space-y-4">
                        {items.map((item) => (
                            <CartItem key={item.id} item={item} onRemove={removeItem} />
                        ))}
                    </ul>

                    <p className="mt-4 text-right font-bold text-lg">
                        Total: ${total.toFixed(2)}
                    </p>

                    <button
                        onClick={goToPay}
                        className="w-full mt-6 bg-yellow-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-yellow-800 transition"
                    >
                        Ir a pagar
                    </button>
                </>
            )}
        </div>
    );
};

export default CartPage;
