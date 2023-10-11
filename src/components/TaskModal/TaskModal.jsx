import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import TaskForm from "../TaskForm/TaskForm";

const TaskModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <TaskForm task={props.task} hideModal={props.onHide} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModal;
