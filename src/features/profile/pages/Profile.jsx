import { formatDate } from '../../../shared/utils/dateFormat';
import { GlobalContext } from '../../../shared/context/GlobalContext';
import { avatar } from "../../../shared/hooks/useAvatar";
import { currencyFormat } from '../../../shared/hooks/useCurrencyFormat';
import { getLoginState } from "../../../state/loginState";
import { useContext, useEffect, useState } from 'react';
import { getOrders } from "../services/OrdersService";

const Profile = () => {
  const { firstName, lastName, email, date, userId } = getLoginState();
  const { initials } = avatar(firstName, lastName);
  const { formatCurrency } = currencyFormat();
  const { books } = useContext(GlobalContext);

  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarPedidos() {
      try {
        const data = await getOrders({ userId: userId });
        setPedidos(data);
      } catch (error) {
        console.error("Error al cargar pedidos:", error);
      } finally {
        setLoading(false);
      }
    }
    cargarPedidos();
  }, []);

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
          <p className="text-xs text-primary">último acceso: {formatDate(date)}</p>
        </div>
      </div>

      {/* Pedidos */}
      <h2 className="text-lg font-semibold">Tus pedidos más recientes</h2>

      {loading ? (
        <p>Cargando pedidos...</p>
      ) : (
        pedidos.orders.map((pedido, idx) => (
          <details key={idx} className="collapse bg-base-100 border border-base-300 rounded-md">
            <summary className="collapse-title font-semibold">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-4">
                  Pedido realizado: <span className="font-normal">{formatDate(pedido.date)}</span>
                </div>
                <div className="col-span-2">
                  Total: <span className="font-normal">{formatCurrency(pedido.total)}</span>
                </div>
                <div className="col-span-2">
                  <div className={`badge ${pedido.badge}`}>{pedido.status}</div>
                </div>
                <div className="col-span-4">
                  Pedido: <span className="font-normal">{pedido.id}</span>
                </div>
              </div>
            </summary>
            <div className="collapse-content text-sm">
              <ul className="divide-y divide-base-200">
                {pedidos.orders[idx].items.map((book, index) => (
                  <li key={index} className="py-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="font-semibold">{book.name}</div>
                      <div className="text-left">Precio: {formatCurrency(book.price)}</div>
                      <div className="text-left">Cant: {book.quantity}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))
      )}
    </div>
  );
};

export default Profile;
