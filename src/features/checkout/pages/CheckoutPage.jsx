import React, { useContext, useState } from "react";

import { Button } from "../../../shared/components/Button";
import CartItem from "../../../shared/components/CartItem";
import { GlobalContext } from "../../../shared/context/GlobalContext";
import { PATHS } from "../../../app/router/paths";
import { currencyFormat } from "../../../shared/hooks/useCurrencyFormat";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        direccion: "",
        email: "",
        telefono: "",
        tarjeta: "",
        vencimiento: "",
        cvv: "",
    });

    const navigate = useNavigate();
    const { cart, clear } = useContext(GlobalContext);
    const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
    const impuestos = subtotal * 0.15;
    const total = subtotal + impuestos;

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
                <div className="md:col-span-2 space-y-6">
                    <div className="shadow rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Resumen del pedido</h3>
                        <CartItem books={cart} mostrarBoton={false} />
                    </div>
                    <form className="shadow rounded-lg p-6 space-y-4" onSubmit={handleSubmit}>
                        <h3 className="text-xl font-semibold mb-4">Detalles de facturación</h3>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium">
                                    Nombres
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
                            <div className="flex-1">
                                <label className="block text-sm font-medium">
                                    Apellidos
                                </label>
                                <input
                                    type="text"
                                    name="apellido"
                                    value={formData.apellido}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-400"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">
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
                        <h3 className="text-xl font-semibold mb-4">Datos de pago</h3>
                        <div>
                            <label className="block text-sm font-medium">
                                Número de tarjeta
                            </label>
                            <input
                                type="text"
                                name="tarjeta"
                                value={formData.tarjeta}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-400"
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium">
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
                                <label className="block text-sm font-medium">
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
                    </form>
                </div>
                <div className="bg-gray-50 shadow rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 text-right">Resumen de pagos</h3>
                    <p className="flex justify-between mb-2">
                        <span>Subtotal:</span>
                        <span>{formatCurrency(subtotal)}</span>
                    </p>
                    <p className="flex justify-between mb-2">
                        <span>Impuestos (IVA 15%):</span>
                        <span>{formatCurrency(impuestos)}</span>
                    </p>
                    <p className="flex justify-between text-xl font-bold border-t pt-4">
                        <span>Total:</span>
                        <span>{formatCurrency(total)}</span>
                    </p>
                    <Button type="submit" className="btn-primary font-semibold w-full py-3 mt-6">
                        Confirmar pago
                    </Button>
                    <Button
                        onClick={() => navigate(PATHS.HOME)}
                        className="btn-soft font-semibold py-3 w-full mt-3"
                    >
                        Regresar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
