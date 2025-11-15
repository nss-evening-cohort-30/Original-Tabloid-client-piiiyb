const _apiUrl = "/api/Category";

export const getCategories = () => {
  return fetch(_apiUrl).then((res) => res.json());
};
