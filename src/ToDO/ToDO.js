import React from "react";
import AddTask from "../AddTask/AddTask";
import Task from "../Task/Task";
import {Container, Row, Col, Button} from "react-bootstrap";
import rendom from "../helpers/Rendom";


class ToDo extends React.Component{
    state = {
        tasks: [
             {title: "Task 1", _id: rendom()},
             {title: "Task 2", _id: rendom()},
             {title: "Task 3", _id: rendom()}
        ],
        inputValue: '',
        selectedTasks: new Set(),
        checkSelectTasks:"",
        deletedTasks: new Set()
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
            tasks,
        })
      }
    }
    selectTask = (id) => {
        let selectedTasks = new Set(this.state.selectedTasks);
        if(!selectedTasks.has(id)) 
        selectedTasks.add(id);
        else
        selectedTasks.delete(id);
        let checkSelectTasks = !!selectedTasks.size ? true : false;
        this.setState({
            selectedTasks,
            checkSelectTasks
        })
    }
    deleteSelectedTasks = () => {
        let selectedTasks = new Set(this.state.selectedTasks);
        let tasks = [...this.state.tasks];
        tasks = tasks.filter(task => !selectedTasks.has(task._id));
        let checkSelectTasks = false;
        this.setState({
            tasks,
            checkSelectTasks,
        })
    }
  
    render(){
        console.log("ToDo Render");
        const Tasks = this.state.tasks.map((task, index) => {
            return (<Col key={task._id} xs={12} sm={6} md={4} lg={3}>
                        <Task  task={task.title} 
                        removeTask={this.removeTask} 
                        id={task._id} 
                        selectTask={this.selectTask}
                        checkSelectTasks={this.state.checkSelectTasks}
                        selectedTasks={this.state.selectedTasks}
                         />
                    </Col>
            )
        })
        return(
            <Container>
                 <Row>   
                    <AddTask handleS={this.handleS} checkSelectTasks={this.state.checkSelectTasks} />
                 </Row>
                 <Row className="mt-3">
                    {Tasks.length !== 0 ? Tasks : <Col className=" d-flex justify-content-center">There are not Tasks</Col>} 
                 </Row>
                 <Row className="mt-5 d-flex justify-content-center">
                    <Button 
                    onClick={this.deleteSelectedTasks} 
                    variant="danger"
                    disabled={this.state.checkSelectTasks ? false : true}
                    >Delete Tasks</Button>
                 </Row>
            </Container>
        )
    }
}

export default ToDo;