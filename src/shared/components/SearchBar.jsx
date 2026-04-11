import React, { useContext, useEffect } from 'react';
import Books from '../../mocks/books.json'
import { DetailContext } from '../context/DetailContext/DetailsContext';

function SearchBar() {
    const { setBusqueda, busqueda } = useContext(DetailContext)

    return (
        <div className='w-2/3 mx-auto'>
            <label className="input w-full">
                <input type="text" placeholder="Buscar..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
                <span className='label' >Buscar</span>
            </label>
        </div>
    );
}

export default SearchBar;