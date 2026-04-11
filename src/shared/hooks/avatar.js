import { useMemo } from "react";

export const avatar = (firstName, lastName) => {
    const initials = useMemo(() => {
        const firstLetter = firstName?.trim().charAt(0).toUpperCase() || '';
        const secondLetter = lastName?.trim().charAt(0).toUpperCase() || '';
        return `${firstLetter}${secondLetter}`
    }, [firstName, lastName]);

    return { initials };
}