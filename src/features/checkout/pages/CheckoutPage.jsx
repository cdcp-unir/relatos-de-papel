import React, { useContext, useState } from "react";

import CartItem from "../../../shared/components/CartItem";
import { GlobalContext } from "../../../shared/context/GlobalContext";
import { currencyFormat } from "../../../shared/hooks/useCurrencyFormat";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        direccion: "",
        tarjeta: "",
        vencimiento: "",
        cvv: "",
    });

    const navigate = useNavigate();
    const { cart, clear } = useContext(GlobalContext);
    const total = cart.reduce((sum, item) => sum + item.precio, 0);
    const impuestos = total * 0.12;
    const subtotal = total - impuestos;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Pago procesado correctamente. ¡Gracias por tu compra!");
        clear();
        navigate("/home");
    };

    const { formatCurrency } = currencyFormat();

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-8 text-center">Checkout</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Columna izquierda: carrito + formulario */}
                <div className="md:col-span-2 space-y-6">
                    {/* Resumen del pedido */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Resumen del pedido</h3>
                        <CartItem books={cart} mostrarBoton={false} />
                    </div>

                    {/* Formulario de pago */}
                    <form
                        className="bg-white shadow rounded-lg p-6 space-y-4"
                        onSubmit={handleSubmit}
                    >
                        <h3 className="text-xl font-semibold mb-4">Datos de pago</h3>

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
                                className="mt-1 w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-400"
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
                                className="mt-1 w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-400"
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
                                className="mt-1 w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-400"
                                pattern="\d{13,19}"
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
                                    className="mt-1 w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-400"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    CVV
                                </label>
                                <input
                                    type="password"
                                    name="cvv"
                                    value={formData.cvv}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-400"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full btn btn-primary text-white font-semibold py-3 rounded-md transition hover:scale-105"
                        >
                            Confirmar pago
                        </button>
                    </form>
                </div>

                {/* Columna derecha: resumen de pagos */}
                <div className="bg-gray-50 shadow rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 text-right">Resumen de pagos</h3>
                    <p className="flex justify-between text-lg mb-2">
                        <span>Subtotal:</span>
                        <span>{formatCurrency(subtotal)}</span>
                    </p>
                    <p className="flex justify-between text-lg mb-2">
                        <span>Impuestos (IVA 12%):</span>
                        <span>{formatCurrency(impuestos)}</span>
                    </p>
                    <p className="flex justify-between text-xl font-bold border-t pt-4">
                        <span>Total:</span>
                        <span>{formatCurrency(total)}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
