import { currencyFormat } from '../hooks/useCurrencyFormat';
import { useNavigate } from 'react-router';

function Book({ id, rutaImagen, titulo, detalle, categoria, autor, precio }) {
    const navigate = useNavigate();
    const { formatCurrency } = currencyFormat();

    return (
        <div className="card w-72 bg-base-100 shadow-md hover:shadow-lg transition-all duration-300">            
            <figure className="px-4 pt-4">
                <img
                    src={rutaImagen}
                    alt={`Portada del libro ${titulo}`}
                    className="rounded-xl object-cover h-48 w-full"
                />
            </figure>            
            <div className="card-body">
                <h2 className="card-title text-lg font-bold line-clamp-2">{titulo}</h2>
                <p className="text-sm text-primary">{categoria}</p>
                <p className="text-sm text-gray-500">{autor}</p>
                <p className="text-lg font-bold mt-2">{formatCurrency(precio)}</p>                
                <div className="card-actions justify-end mt-4">
                    <button
                        onClick={() => navigate(`/books/${id}`)}
                        className="btn btn-primary btn-sm"
                    >
                        Detalles
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Book;
