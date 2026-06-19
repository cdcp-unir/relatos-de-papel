import { post } from "../../../shared/services/httpClient";

export async function registerOrder({email,
            items}) {
  const response = await post(
    "/orders-service/api/v1/orders",
    {email,
            items}
  );

  return response;
}
