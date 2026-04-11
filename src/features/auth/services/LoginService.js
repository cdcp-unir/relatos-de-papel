import { setLoginState } from '../../../state/loginState';

export const login = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const usersResponse = await import('@mocks/users.json');
    const user = usersResponse.default.find(u => u.email === email);

    if (!user) {
        throw new Error('USER_NOT_FOUND');
    }

    if (user.password !== password) {
        throw new Error('INVALID_PASSWORD');
    }

    setLoginState({
        isAuthenticated: true,
        email,
        userId: user.id,
        role: user.role,        
    });

    return { email, userId: user.id, role: user.role };
}