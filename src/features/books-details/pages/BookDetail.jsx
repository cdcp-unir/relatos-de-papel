import { Link, useParams } from "react-router-dom";

import React from 'react';
import books from "@mocks/books.json";
import { currencyFormat } from '../../../shared/hooks/useCurrencyFormat';

function BookDetail() {
    const { bookId } = useParams();
    const libro = books.find(x => x.id === Number(bookId));
    const { formatCurrency } = currencyFormat();
    return (
        <>
            <div className="hero bg-linear-to-r from-base-200 via-base-300 to-base-200 py-10">
                <div className="hero-content flex-col lg:flex-row gap-10">                    
                    <img
                        src={libro.portadas}
                        alt={libro.titulo}
                        className="w-64 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                    />                    
                    <div className="max-w-lg">
                        <h1 className="text-4xl font-extrabold mb-2">{libro.titulo}</h1>
                        <h2 className="text-xl font-semibold mb-4">{libro.autor}</h2>

                        <div className="flex flex-wrap gap-4 mb-4">
                            <span className="badge badge-accent text-lg">{libro.categoria}</span>
                            <span className="text-2xl font-bold">{formatCurrency(libro.precio)}</span>
                        </div>  
                        <p className="text-base leading-relaxed text-justify mb-6">
                            {libro.detalle}
                        </p>                        
                        <div className="flex gap-4">
                            <button className="btn btn-primary shadow-md hover:scale-105 transition-transform">
                                Añadir al carrito
                            </button>
                            <Link to="/home" className="btn btn-accent">
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