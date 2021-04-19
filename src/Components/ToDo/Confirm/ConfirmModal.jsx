import {Modal, Button} from "react-bootstrap";
import PropTypes from "prop-types";
import {memo} from "react";

function ConfirmModal({toggleConfirmModal, removeMarkedTasks, count}){
  return (
    <Modal
        size="lg"
        show={true}
        onHide={() => toggleConfirmModal()}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Do you want to delete {count > 1 ? count : count[0].title} of tasks ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Button variant="secondary" onClick={() => toggleConfirmModal()}>Close</Button>
        <Button 
            className="ml-3"
            variant= "danger"
            onClick={() => removeMarkedTasks()}
            >
            Delete
        </Button>
        </Modal.Body>
      </Modal>
  )
}
ConfirmModal.propTypes = {
  removeMarkedTasks: PropTypes.func.isRequired,
  toggleConfirmModal: PropTypes.func.isRequired,
  count: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array

  ])
}
export default memo(ConfirmModal);