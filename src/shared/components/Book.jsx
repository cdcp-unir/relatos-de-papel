import {Button} from '../../shared/components/Button';
import { currencyFormat } from '../hooks/useCurrencyFormat';
import { useNavigate } from 'react-router';

function Book({ id, rutaImagen, titulo,  categoria, autor, precio, stock }) {
    const navigate = useNavigate();
    const { formatCurrency } = currencyFormat();

    return (
        <div className="card w-72 bg-base-100 shadow-md hover:shadow-lg transition-all duration-300">            
            <figure className="px-4 pt-4">
                <img
                    src={rutaImagen}
                    alt={`Portada del libro ${titulo}`}
                    className="h-48 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                />
            </figure>            
            <div className="card-body">
                <h2 className="card-title text-lg font-bold line-clamp-2">{titulo}</h2>
                <p className="text-sm text-primary">{categoria}</p>
                <p className="text-sm text-gray-500">{autor}</p>
                <p className="text-lg font-bold">{formatCurrency(precio)}</p>                
                {stock === 0 ? <span className="text-sm badge badge-error">Agotado</span> : <span className="text-sm badge badge-success">Disponible</span>}
                <div className="card-actions justify-end">
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
