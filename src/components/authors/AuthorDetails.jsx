import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";
import { getProfile } from "../../managers/userProfileManager";
import { getPostsByUser } from "../../managers/postManager";

export default function AuthorDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getProfile(id).then(setUser);
    getPostsByUser(id).then(setPosts);
  }, [id]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString();

  if (!user) {
    return (
      <Container className="mt-5">
        <p>Loading author...</p>
      </Container>
    );
  }

  if (!posts.length) {
    return (
      <Container className="mt-4">
      <Row className="mb-4 align-items-center">
        <Col md="2">
          {user.imageLocation && (
            <img
              src={user.imageLocation}
              alt={`${user.firstName} ${user.lastName}`}
              className="img-fluid rounded-circle"
            />
          )}
        </Col>
        <Col md="10">
          <h2>{user.firstName} {user.lastName}</h2>
          <h2 className="text-muted">No Posts by this Author :p</h2>
        </Col>
      </Row>
      </Container>
    )
  }

  return (
    <Container className="mt-4">
      <Row className="mb-4 align-items-center">
        <Col md="2">
          {user.imageLocation && (
            <img
              src={user.imageLocation}
              alt={`${user.firstName} ${user.lastName}`}
              className="img-fluid rounded-circle"
            />
          )}
        </Col>
        <Col md="10">
          <h2>{user.firstName} {user.lastName}</h2>
          <p className="text-muted">Posts by this author</p>
        </Col>
      </Row>

      <Row>
        <Col md="8">
          {posts.map((post) => (
            <Card className="mb-3" key={post.id}>
              <CardBody>
                <CardTitle tag="h5">{post.title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted">
                  {post.subTitle}
                </CardSubtitle>
                <CardText className="text-muted">
                  {post.body}
                </CardText>

                <div className="d-flex justify-content-between text-muted small">
                  <span>Published: {formatDate(post.publishedOn)}</span>
                  <span>Read Time: {post.realTime} min</span>
                </div>
                <div className="text-muted small mt-1">
                  Category: {post.category?.name}
                </div>
              </CardBody>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
