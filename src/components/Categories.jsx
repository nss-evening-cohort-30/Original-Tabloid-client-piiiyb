import { useState, useEffect } from "react";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../managers/categoryManager";
import { Button, Card, CardBody, ListGroup, ListGroupItem } from "reactstrap";

export default function Categories() {
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [updateACategory, setUpdateACategory] = useState("");

  const getAllCategories = () => {
    getCategories().then(setCategories);
  };

  const deleteHandler = (categoryId) => {
    deleteCategory(categoryId).then(() => {
      getAllCategories();
    });
  };

  const createHandler = () => {
    if (!newCategory) return;
    createCategory({ name: newCategory }).then(() => {
      getAllCategories();
      setNewCategory("");
    });
  };

  const updateHander = (id) => {
    if (!updateCategory) return;
    updateCategory(id, { name: updateACategory }).then(() => {
      getAllCategories();
      setEditingCategoryId(null);
      setUpdateACategory("");
    });
  };
  
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Card
      style={{
        backgroundColor: "rgba(200, 200, 200, 0.4)", 
        padding: "1rem",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        maxWidth: "500px",
        margin: "20px auto",
      }}
    >
      <CardBody>
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Categories
        </h2>

        <ListGroup flush>
        {categories.map((c) => (
          <ListGroupItem
            key={c.id}
            style={{
              marginBottom: "8px",
              padding: "12px 16px",
              backgroundColor: "rgba(255,255,255,0.8)",
              borderRadius: "8px",
              border: "1px solid rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "0.2s",
              display: "flex",
              justifyContent: "space-between",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "rgba(255,255,255,1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.8)")
            }
          >
            <span>#{c.name}</span>
            <div style={{ display: "flex", gap: "6px" }}>
              {editingCategoryId === c.id ? (
                <>
                  <input
                    type="text"
                    value={updateACategory}
                    onChange={(e) => setUpdateACategory(e.target.value)}
                    style={{ height: "30px", borderRadius: "6px", padding: "2px 6px" }}
                  />
                  <Button
                    color="success"
                    size="sm"
                    onClick={() => updateHander(c.id)}
                    style={{ borderRadius: "6px" }}
                  >
                    Submit
                  </Button>
                </>
                ) : (
                <>
                  <Button
                    color="primary"
                    size="sm"
                    onClick={() => {
                      setEditingCategoryId(c.id);
                      setUpdateACategory(c.name);
                    }}
                    style={{ borderRadius: "6px" }}
                  >
                    Update
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => deleteHandler(c.id)}
                    style={{ borderRadius: "6px" }}
                  >
                    Delete
                  </Button>
                </>
              )}
            </div>
          </ListGroupItem>
        ))}
        <ListGroupItem
          style={{
            marginTop: "12px",
            backgroundColor: "rgba(255,255,255,0.8)",
            borderRadius: "8px",
            textAlign: "center",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          <h3 color="primary">Add a Category</h3>
        </ListGroupItem>
        <ListGroupItem
          style={{
            marginTop: "10px",
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: "8px",
            padding: "12px",
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Category name"
            className="form-control"
            style={{ flex: 1 }}
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button color="success" onClick={createHandler} disabled={!newCategory} >Submit</Button>
        </ListGroupItem>
      </ListGroup>
      </CardBody>
    </Card>
  );
}
