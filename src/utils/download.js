// src/utils/download.js

/**
 * Triggers a browser download for a given content string.
 * Creates a temporary anchor element, sets its href to a blob URL,
 * and programmatically clicks it, then cleans up.
 *
 * @param {string} content - The text content of the file to download.
 * @param {string} filename - The suggested name for the downloaded file.
 * @param {string} [mimeType='text/plain'] - The MIME type of the content.
 */
export function downloadFile(content, filename, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
