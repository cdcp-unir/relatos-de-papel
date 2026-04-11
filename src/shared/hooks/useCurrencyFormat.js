import { useCallback } from 'react';

export const currencyFormat = (locale = 'es-EC', currency = 'USD') => {
    const formatCurrency = useCallback((value) => {
        if (typeof value !== 'number') {
            return value;
        }
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
        }).format(value);
    },
        [locale, currency]
    );

    return { formatCurrency };
}
