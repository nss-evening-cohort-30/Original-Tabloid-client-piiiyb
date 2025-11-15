const _apiUrl = "/api/Category";

export const getCategories = () => {
  return fetch(apiUrl).then((res) => res.json());
};
