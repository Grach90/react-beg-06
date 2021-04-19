import {useEffect} from "react";
import {Modal, Button, Form, InputGroup} from "react-bootstrap";
import style from "./AddTask.module.css";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import dateformator from "../../../helpers/dateformator";
import {connect} from 'react-redux';
import { createRef } from "react";
import types from '../../../Redux/actionTypes';

const ModalAddTaskWithRedux = (props) => {
  
  const { 
  //state
  editTaskFromState,
  //from ToDo
  editableTask,
  getValueAddTask,
  handleCloseModal,
  handleEditTask,
  //from reducer
  getEditTask,
  setStartDate,
  handleChange,
  resetModalState
  } = props;
  
  const inputRef = createRef();

  const passValue = () => {
    const {title, description} = editTaskFromState;
    if( !title || !description )
    return;
    editTaskFromState.date = dateformator(editTaskFromState.date);
    
    getValueAddTask(editTaskFromState);
  }

  const handleEditableTask = () => {
    editTaskFromState.date = dateformator(editTaskFromState.date);
    handleEditTask(editTaskFromState);
  }

  useEffect(() => {
    inputRef.current.focus();
    getEditTask(editableTask);
    return () => {
      resetModalState();
    }
  },[]);

      return (
        <Modal 
          show={true} 
          onHide={(editableTask) ? () => handleCloseModal("isModalEditTask") : () => handleCloseModal("isModalAddTask")}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          {(editableTask) ? "Edit Task" : "Add Task"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <Form.Control 
              name= "title"
              type="text" 
              placeholder="Task Name"
              onChange={handleChange}
              value= {editTaskFromState.title}
              onKeyPress={({key}) => key === "Enter" ? passValue() : ""}
              ref={inputRef}
            />
          </InputGroup>
          <InputGroup>
            <Form.Control
              name= "description" 
              as="textarea" 
              placeholder="description"
              className={style.textarea}
              value= {editTaskFromState.description}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mt-3">
            <DatePicker selected={editTaskFromState.date} onChange={setStartDate} />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={(editableTask) ? () => handleCloseModal("isModalEditTask") : () => handleCloseModal("isModalAddTask")}
          >Close
          </Button>
          <Button 
              className="ml-3"
              onClick={(editableTask) ? handleEditableTask : passValue}
          >
              {(editableTask) ? "Save" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
      )
}

const mapStateToProps = (state) => {
  return {
    editTaskFromState: {...state.moadalAddTaskState}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  getEditTask: (editableTask) => dispatch({type: types.GET_EDIT_TASK, editableTask}),
  setStartDate: (date) => dispatch({type: types.SET_DATE, date}),
  handleChange: (e) =>  dispatch({type: types.HANDLE_CHANGE_MODAL, e}),
  resetModalState: () => dispatch({type: types.RESET_MODAL_STATE})
  }
}

ModalAddTaskWithRedux.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  getValueAddTask: PropTypes.func,
  editTask: PropTypes.oneOfType([
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      _id: PropTypes.string,
      date: PropTypes.object
    }),
    PropTypes.object
  ]), 
  handleEditTask: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddTaskWithRedux);