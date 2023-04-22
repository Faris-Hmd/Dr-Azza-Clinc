import { Container, Spinner } from "react-bootstrap";

export default function SpinnerLoading() {
  return (
    <Container
      fluid
      className="h-100 p-0 d-flex justify-content-center align-items-center"
    >
      <Spinner />
    </Container>
  );
}
