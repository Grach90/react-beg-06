import React, {createRef} from "react";
import {Modal, Button, Form, InputGroup} from "react-bootstrap";
import style from "./AddTask.module.css";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";

class ModalAddTask extends React.PureComponent {
  constructor(props){
    super(props)
    this.inputRef = createRef();
    this.state = {
      title: "",
      description: "",
      ...this.props.editTask
    }
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    })
  }
  passValue= () => {
    const {title, description} = this.state;
    if(title === "" || description === "" )
    return;
    this.props.getValueAddTask(title, description);
  }
  componentDidMount(){
    this.inputRef.current.focus();
  }

  render(){
    const {handleCloseModal, editTask, handleEditTask} = this.props;
      return (
        <Modal 
          show={true} 
          onHide={(editTask) ? () => handleCloseModal("isModalEditTask") : () => handleCloseModal("isModalAddTask")}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          {(editTask) ? "Edit Task" : "Add Task"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <Form.Control 
              name= "title"
              type="text" 
              placeholder="Task Name"
              onChange={this.handleChange}
              value= {this.state.title}
              onKeyPress={({key}) => key === "Enter" ? this.passValue() : ""}
              ref={this.inputRef}
            />
            
          </InputGroup>
          <InputGroup>
            <Form.Control
              name= "description" 
              as="textarea" 
              placeholder="description"
              className={style.textarea}
              value= {this.state.description}
              onChange={this.handleChange}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={(editTask) ? () => handleCloseModal("isModalEditTask") : () => handleCloseModal("isModalAddTask")}
          >Close
          </Button>
          <Button 
              className="ml-3"
              onClick={(editTask) ? () => handleEditTask(this.state) : this.passValue}
          >
              {(editTask) ? "Save" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
      )
  }
}
ModalAddTask.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  getValueAddTask: PropTypes.func.isRequired,
  editTask: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
  }),
  handleEditTask: PropTypes.func.isRequired
}
export default ModalAddTask;