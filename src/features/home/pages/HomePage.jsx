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
        {filtro.length === 0 && (
          <div className="col-span-full bg-gray-50 p-6 rounded-lg shadow text-center">
            <p className="text-gray-600">No se encontraron resultados para "{busqueda}".</p>
          </div>
        )}
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