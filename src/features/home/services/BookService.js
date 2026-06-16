import { get } from "../../../shared/services/httpClient";

const BOOKS_ENDPOINT = "/catalogue-service/api/v1/books";

export async function getBooks({
  page = 1,
  limit = 10,
  search = "",
  author = "",
  category = "",
  isbn = "",
  title = "",
} = {}) {
  return get(
    BOOKS_ENDPOINT,
    {
      page,
      limit,
      search,
      author,
      category,
      isbn,
      title,
    },
    {
      auth: true,
    },
  );
}

