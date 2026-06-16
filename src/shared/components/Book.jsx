import { getBookImageSrc } from "../../shared/utils/bookImage";
import { Button } from "../../shared/components/Button";
import { currencyFormat } from "../hooks/useCurrencyFormat";
import { useNavigate } from "react-router-dom";

function Book({
  id,
  rutaImagen,
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
    <div className="card w-72 bg-base-100 shadow-md hover:shadow-lg transition-all duration-300">
      <figure className="px-4 pt-4">
        <img
          src={getBookImageSrc(isbn)|| fallbackImage}
          alt={`Portada del libro ${titulo}`}
          className="h-48 w-36 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImage;
          }}
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-lg font-bold line-clamp-2">
          {titulo}
        </h2>

        <p className="text-sm text-primary">{categoria}</p>

        <p className="text-sm text-gray-500 line-clamp-1">
          {autor}
        </p>

        {isbn && (
          <p className="text-xs text-gray-400">
            ISBN: {isbn}
          </p>
        )}

        <div className="flex items-center justify-between gap-2">
          <p className="text-lg font-bold">
            {formatCurrency(precio)}
          </p>

          {rating && (
            <span className="badge badge-outline text-xs">
              {rating}/5
            </span>
          )}
        </div>

        {Number(stock) <= 0 ? (
          <span className="text-sm badge badge-error">Agotado</span>
        ) : (
          <span className="text-sm badge badge-success">
            Disponible · {stock}
          </span>
        )}

        <div className="card-actions justify-end mt-2">
          <Button
            onClick={() => navigate(`/books/${id}`)}
            className="btn-primary"
          >
            Detalles
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Book;