import DOMPurify from 'dompurify';

export function sanitize(htmlString) {
  return DOMPurify.sanitize(htmlString);
}


// Buang semua tag → jadi plain text
export function stripHtml(htmlString) {
  return DOMPurify.sanitize(htmlString, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
}
