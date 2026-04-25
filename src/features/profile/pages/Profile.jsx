import { GlobalContext } from '../../../shared/context/GlobalContext';
import { avatar } from "../../../shared/hooks/avatar";
import { currencyFormat } from '../../../shared/hooks/useCurrencyFormat';
import { useContext } from 'react';

const Profile = () => {
  const { initials } = avatar("Cristian", "Chiguano");
  const { formatCurrency } = currencyFormat();
  const { books } = useContext(GlobalContext);

  return (
    <>
      <div className="flex flex-col gap-6 p-6 max-w-5xl mx-auto">
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <div className="avatar avatar-online">
                <div className="w-16 rounded-full bg-neutral text-neutral-content flex items-center justify-center">
                  <span className="text-xl font-bold">{initials}</span>
                </div>
              </div>
            </div>
            <div className="stat-value text-lg font-bold">Cristian Chiguano</div>
            <div className="stat-title text-sm opacity-70">
              cristiandavid.9298@comunidadunir.net
            </div>
            <div className="stat-desc text-primary text-xs">
              Miembro desde 12 de marzo de 2024
            </div>
          </div>
        </div>

        <h2 className="card-title text-lg">Tus pedidos más recientes</h2>

        <details className="collapse bg-base-100 border-base-300 border">
          <summary className="collapse-title font-semibold">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4">Pedido realizado: <span className="font-normal">16/abril/2026</span></div>
              <div className="col-span-2">Total: <span className="font-normal">$95.14</span></div>
              <div className="col-span-2"><div className="badge badge-warning">Pendiente</div></div>
              <div className="col-span-4">Pedido: <span className="font-normal">N° 87345423-234234</span></div>
            </div>
          </summary>
          <div className="collapse-content text-sm">
            <ul className="divide-y divide-base-200">
              {books.slice(0, 5).map((book, index) => (
                <li key={index} className="py-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-semibold">{book.titulo}</div>
                    <div className="font-normal">{book.autor}</div>
                    <div className="text-left">{formatCurrency(book.precio)}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </details>

        <details className="collapse bg-base-100 border-base-300 border">
          <summary className="collapse-title font-semibold">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4">Pedido realizado: <span className="font-normal">14/marzo/2026</span></div>
              <div className="col-span-2">Total: <span className="font-normal">$77.15</span></div>
              <div className="col-span-2"><div className="badge badge-success">Entregado</div></div>
              <div className="col-span-4">Pedido: <span className="font-normal">N° 87345423-234234</span></div>
            </div>
          </summary>
          <div className="collapse-content text-sm">
            <ul className="divide-y divide-base-200">
              {books.slice(10, 15).map((book, index) => (
                <li key={index} className="py-3">
                  <div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="font-semibold">{book.titulo}</div>
                      <div className="font-normal">{book.autor}</div>
                      <div className="text-left">{formatCurrency(book.precio)}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </details>

        <details className="collapse bg-base-100 border-base-300 border">
          <summary className="collapse-title font-semibold">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4">Pedido realizado: <span className="font-normal">6/enero/2026</span></div>
              <div className="col-span-2">Total: <span className="font-normal">$86.14</span></div>
              <div className="col-span-2"><div className="badge badge-success">Entregado</div></div>
              <div className="col-span-4">Pedido: <span className="font-normal">N° 87345423-234234</span></div>
            </div>
          </summary>
          <div className="collapse-content text-sm">
            <ul className="divide-y divide-base-200">
              {books.slice(20, 21).map((book, index) => (
                <li key={index} className="py-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-semibold">{book.titulo}</div>
                    <div className="font-normal">{book.autor}</div>
                    <div className="text-left">{formatCurrency(book.precio)}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </details>

        <details className="collapse bg-base-100 border-base-300 border">
          <summary className="collapse-title font-semibold">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4">Pedido realizado: <span className="font-normal">17/septiembre/2025</span></div>
              <div className="col-span-2">Total: <span className="font-normal">$59.47</span></div>
              <div className="col-span-2"><div className="badge badge-success">Entregado</div></div>
              <div className="col-span-4">Pedido: <span className="font-normal">N° 87345423-234234</span></div>
            </div>
          </summary>
          <div className="collapse-content text-sm">
            <ul className="divide-y divide-base-200">
              {books.slice(1, 3).map((book, index) => (
                <li key={index} className="py-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-semibold">{book.titulo}</div>
                    <div className="font-normal">{book.autor}</div>
                    <div className="text-left">{formatCurrency(book.precio)}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </details>

        <details className="collapse bg-base-100 border-base-300 border">
          <summary className="collapse-title font-semibold">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4">Pedido realizado: <span className="font-normal">6/marzo/2025</span></div>
              <div className="col-span-2">Total: <span className="font-normal">$45.26</span></div>
              <div className="col-span-2"><div className="badge badge-success">Entregado</div></div>
              <div className="col-span-4">Pedido: <span className="font-normal">N° 87345277-234234</span></div>
            </div>
          </summary>
          <div className="collapse-content text-sm">
            <ul className="divide-y divide-base-200">
              {books.slice(26, 30).map((book, index) => (
                <li key={index} className="py-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-semibold">{book.titulo}</div>
                    <div className="font-normal">{book.autor}</div>
                    <div className="text-left">{formatCurrency(book.precio)}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </details>
      </div>
    </>

  );
};

export default Profile;
