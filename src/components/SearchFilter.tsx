import React from "react";
import { Modal, Button } from "react-bootstrap";

interface SearchFilterProps {
  onHide: () => void;
  show: boolean;
}

function SearchFilter(props: SearchFilterProps) {
  return (
    <div>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={props.onHide}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SearchFilter;
