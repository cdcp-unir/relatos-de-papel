import { setLoginState } from '../../../state/loginState';

export const login = async (username, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const usersResponse = await import('../../../mocks/users.json');
    const user = usersResponse.default.find(u => u.username === username);

    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    if (user.password !== password) {
        throw new Error('Contraseña incorrecta');
    }

    setLoginState({
        isAuthenticated: true,
        username,
        userId: user.id,
        role: user.role
    });

    return { username, userId: user.id, role: user.role };
}