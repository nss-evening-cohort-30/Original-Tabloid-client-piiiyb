import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "../managers/postManager";
import { getAllUserProfiles } from "../managers/userProfileManager";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
import { tryGetLoggedInUser } from "../managers/authManager";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    tryGetLoggedInUser().then((user) => {
      console.log("User object returned from API:", user); 
      if (user) {
        console.log("User ID:", user.id);
      }
      setLoggedInUser(user);
    });
  }, []);
  

  useEffect(() => {
    getAllPosts().then(setPosts);
    getAllUserProfiles().then(setAuthors);
  }, []);



  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString();

  if (!posts.length) {
    return (
      <Container className="mt-5">
        <h2>Latest Posts</h2>
        <p>No posts</p>
      </Container>
    );
  }

  const bigPost = posts[0];
  const smallPosts = posts.slice(1);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Latest Posts</h2>
      <Row>
        <Col md="8">
          <Card className="mb-4">
            <CardBody>
              <CardTitle tag="h3">{bigPost.title}</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h5">
                {bigPost.subTitle}
              </CardSubtitle>

              <CardText>{bigPost.body}</CardText>

              <div className="d-flex justify-content-between text-muted small">
                <span>Published: {formatDate(bigPost.publishedOn)}</span>
                <span>Read Time: {bigPost.realTime} min</span>
              </div>
              <div className="text-muted small mt-1">
                By {bigPost.user?.firstName} {bigPost.user?.lastName} •{" "}
                {bigPost.category?.name}
              </div>
            </CardBody>
          </Card>
          </Col>

          

          <Col md="4">
            {smallPosts.map((post) => (
              <Card className="mb-3" key={post.id}>
                <CardBody>
                  <CardTitle tag="h5" className="mb-1">
                    {post.title}
                  </CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
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
                    By {post.user?.firstName} • {post.category?.name}
                  </div>
                </CardBody>
              </Card>
            ))}
          </Col>

        <Col md="4">
          <h5 className="mb-3">Authors</h5>
          {authors.map((author) => (
            <Card
              className="mb-2"
              key={author.id}
              style={{ cursor: "pointer" }}
            >
              <CardBody className="d-flex align-items-center p-2">
                <Link
                  to={`/authors/${author.id}`}
                  className="d-flex align-items-center text-decoration-none text-dark w-100"
                >
                  {author.imageLocation && (
                    <img
                      src={author.imageLocation}
                      alt={`${author.firstName} ${author.lastName}`}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginRight: "10px",
                      }}
                    />
                  )}
                  <span>{author.firstName} {author.lastName}</span>
                </Link>
              </CardBody>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
