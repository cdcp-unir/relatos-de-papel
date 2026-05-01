import { useState } from "react";

export const useSearchBooks = () => {
    const [searchQuery, setSearchQuery] = useState("");    

    const filterBooks = (books) => {
        return books.filter(book => { const matchesSearch = book.titulo.toLowerCase().includes(searchQuery.toLowerCase()); return matchesSearch; })
    };

    const filterSidebarBooks = (books) => {
        let filteredBooks = books;
        if (searchTitle.length !== 0) {
            filteredBooks = filteredBooks.filter(book => {
                const matchesSearch = book.title.toLowerCase().includes(searchTitle.toLowerCase()); 
                return matchesSearch;
            });
        }

        return filteredBooks;
    };

    return { searchQuery, filterBooks, filterSidebarBooks, setSearchQuery };
}