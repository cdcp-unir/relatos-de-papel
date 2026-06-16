import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../../../shared/components/Button";
import { GlobalContext } from "../../../shared/context/GlobalContext";
import { currencyFormat } from "../../../shared/hooks/useCurrencyFormat";
import { getBookById } from "../services/BookDetailService";
import { getBookImageSrc } from "../../../shared/utils/bookImage";


function BookDetail() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const { addBook } = useContext(GlobalContext);
  const { formatCurrency } = currencyFormat();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadBook = async () => {
    if (!bookId) return;

    try {
      setLoading(true);
      setError(null);

      const response = await getBookById(bookId);

      setBook(response);
    } catch (err) {
      console.error("Error cargando detalle del libro:", err);
      setError("No se pudo cargar el detalle del libro.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBook();
  }, [bookId]);

  const handleAdd = () => {
    if (!book) return;

    addBook({
      id: book.externalId || book.id,
      titulo: book.title,
      autor: book.author,
      categoria: book.category,
      precio: book.price,
      stock: book.stock,
      portadas:
        book.imageUrl ||
        book.image_url ||
        "https://placehold.co/400x600?text=Sin+imagen",
      isbn: book.isbn,
      rating: book.rating,
    });
  };

  if (loading) {
    return (
      <div className="hero bg-linear-to-r from-base-200 via-base-300 to-base-200 py-10">
        <div className="hero-content">
          <p className="text-lg">Cargando detalle del libro...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hero bg-linear-to-r from-base-200 via-base-300 to-base-200 py-10">
        <div className="hero-content flex-col">
          <p className="text-error">{error}</p>

          <Button className="btn btn-primary" onClick={loadBook}>
            Reintentar
          </Button>

          <Button className="btn btn-soft" onClick={() => navigate(-1)}>
            Regresar
          </Button>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="hero bg-linear-to-r from-base-200 via-base-300 to-base-200 py-10">
        <div className="hero-content flex-col">
          <p>No se encontró el libro.</p>

          <Button className="btn btn-soft" onClick={() => navigate(-1)}>
            Regresar
          </Button>
        </div>
      </div>
    );
  }

  const imageUrl =
    book.imageUrl ||
    book.image_url ||
    "https://placehold.co/400x600?text=Sin+imagen";

  return (
    <div className="hero bg-linear-to-r from-base-200 via-base-300 to-base-200 py-10">
      <div className="hero-content flex-col lg:flex-row gap-10">
        <img
          src={ getBookImageSrc(book.isbn) ||imageUrl}
          alt={book.title}
          className="w-64 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
        />

        <div className="max-w-lg">
          <h1 className="text-4xl font-extrabold mb-2">{book.title}</h1>

          <h2 className="text-xl font-semibold mb-2">{book.author}</h2>

          <span className="badge badge-accent text-lg mb-2">
            {book.category}
          </span>

          <p className="text-2xl font-bold mb-2">
            {formatCurrency(book.price)}
          </p>

          <div className="text-sm opacity-70 mb-4 space-y-1">
            <p>ISBN: {book.isbn}</p>
            <p>Stock: {book.stock}</p>
            <p>Rating: {book.rating}/5</p>
          </div>

          <p className="text-base leading-relaxed text-justify mb-6">
            {book.detail || book.detalle || "Sin descripción disponible."}
          </p>

          <div className="flex gap-4">
            {book.stock > 0 && (
              <Button className="btn btn-primary" onClick={handleAdd}>
                Añadir al carrito
              </Button>
            )}

            <Button className="btn btn-soft" onClick={() => navigate(-1)}>
              Regresar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;