import { useState } from "react";

export const useCart = () => {
    const [cart, setCart] = useState([]);

    const addBook = (book) => {
        console.log(book);
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

    const calculateSubtotals = cart.map((item) => ({
        ...item,
        subtotal: item.precio * item.quantity,
    }));

    const clear = () => {
        setCart([]);
    };

    return { cart: calculateSubtotals, addBook, clear };
};