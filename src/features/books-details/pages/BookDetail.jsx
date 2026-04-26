import { Link, useParams } from "react-router-dom";
import React, { useContext } from 'react';

import { GlobalContext } from "../../../shared/context/GlobalContext";
import { currencyFormat } from '../../../shared/hooks/useCurrencyFormat';

function BookDetail() {
    const { bookId } = useParams();
    const { addBook, books } = useContext(GlobalContext);
    const { formatCurrency } = currencyFormat();
    const book = books.find(x => x.id === Number(bookId));

    const handleAdd = () => {        
        addBook(book);        
    };

    return (
        <>
            <div className="hero bg-linear-to-r from-base-200 via-base-300 to-base-200 py-10">
                <div className="hero-content flex-col lg:flex-row gap-10">
                    <img
                        src={book.portadas}
                        alt={book.titulo}
                        className="w-64 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                    />
                    <div className="max-w-lg">
                        <h1 className="text-4xl font-extrabold mb-2">{book.titulo}</h1>
                        <h2 className="text-xl font-semibold mb-4">{book.autor}</h2>

                        <div className="flex flex-wrap gap-4 mb-4">
                            <span className="badge badge-accent text-lg">{book.categoria}</span>
                            <span className="text-2xl font-bold">{formatCurrency(book.precio)}</span>
                        </div>
                        <p className="text-base leading-relaxed text-justify mb-6">
                            {book.detalle}
                        </p>
                        <div className="flex gap-4">
                            <button className="btn btn-primary" onClick={handleAdd}>
                                Añadir al carrito
                            </button>
                            <Link to="/home" className="btn btn-soft">
                                Regresar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookDetail;