export function getBookImageSrc(isbn, size = "L") {
  if (!isbn) {
    return "https://placehold.co/400x600?text=Sin+imagen";
  }

  return `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`;
}