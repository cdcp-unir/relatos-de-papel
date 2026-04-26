import { useState } from "react";

export const useCart = () => {
    const [cart, setCart] = useState([]);

    const addBook = (book) => {
        setCart((existCart) => {
            const existing = existCart.find((item) => item.id === book.id);
            if (existing) {
                return existCart.map((item) =>
                    item.id === book.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : { ...item }
                );
            } else {
                return [...existCart, { ...book, quantity: 1 }];
            }
        });
    }

    const increaseQuantity = (id) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : { ...item }
            )
        );
    };

    const decreaseQuantity = (id) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
                        : { ...item }
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const remove = (id) => {
        setCart((prevCart) =>
            prevCart.filter((item) => item.id !== id)
        );
    };

    const calculateSubtotals = cart.map((item) => ({
        ...item,
        subtotal: item.precio * item.quantity,
    }));

    const totalBooks = calculateSubtotals.reduce(
        (acc, item) => acc + item.quantity,
        0
    );
    const total = calculateSubtotals.reduce(
        (acc, item) => acc + item.subtotal,
        0
    );


    const clear = () => {
        setCart([]);
    };

    return { cart: calculateSubtotals, addBook, clear, increaseQuantity, decreaseQuantity, remove, totalBooks, total };
};