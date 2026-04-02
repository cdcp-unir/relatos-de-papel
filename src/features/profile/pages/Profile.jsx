import books from "./../../../mocks/books.json";

const Profile = () => {
  return (
    <div className="flex flex-col gap-6 p-6 max-w-5xl mx-auto">          
      <div className="stats shadow bg-base-100">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar avatar-online">
              <div className="w-16 rounded-full bg-neutral text-neutral-content flex items-center justify-center">
                <span className="text-xl font-bold">CC</span>
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
      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <h2 className="card-title text-lg">Tus pedidos más recientes</h2>
          <ul className="divide-y divide-base-200">
            {books.slice(0, 5).map((book, index) => (
              <li key={index} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{book.titulo}</p>
                  <p className="text-xs uppercase opacity-70">{book.autor}</p>
                </div>                
              </li>
            ))}
          </ul>          
        </div>
      </div>
    </div>
  );
};

export default Profile;
