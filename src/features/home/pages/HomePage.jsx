import { useContext, useEffect, useState } from 'react';

import Book from '../../../shared/components/Book';
import { GlobalContext } from '../../../shared/context/GlobalContext';
import { Pagination } from '../../../shared/components/Pagination';
import SearchBar from '../../../shared/components/SearchBar';

function HomePage() {
  const { books, searchQuery, filterBooks } = useContext(GlobalContext);

  let search = false;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  let booksToDisplay = books;

  if (searchQuery.length !== 0) {
    booksToDisplay = filterBooks(booksToDisplay);
    search = true;
  }

  useEffect(() => {
    if (search) {
      setCurrentPage(1);
    }
  }, [search]);

  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = booksToDisplay.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(booksToDisplay.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <SearchBar />
      {currentBooks.length > 0 && (
        <div className="flex justify-center mb-6">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center">
        {currentBooks.length === 0 && (
          <div className="col-span-full bg-gray-50 p-6 rounded-lg shadow text-center">
            <p className="text-gray-600">No se encontraron resultados para "{searchQuery}".</p>
          </div>
        )}
        {currentBooks.map((element, index) => (
          <Book
            key={index}
            titulo={element.titulo}
            rutaImagen={element.portadas}
            categoria={element.categoria}
            autor={element.autor}
            precio={element.precio}
            id={element.id}
            stock={element.stock}
          />
        ))}
      </div>
    </>
  );
}

export default HomePage;