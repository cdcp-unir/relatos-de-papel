function validateUserExists(users, email) {
  const emailExists = users.some((user) => user.email === email);
  if (emailExists) {
    throw new Error("EMAIL_EXISTS");
  }

  return false;
}

export async function register({ email, password }) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const users = (await import("@mocks/users.json")).default;

  validateUserExists(users, email);
  const newUser = {
    id: users.length + 1,
    email,
    password,
    role: "user"    
  };

  users.push(newUser);
  console.log("Usuario registrado (mock):", { email, password });
  return newUser;
}
