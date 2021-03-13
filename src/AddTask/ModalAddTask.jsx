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
      discription: ""
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
    this.props.getValueAddTask(title, discription);
  }

  componentDidMount(){
    this.inputRef.current.focus();
  }

  render(){
    const {handleCloseModal, isEmptyMarkedTasks} = this.props;
    return (
      <Modal show={true} onHide={() => handleCloseModal(true)}>
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
          disabled={isEmptyMarkedTasks}
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
            disabled={isEmptyMarkedTasks}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleCloseModal(true)}>Close</Button>
        <Button 
            className="ml-3"
            onClick={this.passValue}
            disabled={isEmptyMarkedTasks}
            >
            Add
        </Button>
      </Modal.Footer>
    </Modal>
    )
  }
}
ModalAddTask.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  getValueAddTask: PropTypes.func.isRequired,
  isEmptyMarkedTasks: PropTypes.bool.isRequired
}
export default ModalAddTask;