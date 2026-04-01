import React from 'react';

function SearchBar() {
    return (
        <div className='w-2/3 mx-auto'>
            <input className='w-full border border-gray-300 rounded-lg px-4 py-2' type="text" placeholder="Buscar..." />
        </div>
    );
}

export default SearchBar;