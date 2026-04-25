import { createContext } from "react"
import { useBooks } from "../hooks/useBooks";
import { useCart } from "../hooks/useCart";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const { books, setBooks } = useBooks();
    const { cart, addBook, clear } = useCart();

    return (
        <GlobalContext.Provider
            value={{
                books,
                setBooks,
                cart,
                addBook,
                clear
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}