import {Modal, Button} from "react-bootstrap";
import PropTypes from "prop-types";
import {memo} from "react";

function ConfirmModal({handleCloseConfirmModal, removeMarkedTasks, count}){
  return (
    <Modal
        size="lg"
        show={true}
        onHide={() => handleCloseConfirmModal(true)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Do you want to delete {count} of tasks ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Button variant="secondary" onClick={() => handleCloseConfirmModal(true)}>Close</Button>
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
  handleCloseConfirmModal: PropTypes.func.isRequired,
  count: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string

  ])
}
export default memo(ConfirmModal);