import { getBookImageSrc } from "../../shared/utils/bookImage";
import { Button } from "../../shared/components/Button";
import { currencyFormat } from "../hooks/useCurrencyFormat";
import { useNavigate } from "react-router-dom";

function Book({
  id,
  titulo,
  categoria,
  autor,
  precio,
  stock,
  isbn,
  rating,
}) {
  const navigate = useNavigate();
  const { formatCurrency } = currencyFormat();

  const fallbackImage = "https://placehold.co/400x600?text=Sin+imagen";

  return (
    <article className="card w-full h-full bg-base-100 border border-base-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      <figure className="px-4 pt-4 h-60 bg-base-100 flex items-center justify-center">
        <img
          src={getBookImageSrc(isbn) || fallbackImage}
          alt={`Portada del libro ${titulo}`}
          className="h-52 w-36 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImage;
          }}
        />
      </figure>

      <div className="card-body p-5 flex flex-col">
        <h2 className="card-title text-lg font-bold leading-snug line-clamp-2 min-h-[3.25rem]">
          {titulo}
        </h2>

        <p className="text-sm text-primary line-clamp-1">
          {categoria}
        </p>

        <p className="text-sm text-gray-500 line-clamp-1">
          {autor}
        </p>

        {isbn && (
          <p className="text-xs text-gray-400 line-clamp-1">
            ISBN: {isbn}
          </p>
        )}

        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="text-lg font-bold">
            {formatCurrency(precio)}
          </p>

          {rating && (
            <span className="badge badge-outline text-xs shrink-0">
              {rating}/5
            </span>
          )}
        </div>

        <div className="mt-1">
          {Number(stock) <= 0 ? (
            <span className="text-sm badge badge-error">Agotado</span>
          ) : (
            <span className="text-sm badge badge-success">
              Disponible · {stock}
            </span>
          )}
        </div>

        <div className="card-actions justify-end mt-auto pt-4">
          <Button
            onClick={() => navigate(`/books/${id}`)}
            className="btn-primary btn-sm"
          >
            Detalles
          </Button>
        </div>
      </div>
    </article>
  );
}

export default Book;