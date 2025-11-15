import { useState, useEffect } from "react";
import { deleteCategory, getCategories } from "../managers/categoryManager";
import { Card, CardBody, ListGroup, ListGroupItem } from "reactstrap";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const getAllCategories = () => {
    getCategories().then(setCategories);
  };

  const deleteHandler = (categoryId) => {
    deleteCategory(categoryId).then(() => {
      getAllCategories();
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
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "rgba(255,255,255,1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.8)")
              }
            >
              <span>{c.name}</span>

              <Button
                color="danger"
                size="sm"
                onClick={() => deleteHandler(c.id)}
                style={{
                  borderRadius: "6px",
                }}
              >
                Delete
              </Button>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
}
