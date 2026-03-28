import React from 'react';

function Label({ texto }) {
    return (
        <h1 style={{
            textAlign: "center",
            lineHeight: "1.2"
        }}>{texto}</h1>
    );
}

export default Label;