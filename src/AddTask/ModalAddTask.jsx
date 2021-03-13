import React, {createRef} from "react";
import {Modal, Button, Form, InputGroup} from "react-bootstrap";
import style from "./AddTask.module.css";
import PropTypes from "prop-types";

class ModalAddTask extends React.PureComponent {
  constructor(props){
    super(props)
    this.inputRef = createRef();
    this.state = {
      title: "",
      discription: "",
      editTitle: this.props.editTask.title,
      editDiscription: this.props.editTask.discription
    }
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    })
  }
  passValue= () => {
    const {title, discription} = this.state;
    if(title === "" || discription === "" )
    return;
    this.props.getValueAddTask(title, discription);
  }
  editTask = () => {
    let {editTask} = this.props;
    editTask.title = this.state.editTitle;
    editTask.discription = this.state.editDiscription;
    this.props.handleEditTask(editTask);
  }

  componentDidMount(){
    this.inputRef.current.focus();
  }

  render(){
    const {handleCloseModal, isModalAddTask, isModalEditTask} = this.props;
    if(!isModalAddTask){
      return (
        <Modal show={true} onHide={() => handleCloseModal("isModalAddTask")}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Task
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
              name= "discription" 
              as="textarea" 
              placeholder="discription"
              className={style.textarea}
              value= {this.state.discription}
              onChange={this.handleChange}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal("isModalAddTask")}>Close</Button>
          <Button 
              className="ml-3"
              onClick={this.passValue}
              >
              Add
          </Button>
        </Modal.Footer>
      </Modal>
      )
    } else  if(!isModalEditTask){
      return (
        <Modal show={true} onHide={() => handleCloseModal("isModalEditTask")}>
        <Modal.Header closeButton>
          <Modal.Title >
            Edit Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <Form.Control 
            name= "editTitle"
            type="text" 
            onChange={this.handleChange}
            value= {this.state.editTitle}
            onKeyPress={({key}) => key === "Enter" ? this.editTask() : ""}
            ref={this.inputRef}
            />
            
          </InputGroup>
          <InputGroup>
            <Form.Control
              name= "editDiscription" 
              as="textarea" 
              className={style.textarea}
              value= {this.state.editDiscription}
              onChange={this.handleChange}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal("isModalEditTask")}>Close</Button>
          <Button 
              className="ml-3"
              onClick={this.editTask}
              >
              Save
          </Button>
        </Modal.Footer>
      </Modal>
      )
    }
  }
}
ModalAddTask.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  getValueAddTask: PropTypes.func.isRequired,
  isModalEditTask: PropTypes.bool.isRequired,
  isModalAddTask: PropTypes.bool.isRequired,
  editTask: PropTypes.shape({
    title: PropTypes.string.isRequired,
    discription: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
  }),
  handleEditTask: PropTypes.func.isRequired
}
export default ModalAddTask;