import React, { useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import { Button } from '../../../shared/components/Button';
import { GlobalContext } from "../../../shared/context/GlobalContext";
import { currencyFormat } from '../../../shared/hooks/useCurrencyFormat';

function BookDetail() {
    const { bookId } = useParams();
    const { addBook, books } = useContext(GlobalContext);
    const { formatCurrency } = currencyFormat();
    const book = books.find(x => x.id === Number(bookId));
    const navigate = useNavigate();
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
                        <h2 className="text-xl font-semibold mb-2">{book.autor}</h2>
                        <span className="badge badge-accent text-lg mb-2">{book.categoria}</span>
                        <p className="text-2xl font-bold mb-2">{formatCurrency(book.precio)}</p>
                        <p className="text-base leading-relaxed text-justify mb-6">
                            {book.detalle}
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
        </>
    );
}

export default BookDetail;