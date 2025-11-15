const _apiUrl = "/api/Category";

export const getCategories = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const deleteCategory = (id) => {
  return fetch(`${_apiUrl}/${id}`, {method: "DELETE"});
};
