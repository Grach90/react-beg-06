import React from "react";
import AddTask from "../AddTask/AddTask";
import Task from "../Task/Task";
import {Container, Row, Col} from "react-bootstrap";

class ToDo extends React.Component{
    state = {
        tasks: ["Task 1", "Task 2", "Task 3"],
        inputValue: ''
    }

    handleS = (value) => {
        const tasks = [...this.state.tasks];
        tasks.push(value);
        this.setState({
            tasks
        })
    }

    render(){
        const Tasks = this.state.tasks.map((task, index) => {
            return (<Col key={index} xs={12} sm={6} md={4} lg={3}>
                        <Task  task={task} />
                    </Col>
            )
        })
        return(
            <Container>
                 <Row>
                    <h1> ToDo Component </h1>
                 </Row>
                 <Row>   
                    <AddTask handleS={this.handleS} />
                 </Row>
                 <Row className="mt-3">
                    {Tasks}
                 </Row>
            </Container>
        )
    }
}

export default ToDo;