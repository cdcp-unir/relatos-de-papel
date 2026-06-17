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
  const params = {
    page,
    limit,
  };

  if (search?.trim()) {
    params.search = search.trim();
  }

  if (author?.trim()) {
    params.author = author.trim();
  }

  if (category?.trim()) {
    params.category = category.trim();
  }

  if (isbn?.trim()) {
    params.isbn = isbn.trim();
  }

  if (title?.trim()) {
    params.title = title.trim();
  }

  return get(BOOKS_ENDPOINT, params, {
    auth: false,
  });
}
