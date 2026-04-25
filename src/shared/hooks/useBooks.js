import { useEffect, useState } from "react";

import dataBooks from "@mocks/books.json";

export const useBooks = () => {    
    const [books, setBooks] = useState([]);
    
    useEffect(() => {
        setBooks(dataBooks);        
    }, []);

    return { books, setBooks }
};