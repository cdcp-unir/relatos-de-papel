import Book from '../../../shared/components/Book';
import Books from '../../../mocks/books.json'
import Label from '../../../shared/components/Label';
import SearchBar from '../../../shared/components/SearchBar';

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
        {
          Books.map((element, index) => {
            return (
              <Book titulo={element.titulo} rutaImagen={element.portadas} detalle={element.detalle} />
            )
          })
        }
      </div>
    </>
  );
}

export default HomePage;