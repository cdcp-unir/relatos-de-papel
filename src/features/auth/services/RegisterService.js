function validateUserExists(users, email, username) {
  const emailExists = users.some((user) => user.email === email);
  const usernameExists = users.some((user) => user.username === username);

  if (emailExists && usernameExists) {
    throw new Error("EMAIL_AND_USERNAME_EXISTS");
  }

  if (emailExists) {
    throw new Error("EMAIL_EXISTS");
  }

  if (usernameExists) {
    throw new Error("USERNAME_EXISTS");
  }

  return false;
}

export async function register({ email, username, password }) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const users = (await import("@mocks/users.json")).default;

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
