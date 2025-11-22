import { useEffect, useState } from "react";
import { DropdownItem, DropdownToggle, Form, UncontrolledDropdown, DropdownMenu } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost } from "../managers/postManager";
import { getAllCategories } from "../managers/categoryManager";

export default function UpdateForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    body: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getPostById(id).then((data) => {
      setPost(data);
      setFormData({
        title: data.title || "",
        subTitle: data.subTitle || "",
        body: data.body || "",
        categoryId: data.categoryId || "",
      });
    });

    getAllCategories().then(setCategories);
  }, [id]);

  const selectedCategory = categories.find(c => c.id === formData.categoryId);

  const handleCategoryChange = (categoryId) => {
    setFormData(prev => ({ ...prev, categoryId }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updatePost(id, formData).then(() => {
      navigate("/");  // 👈 redirects to home
    });
  };

  if (!post) return <p>Loading...</p>;

  return (
    <Form style={{ padding: "20px" }} onSubmit={handleSubmit}>
      <input name="title" value={formData.title} onChange={handleChange} />
      <input name="subTitle" value={formData.subTitle} onChange={handleChange} />
      <textarea name="body" value={formData.body} onChange={handleChange} rows={8} style={{ width: "100%" }} />

      <UncontrolledDropdown>
        <DropdownToggle caret color="dark">
          {selectedCategory ? selectedCategory.name : "Select Category"}
        </DropdownToggle>

        <DropdownMenu dark>
          {categories.map(cat => (
            <DropdownItem key={cat.id} onClick={() => handleCategoryChange(cat.id)}>
              {cat.id}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>

      <button type="submit">Submit</button>
    </Form>
  );
}
