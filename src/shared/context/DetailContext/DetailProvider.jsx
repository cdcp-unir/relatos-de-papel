import { useState } from "react";
import { DetailContext } from "./DetailsContext";

export function DetailProvider({ children }) {

    const [busqueda, setBusqueda] = useState("");

    return (
        <DetailContext.Provider value={{ busqueda, setBusqueda }}>
            {children}
        </DetailContext.Provider>
    )
}