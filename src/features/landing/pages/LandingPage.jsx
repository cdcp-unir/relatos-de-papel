import { useNavigate } from 'react-router';
import bookshelf from '../../../assets/img/bookshelf.png';
import { Button } from '../../../shared/components/Button';
import { Header } from '../../../shared/components/Header';
import './LandingPage.css';
import { PATHS } from '../../../app/router/paths';


export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <Header />
      
      <main className="landing-content">
        <section className="text-content">
          <h1 className="title">Disfruta el mundo de los libros</h1>
          <p className="subtitle">
            Explora nuestra colección y encuentra tu próxima gran lectura.
          </p>
          <Button className="explore-button" onClick={() => navigate(PATHS.HOME)}>Explorar ahora</Button>
        </section>

        <section className="image-content">
          <img src={bookshelf} alt="Librero con libros" className="hero-image" />
        </section>
      </main>
    </div>
  );
}