import React from 'react';

function Label({ texto }) {
    return (
        <h1 className='text-2xl flex justify-center'>{texto}</h1>
    );
}

export default Label;