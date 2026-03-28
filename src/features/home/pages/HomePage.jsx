import React from 'react';
import Book from '../../../shared/components/Book';
import SearchBar from '../../../shared/components/SearchBar';
import Label from '../../../shared/components/Label';


function HomePage() {
  return (
    <>
      <SearchBar />
      <Label texto="Libros Destacados" />
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        placeItems: "center"
      }}>
        <Book titulo="Los Tres Mundos" rutaImagen='https://anterior.mrbooks.com/mrbooks/portadas/9786287634923.webp' />
        <Book titulo="Habitos Atomicos" rutaImagen='https://anterior.mrbooks.com/mrbooks/portadas/9789584277954.webp' />
        <Book titulo="Dan Brown" rutaImagen='https://anterior.mrbooks.com/mrbooks/portadas/9786287779877.webp' />
        <Book titulo="Super Diaper Baby" rutaImagen='https://anterior.mrbooks.com/mrbooks/portadas/9781338687859.webp' />
        <Book titulo="MR.BOOKS" rutaImagen='https://anterior.mrbooks.com/portada_default.jpg' />
        <Book titulo="Amulet" rutaImagen='https://anterior.mrbooks.com/mrbooks/portadas/9780545828604.webp' />
      </div>
    </>
  );
}

export default HomePage;