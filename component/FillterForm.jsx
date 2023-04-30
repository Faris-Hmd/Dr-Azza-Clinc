import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { BiCategory } from "react-icons/bi";
import { FaFilter } from "react-icons/fa";
export function FillterForm({ setfillterShow, setKeyword, keyword }) {
  return (
    <Form className="mt-1">
      <InputGroup className="shadow-sm border rounded mb-2">
        <Form.Control
          type="text"
          name="keyword"
          placeholder="Search what you want"
          className="p-2 rounded border-0"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
        />
        {keyword !== "" && (
          <Button
            className="border-0 bg-sec text-muted"
            // variant="outline-secondary"
            onClick={() => {
              setKeyword("");
            }}
          >
            +
          </Button>
        )}
        <Button
          className="border-0 bg-sec text-muted"
          // variant="outline-secondary"
          onClick={() => {
            setfillterShow(true);
          }}
        >
          <BiCategory />
        </Button>
      </InputGroup>
    </Form>
  );
}

export function SearchModal({
  fillterShow,
  setfillterShow,
  setCategory,
  category,
}) {
  return (
    <Modal
      show={fillterShow}
      onHide={() => {
        setfillterShow(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Search Menu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Chose the category</Form.Label>
            <Form.Select
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              value={category}
            >
              <option value="ALL">ALL</option>
              <option value="LOREM">LOREM</option>
              <option value="IPSUM">IPSUM</option>
              <option value="DOLLOR">DOLLOR</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          className="bg-clr-green"
          onClick={() => setfillterShow(false)}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
