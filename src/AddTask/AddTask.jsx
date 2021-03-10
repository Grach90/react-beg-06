import React from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import style from "../AddTask/AddTask.module.css";

class AddTask extends React.Component{
    state ={
        inputValue:''
    }
    handleChange = (event) => {

        const {value} = event.target;
        this.setState({
            inputValue: value
        })
    }
    handleSubmit = () => {
        if(!this.state.inputValue)
        return;
        const {handleS} = this.props;
        handleS(this.state.inputValue);
        this.setState({
            inputValue: ''
        })
    }
    
    render(){
        return (
            <Container>
                <Row className="flex-nowrap mt-5">
                    <Form.Control 
                        placeholder="Task Name" 
                        onKeyPress={(e) => e.key == "Enter" ? this.handleSubmit() : ""}
                        placeholder="Task Name" 
                        type="text" 
                        onChange={this.handleChange} 
                        value={this.state.inputValue}
                        disabled={this.props.checkSelectTasks ? true : false}
                    /> 
                    <Button 
                        className={style.button} 
                        onClick={this.handleSubmit} 
                        disabled={this.props.checkSelectTasks || !this.state.inputValue}
                        >Add Task
                    </Button> 
                </Row>
               </Container>
        )
    }
}

export default AddTask;