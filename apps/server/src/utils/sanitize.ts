import DOMPurify from 'isomorphic-dompurify';

export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'b', 'i', 'strong', 'em',
      'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre', 'img', 'br', 'span', 'div'
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel']
  });
};
