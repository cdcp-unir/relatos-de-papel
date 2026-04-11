import Book from '../../../shared/components/Book';
import Books from '@mocks/books.json'
import SearchBar from '../../../shared/components/SearchBar';
import { useContext, useEffect } from 'react';
import { DetailContext } from '../../../shared/context/DetailContext/DetailsContext';

function HomePage() {
  const { busqueda } = useContext(DetailContext);
  var filtro = Books.filter((producto) =>
    producto.autor.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase())
    || producto.categoria.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase())
    || producto.editorial.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase()));

  return (
    <>
      <SearchBar />
      <br></br>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtro.map((element, index) => (
          <Book
            key={index}
            titulo={element.titulo}
            rutaImagen={element.portadas}
            detalle={element.detalle}
            categoria={element.categoria}
            autor={element.autor}
            precio={element.precio}
          />
        ))}
      </div>
    </>
  );
}

export default HomePage;