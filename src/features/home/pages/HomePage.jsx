import Book from '../../../shared/components/Book';
import Books from '../../../mocks/books.json'
import SearchBar from '../../../shared/components/SearchBar';

function HomePage() {
  return (
    <>
      <SearchBar />      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Books.map((element, index) => (
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