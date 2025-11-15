import { useState, useEffect } from "react";
import { getCategories } from "../managers/categoryManager";


export default function Categories({ setDetailsBikeId }) {
  const [Categories, setCategories] = useState([]);

  const getAllCategories = () => {
    getCategories().then(setCategories);
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <>
      <h2>Categories</h2>
      {Categories.map((c) => (
        // insert categories here
        <>{c.name}</>
      ))}
    </>
  );
}
