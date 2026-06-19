import { get } from "../../../shared/services/httpClient";

export async function getOrders(
{userId}
) {
   const orders = await get(`/orders-service/api/v1/orders/users/${userId}/recent`,{auth: false});
   return orders;
}