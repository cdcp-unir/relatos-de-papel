import books from "./../../../mocks/books.json"

const Profile = () => {
    return (
        <>
            <div className="flex flex-col gap-2 p-3">
                <div>
                    <div className="stats shadow">
                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <div className="avatar avatar-online avatar-placeholder">
                                    <div className="bg-neutral text-neutral-content w-16 rounded-full">
                                        <span className="text-xl">CC</span>
                                    </div>
                                </div>
                            </div>
                            <div className="stat-value">Cristian Chiguano</div>
                            <div className="stat-title">cristiandavid.9298@comunidadunir.net</div>
                            <div className="stat-desc text-primary">Miembro desde 12 de marzo de 2024</div>
                        </div>
                    </div>
                </div>

                <ul className="list bg-base-100 rounded-box shadow-md">

                    <li className="p-4 pb-2 opacity-60 tracking-wide text-3xl">Tus pedidos más recientes</li>
                    {books.slice(0, 5).map((book) => (
                        <li className="list-row">                            
                            <div>
                                <div className="text-xl">{book.titulo}</div>
                                <div className="text-xs uppercase font-semibold opacity-60">{book.autor}</div>
                                <div className="text-xs uppercase font-semibold opacity-60">{book.precio}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Profile;