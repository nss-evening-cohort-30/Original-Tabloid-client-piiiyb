const _apiUrl = "/api/tag";

export const getAllTags = () => {
  return fetch(_apiUrl, {
    method: "GET",
    credentials: "same-origin",
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Failed to fetch tags");
    }
  });
};

export const getTagById = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "GET",
    credentials: "same-origin",
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else if (res.status === 404) {
      throw new Error("Tag not found");
    } else {
      throw new Error("Failed to fetch tag");
    }
  });
};

export const createTag = (tag) => {
  return fetch(_apiUrl, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tag),
  }).then((res) => {
    if (res.status === 201) {
      return res.json();
    } else if (res.status === 400) {
      return res.text().then((errorMessage) => {
        throw new Error(errorMessage);
      });
    } else {
      throw new Error("Failed to create tag");
    }
  });
};

export const updateTag = (id, tag) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "PUT",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tag),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else if (res.status === 400) {
      return res.text().then((errorMessage) => {
        throw new Error(errorMessage);
      });
    } else if (res.status === 404) {
      throw new Error("Tag not found");
    } else {
      throw new Error("Failed to update tag");
    }
  });
};

export const deleteTag = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "DELETE",
    credentials: "same-origin",
  }).then((res) => {
    if (res.status === 204) {
      return Promise.resolve();
    } else if (res.status === 404) {
      throw new Error("Tag not found");
    } else {
      throw new Error("Failed to delete tag");
    }
  });
};
