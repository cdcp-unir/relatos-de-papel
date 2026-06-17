import { useEffect, useState } from "react";

import Book from "../../../shared/components/Book";
import { Pagination } from "../../../shared/components/Pagination";
import SearchBar from "../../../shared/components/SearchBar";
import { getBooks } from "../services/BookService";

function HomePage() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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
    category = selectedCategory,
  } = {}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await getBooks({
        page,
        limit,
        search,
        category,
      });

      setBooks(response?.data || []);
      setCategories(response?.aggregations || []);

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
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks({
      page: currentPage,
      limit: itemsPerPage,
      search: searchQuery,
      category: selectedCategory,
    });
  }, [currentPage, itemsPerPage, selectedCategory]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentPage(1);

      loadBooks({
        page: 1,
        limit: itemsPerPage,
        search: searchQuery,
        category: selectedCategory,
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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setCurrentPage(1);

    loadBooks({
      page: 1,
      limit: itemsPerPage,
      search: "",
      category: "",
    });
  };

  const activeCategoryLabel = selectedCategory || "Todas";

  return (
    <>
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Buscar por título, autor, categoría o ISBN..."
      />

      <div className="grid grid-cols-1 xl:grid-cols-[260px_minmax(0,1fr)] gap-6">
        <aside className="xl:sticky xl:top-20 self-start">
          <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body p-4">
              <div className="flex items-center justify-between gap-2 mb-2">
                <h2 className="card-title text-base">Categorías</h2>

                {(selectedCategory || searchQuery) && (
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs"
                    onClick={clearFilters}
                  >
                    Limpiar
                  </button>
                )}
              </div>

              <button
                type="button"
                className={[
                  "w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm transition",
                  selectedCategory === ""
                    ? "bg-primary text-primary-content"
                    : "hover:bg-base-200 text-base-content",
                ].join(" ")}
                onClick={() => handleCategoryChange("")}
              >
                <span>Todas</span>
                <span
                  className={[
                    "badge badge-sm",
                    selectedCategory === ""
                      ? "badge-primary-content"
                      : "badge-outline",
                  ].join(" ")}
                >
                  {meta.count}
                </span>
              </button>

              <div className="mt-3 max-h-[420px] overflow-y-auto pr-1 space-y-1">
                {categories.map((category) => {
                  const isActive = selectedCategory === category.key;

                  return (
                    <button
                      key={category.key}
                      type="button"
                      className={[
                        "w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition text-left",
                        isActive
                          ? "bg-primary text-primary-content"
                          : "hover:bg-base-200 text-base-content",
                      ].join(" ")}
                      onClick={() => handleCategoryChange(category.key)}
                    >
                      <span className="truncate">{category.key}</span>

                      <span
                        className={[
                          "badge badge-sm shrink-0",
                          isActive ? "badge-primary-content" : "badge-outline",
                        ].join(" ")}
                      >
                        {category.count}
                      </span>
                    </button>
                  );
                })}

                {!loading && categories.length === 0 && (
                  <p className="text-sm text-base-content/60">
                    No hay categorías disponibles.
                  </p>
                )}
              </div>
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <div className="text-sm text-gray-600">
              {loading
                ? "Cargando libros..."
                : `Mostrando ${books.length} de ${meta.count} libros`}
              <span className="ml-2 text-base-content/50">
                · Categoría: {activeCategoryLabel}
              </span>
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
                    category: selectedCategory,
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
              <span className="loading loading-spinner loading-md text-primary" />
              <p className="text-gray-600 mt-3">Cargando libros...</p>
            </div>
          )}

          {!loading && books.length === 0 && !error && (
            <div className="bg-gray-50 p-6 rounded-lg shadow text-center">
              <p className="text-gray-600">
                No se encontraron resultados para{" "}
                <strong>
                  {searchQuery || selectedCategory || "la búsqueda actual"}
                </strong>
                .
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
        </section>
      </div>
    </>
  );
}

export default HomePage;
