import { createContext } from "react"
import { useBooks } from "../hooks/useBooks";
import { useCart } from "../hooks/useCart";
import { useSearchBooks } from "../hooks/useSearchBooks";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const { books, setBooks } = useBooks();
    const { cart, addBook, clear, increaseQuantity, decreaseQuantity, remove, totalBooks, total } = useCart();
    const { searchQuery, filterBooks, filterSidebarBooks, setSearchQuery } = useSearchBooks(books);

    return (
        <GlobalContext.Provider
            value={{
                books,
                setBooks,

                cart,
                addBook,
                clear,
                increaseQuantity, 
                decreaseQuantity, 
                remove, 
                totalBooks, 
                total,

                searchQuery,
                setSearchQuery,                                 
                filterBooks,
                filterSidebarBooks
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}