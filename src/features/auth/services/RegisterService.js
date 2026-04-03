function validateUserExists(users, email, username) {
  const emailExists = users.some((user) => user.email === email);
  const usernameExists = users.some((user) => user.username === username);

  if (emailExists && usernameExists) {
    throw new Error("El correo y el nombre de usuario ya están en uso.");
  }

  if (emailExists) {
    throw new Error("El correo ya está registrado.");
  }

  if (usernameExists) {
    throw new Error("El nombre de usuario ya está en uso.");
  }

  return false;
}

export async function register({ email, username, password }) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const users = (await import("../../../mocks/users.json")).default;

  validateUserExists(users, email, username);
  const newUser = {
    id: users.length + 1,
    email,
    username,
    password,
    role: "user",
  };

  users.push(newUser);
  console.log("Usuario registrado (mock):", { email, username, password });
  return newUser;
}
