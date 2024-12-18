const CommonUtils = {
  /**
   * Encodes special characters in a string into HTML entities.
   * @param {string} str - The input string to encode.
   * @returns {string} - The encoded string with HTML entities.
   */
  encodeHtml: (str) => {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;") // Replace '&' with '&amp;'
      .replace(/</g, "&lt;") // Replace '<' with '&lt;'
      .replace(/>/g, "&gt;") // Replace '>' with '&gt;'
      .replace(/"/g, "&quot;") // Replace '"' with '&quot;'
      .replace(/'/g, "&#39;"); // Replace "'" with '&#39;'
  },

  /**
   * Decodes HTML entities back into special characters.
   * @param {string} str - The input string to decode.
   * @returns {string} - The decoded string with special characters.
   */
  decodeHtml: (str) => {
    if (!str) return "";
    return str
      .replace(/&amp;/g, "&") // Replace '&amp;' with '&'
      .replace(/&lt;/g, "<") // Replace '&lt;' with '<'
      .replace(/&gt;/g, ">") // Replace '&gt;' with '>'
      .replace(/&quot;/g, '"') // Replace '&quot;' with '"'
      .replace(/&#39;/g, "'"); // Replace '&#39;' with "'"
  },
};

export default CommonUtils;