export default function Profile() {
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

                    <li className="p-4 pb-2 opacity-60 tracking-wide text-2xl">Tus pedidos más recientes</li>

                    <li className="list-row">
                        <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" /></div>
                        <div>
                            <div>Las crónicas de Narnia - El viajero del alba</div>
                            <div className="text-xs uppercase font-semibold opacity-60">C. S. Lewis</div>
                        </div>
                    </li>

                    <li className="list-row">
                        <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" /></div>
                        <div>
                            <div>Cien años de soledad</div>
                            <div className="text-xs uppercase font-semibold opacity-60">Gabriel García Marquez</div>
                        </div>
                    </li>

                    <li className="list-row">
                        <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" /></div>
                        <div>
                            <div>Freddy el hamster</div>
                            <div className="text-xs uppercase font-semibold opacity-60">Dietlof Reiche</div>
                        </div>
                    </li>

                    <li className="list-row">
                        <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" /></div>
                        <div>
                            <div>Amigo se escribe con H</div>
                            <div className="text-xs uppercase font-semibold opacity-60">Maria Fernanda Heredia</div>
                        </div>
                    </li>

                    <li className="list-row">
                        <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" /></div>
                        <div>
                            <div>Voces en la arena</div>
                            <div className="text-xs uppercase font-semibold opacity-60">Helena Burbano</div>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
}