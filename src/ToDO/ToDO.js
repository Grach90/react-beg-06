import React from "react";
import AddTask from "../AddTask/AddTask";
import Task from "../Task/Task";
import {Container, Row, Col} from "react-bootstrap";
import rendom from "../helpers/Rendom";


class ToDo extends React.Component{
    state = {
        tasks: [
             {title: "Task 1", _id: rendom()},
             {title: "Task 2", _id: rendom()},
             {title: "Task 3", _id: rendom()}
        ],
        inputValue: ''
    }
    handleS = (value) => {
        const tasks = [...this.state.tasks]; 
        const obj = {title: value, _id: rendom()};
        tasks.push(obj);
        this.setState({
            tasks
        }) 
    }
    removeTask = (value, id) => {
        if(value){
        const tasks = this.state.tasks.filter((title) => title._id !== id);
        this.setState({
            tasks
        })
      }
    }
    render(){
        const Tasks = this.state.tasks.map((task, index) => {
            return (<Col key={index} xs={12} sm={6} md={4} lg={3}>
                        <Task  task={task.title} removeTask={this.removeTask} id={task._id} />
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