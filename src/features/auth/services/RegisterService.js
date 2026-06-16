import { post } from "../../../shared/services/httpClient";

export async function register({
  firstName,
  lastName,
  email,
  password,
  role = "user",
}) {
  const response = await post(
    "/users-service/api/v1/users",
    {
      firstName,
      lastName,
      email,
      password,
      role,
    },
    {
      auth: false,
    },
  );

  return response;
}
