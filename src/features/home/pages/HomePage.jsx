import Book from '../../../shared/components/Book';
import { DetailContext } from '../../../shared/context/DetailContext/DetailsContext';
import { GlobalContext } from '../../../shared/context/GlobalContext';
import SearchBar from '../../../shared/components/SearchBar';
import { useContext } from 'react';

function HomePage() {
  const { busqueda } = useContext(DetailContext);
  const { books } = useContext(GlobalContext);
  
  var filtro = books.filter((producto) => producto.titulo.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase()));

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
            id={element.id}
          />
        ))}
      </div>
    </>
  );
}

export default HomePage;