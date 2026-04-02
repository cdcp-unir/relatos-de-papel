import React from 'react';
import { useNavigate } from 'react-router';

function Book({ rutaImagen, titulo, detalle }) {
    const navigate = useNavigate();
    return (
        <div class="w-full max-w-xl bg-white border rounded-lg shadow p-4 flex gap-4 mb-8">
            <div class="w-32 h-40 shrink-0">
                <img
                    src={rutaImagen}
                    alt="portada"
                    class="w-full h-full object-cover rounded-md"
                />
            </div>
            <div class="flex flex-col flex-1">
                <h2 class="text-lg font-bold text-gray-900 mb-1">
                    {titulo}
                </h2>
                <p class="text-gray-700 text-sm line-clamp-3">
                    {detalle}
                </p>
                <button onClick={() => navigate(`/books/${detalle}`)} class="mt-2 w-28 text-center py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition">
                    Ver más
                </button>
            </div>
        </div>
    );
}

export default Book;