import bookshelf from '../../../assets/img/bookshelf.png';
import { Button } from '../../../components/Button';
import { Header } from '../../../components/Header';
import './LandingPage.css';


export default function LandingPage() {
  return (
    <div className="landing-page">
      <Header />
      
      <main className="landing-content">
        <section className="text-content">
          <h1 className="title">Disfruta el mundo de los libros</h1>
          <p className="subtitle">
            Explora nuestra colección y encuentra tu próxima gran lectura.
          </p>
          <Button className="explore-button">Explorar ahora</Button>
        </section>

        <section className="image-content">
          <img src={bookshelf} alt="Librero con libros" className="hero-image" />
        </section>
      </main>
    </div>
  );
}