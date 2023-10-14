module.exports = function absoluteUrl(url) {
  const baseUrl = process.env.BASE_URL + ":" + process.env.PORT; // Replace with your base URL
  return `${baseUrl}${url}`;
};
