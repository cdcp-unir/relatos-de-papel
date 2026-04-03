import { Button } from '../../../shared/components/Button';
import Footer from '../../../shared/components/Footer';
import { Header } from '../../../shared/components/Header';
import { PATHS } from '../../../app/router/paths';
import bookshelf from '../../../assets/img/bookshelf.png';
import { useNavigate } from 'react-router';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />

      <main className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12 py-12 px-6 text-base-content">        
        <section className="flex flex-col gap-6 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold">
            Disfruta el mundo de los libros
          </h1>
          <p className="text-lg md:text-xl">
            Explora nuestra colección y encuentra tu próxima gran lectura.
          </p>
          <Button className="btn btn-primary w-fit" onClick={() => navigate(PATHS.HOME)}>
            Explorar ahora
          </Button>
        </section>        
        <section className="flex justify-center md:justify-end w-full md:w-1/2">
          <img src={bookshelf} alt="Librero con libros" className="w-full max-w-md h-auto object-contain drop-shadow-lg" />
        </section>
      </main>

      <Footer />
    </div>
  );
}