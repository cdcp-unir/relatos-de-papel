import { get } from "../../../shared/services/httpClient";

const BOOKS_ENDPOINT = "/catalogue-service/api/v1/books";

export async function getBookById(externalId) {
  return get(
    `${BOOKS_ENDPOINT}/${externalId}`,
    {},
    {
      auth: true,
    },
  );
}
