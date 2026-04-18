import { currencyFormat } from '../hooks/useCurrencyFormat';
import { useNavigate } from 'react-router';

function Book({ id, rutaImagen, titulo, detalle, categoria, autor, precio }) {
    const navigate = useNavigate();
    const { formatCurrency } = currencyFormat();

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-4 flex flex-col group w-64">
            <figure className="aspect-square relative overflow-hidden rounded-lg mb-4 bg-gray-100 flex items-center justify-center">
                <img
                    src={rutaImagen}
                    alt={`Portada del libro ${titulo}`}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
            </figure>
            <div className="card-body p-0 flex flex-col justify-between flex-1">
                <div className="space-y-1">
                    <h2 className="card-title text-lg font-semibold">{titulo}</h2>
                    <p className="text-sm text-gray-600 line-clamp-1">Categoría: {categoria}</p>
                    <p className="text-sm text-gray-600 line-clamp-1">Autor: {autor}</p>
                    <p className="text-base font-bold text-primary">{formatCurrency(precio)}</p>
                </div>
                <div className="card-actions justify-between mt-4">
                    <button onClick={() => navigate(`/books/${id}`)} className="btn btn-primary">Ver detalles</button>                    
                </div>
            </div>
        </div>
    );
}

export default Book;