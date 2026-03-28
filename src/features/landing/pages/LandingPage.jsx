import { useNavigate } from 'react-router';
import bookshelf from '../../../assets/img/bookshelf.png';
import { Button } from '../../../shared/components/Button';
import { Header } from '../../../shared/components/Header';
import { PATHS } from '../../../app/router/paths';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex flex-col text-white">
      <Header />

      <main className="flex flex-row items-center justify-center gap-12 flex-1">
        <section className="flex flex-col gap-6">
          <h1 className="text-4xl">Disfruta el mundo de los libros</h1>
          <p className="text-lg">
            Explora nuestra colección y encuentra tu próxima gran lectura.
          </p>
          <Button className="btn-primary w-fit" onClick={() => navigate(PATHS.HOME)}>Explorar ahora</Button>
        </section>

        <section className="flex justify-end">
          <img src={bookshelf} alt="Librero con libros" className="w-full h-auto object-contain" />
        </section>
      </main>
    </div>
  );
}