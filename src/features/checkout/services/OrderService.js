import { post } from "../../../shared/services/httpClient";

export async function registerOrder({
  items
}) {
  const response = await post(
    "/orders-service/api/v1/orders",
    {
       items
    }
  );

  return response;
}
