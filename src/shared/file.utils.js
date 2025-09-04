export const fetchJson = (url) => {
  return fetch(url).then((response) => response.json());
};
