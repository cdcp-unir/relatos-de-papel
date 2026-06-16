import { useEffect, useState } from "react";

import Book from "../../../shared/components/Book";
import { Pagination } from "../../../shared/components/Pagination";
import SearchBar from "../../../shared/components/SearchBar";
import { getBooks } from "../services/BookService";

function HomePage() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [meta, setMeta] = useState({
    count: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadBooks = async ({
    page = currentPage,
    limit = itemsPerPage,
    search = searchQuery,
  } = {}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await getBooks({
        page,
        limit,
        search,
      });

      setBooks(response?.data || []);

      setMeta({
        count: response?.meta?.count || 0,
        page: response?.meta?.page || page,
        limit: response?.meta?.limit || limit,
        totalPages: response?.meta?.totalPages || 1,
        hasNext: Boolean(response?.meta?.hasNext),
        hasPrevious: Boolean(response?.meta?.hasPrevious),
      });
    } catch (err) {
      console.error("Error consultando libros:", err);
      setError("No se pudieron cargar los libros.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks({
      page: currentPage,
      limit: itemsPerPage,
      search: searchQuery,
    });
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentPage(1);
      loadBooks({
        page: 1,
        limit: itemsPerPage,
        search: searchQuery,
      });
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > meta.totalPages) return;

    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLimitChange = (e) => {
    const newLimit = Number(e.target.value);

    setItemsPerPage(newLimit);
    setCurrentPage(1);
  };

  return (
    <>
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Buscar por título, autor, categoría o ISBN..."
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div className="text-sm text-gray-600">
          {loading
            ? "Cargando libros..."
            : `Mostrando ${books.length} de ${meta.count} libros`}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Mostrar</span>

          <select
            className="select select-bordered select-sm"
            value={itemsPerPage}
            onChange={handleLimitChange}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 p-6 rounded-lg shadow text-center mb-5">
          <p className="text-red-600">{error}</p>

          <button
            className="btn btn-primary mt-4"
            onClick={() =>
              loadBooks({
                page: currentPage,
                limit: itemsPerPage,
                search: searchQuery,
              })
            }
          >
            Reintentar
          </button>
        </div>
      )}

      {!loading && books.length > 0 && (
        <div className="flex justify-center mb-6">
          <Pagination
            currentPage={meta.page}
            totalPages={meta.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {loading && (
        <div className="bg-base-100 p-6 rounded-lg shadow text-center">
          <p className="text-gray-600">Cargando libros...</p>
        </div>
      )}

      {!loading && books.length === 0 && !error && (
        <div className="bg-gray-50 p-6 rounded-lg shadow text-center">
          <p className="text-gray-600">
            No se encontraron resultados para "{searchQuery}".
          </p>
        </div>
      )}

      {!loading && books.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center">
          {books.map((element) => (
            <Book
              key={element.externalId || element.id || element.isbn}
              titulo={element.title}
              rutaImagen={
                element.imageUrl ||
                "https://placehold.co/400x600?text=Sin+imagen"
              }
              categoria={element.category}
              autor={element.author}
              precio={element.price}
              id={element.externalId || element.id}
              stock={element.stock}
              isbn={element.isbn}
              rating={element.rating}
            />
          ))}
        </div>
      )}

      {!loading && books.length > 0 && (
        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={meta.page}
            totalPages={meta.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}

export default HomePage;
