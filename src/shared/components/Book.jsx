import React from 'react';

function Book({ rutaImagen, titulo }) {
    return (
        <div style={{
            width: "200px",
            height: "200px"
        }}>
            <img height={100} width={100} src={rutaImagen}></img >
            <br></br>
            <label>{titulo}</label>
        </div>
    );
}

export default Book;