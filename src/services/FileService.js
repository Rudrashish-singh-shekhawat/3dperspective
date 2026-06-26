// src/services/FileService.js

/**
 * Utility service for file operations.
 * Provides a method to trigger a file download, and a method
 * to read a File object as text.
 */
export const FileService = {
  /**
   * Triggers a browser download of a file with the given content and filename.
   * @param {string} content - The text content of the file.
   * @param {string} filename - The name for the downloaded file.
   * @param {string} [mimeType='text/plain'] - The MIME type.
   */
  downloadFile(content, filename, mimeType = 'text/plain') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  /**
   * Reads a File object as text and returns a Promise with its content.
   * @param {File} file
   * @returns {Promise<string>}
   */
  readAsText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  },

  /**
   * Reads a File object as a data URL (useful for images).
   * @param {File} file
   * @returns {Promise<string>}
   */
  readAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }
};