import Book from '../../../shared/components/Book';
import SearchBar from '../../../shared/components/SearchBar';
import { Header } from '../../../shared/components/Header';
import Label from '../../../shared/components/Label';
import Books from '../../../mocks/books.json'

function HomePage() {
  return (
    <>
      <Header />
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