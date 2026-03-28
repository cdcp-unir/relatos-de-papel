import React, { useState } from "react";
import books from "../../../mocks/cartbooks.json";
import CartItem from "../../../shared/components/CartItem"

const CheckoutPage = () =>
{
    const [formData, setFormData] = useState({
        nombre: "",
        direccion: "",
        tarjeta: "",
        vencimiento: "",
        cvv: "",
    });

    const cartItems = books.slice(0, 3);
    const total = cartItems.reduce((sum, item) => sum + item.precio, 0);

    const handleChange = (e) =>
    {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        alert("Pago procesado correctamente. ¡Gracias por tu compra!");
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>

            {/* Resumen del pedido */}
            <div className="mb-6 border-b pb-4">
                <h3 className="text-lg font-semibold mb-4">Resumen del pedido</h3>
                <ul className="space-y-4">
                    {cartItems.map((item) => (
                        <CartItem item={item} mostrarBoton={false} />
                    ))}
                </ul>
                <p className="mt-4 text-right font-bold text-lg">
                    Total: ${total.toFixed(2)}
                </p>
            </div>

            {/* Formulario de pago */}
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Nombre completo
                    </label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full border rounded-md px-3 py-2 focus:ring focus:ring-brown-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Dirección
                    </label>
                    <input
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full border rounded-md px-3 py-2 focus:ring focus:ring-brown-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Número de tarjeta
                    </label>
                    <input
                        type="text"
                        name="tarjeta"
                        value={formData.tarjeta}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full border rounded-md px-3 py-2 focus:ring focus:ring-brown-400"
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Vencimiento (MM/AA)
                        </label>
                        <input
                            type="text"
                            name="vencimiento"
                            value={formData.vencimiento}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full border rounded-md px-3 py-2 focus:ring focus:ring-brown-400"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">CVV</label>
                        <input
                            type="password"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full border rounded-md px-3 py-2 focus:ring focus:ring-brown-400"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-yellow-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-yellow-800 transition"
                >
                    Confirmar pago
                </button>
            </form>
        </div>
    );
};

export default CheckoutPage;
