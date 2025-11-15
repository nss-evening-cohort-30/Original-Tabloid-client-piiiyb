const _apiUrl = "/api/category";

export const getCategories = () => {
  return fetch(apiUrl).then((res) => res.json());
};
