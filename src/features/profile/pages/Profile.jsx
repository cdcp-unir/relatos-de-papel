import { GlobalContext } from '../../../shared/context/GlobalContext';
import { avatar } from "../../../shared/hooks/useAvatar";
import { currencyFormat } from '../../../shared/hooks/useCurrencyFormat';
import { getLoginState } from "../../../state/loginState";
import { useContext } from 'react';

const Profile = () => {
  const {firstName, lastName, email, date} = getLoginState();
  const { initials } = avatar(firstName, lastName);
  const { formatCurrency } = currencyFormat();
  const { books } = useContext(GlobalContext);

  const pedidos = [
    {
      fecha: "16/abril/2026",
      total: 95.14,
      estado: "Pendiente",
      badge: "badge-warning",
      numero: "N° 87345423-234234",
      items: books.slice(0, 5),
    },
    {
      fecha: "14/marzo/2026",
      total: 77.15,
      estado: "Entregado",
      badge: "badge-success",
      numero: "N° 87345423-234234",
      items: books.slice(10, 15),
    },
    {
      fecha: "6/enero/2026",
      total: 86.14,
      estado: "Entregado",
      badge: "badge-success",
      numero: "N° 87345423-234234",
      items: books.slice(20, 21),
    },
    {
      fecha: "17/septiembre/2025",
      total: 59.47,
      estado: "Entregado",
      badge: "badge-success",
      numero: "N° 87345423-234234",
      items: books.slice(1, 3),
    },
    {
      fecha: "6/marzo/2025",
      total: 45.26,
      estado: "Entregado",
      badge: "badge-success",
      numero: "N° 87345277-234234",
      items: books.slice(26, 30),
    },
  ];

  return (
    <div className="flex flex-col gap-8 p-6 max-w-5xl mx-auto">
      {/* Perfil */}
      <div className="card bg-base-100 shadow-md p-6 flex items-center gap-6">
        <div className="avatar">
          <div className="w-20 rounded-full bg-primary text-white flex items-center justify-center">
            <span className="text-2xl font-bold">{initials}</span>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold">{`${firstName} ${lastName}`}</h2>
          <p className="text-sm opacity-70">{email}</p>
          <p className="text-xs text-primary">Miembro desde {date}</p>
        </div>
      </div>

      {/* Pedidos */}
      <h2 className="text-lg font-semibold">Tus pedidos más recientes</h2>

      {pedidos.map((pedido, idx) => (
        <details key={idx} className="collapse bg-base-100 border border-base-300 rounded-md">
          <summary className="collapse-title font-semibold">
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-4">
                Pedido realizado: <span className="font-normal">{pedido.fecha}</span>
              </div>
              <div className="col-span-2">
                Total: <span className="font-normal">{formatCurrency(pedido.total)}</span>
              </div>
              <div className="col-span-2">
                <div className={`badge ${pedido.badge}`}>{pedido.estado}</div>
              </div>
              <div className="col-span-4">
                Pedido: <span className="font-normal">{pedido.numero}</span>
              </div>
            </div>
          </summary>
          <div className="collapse-content text-sm">
            <ul className="divide-y divide-base-200">
              {pedido.items.map((book, index) => (
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
      ))}
    </div>
  );
};

export default Profile;
