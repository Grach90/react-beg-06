import React from "react";
import AddTask from "../AddTask/AddTask";
import Task from "../Task/Task";
import {Container, Row, Col, Button} from "react-bootstrap";
import rendom from "../helpers/Rendom";


class ToDo extends React.PureComponent{
    state = {
        tasks: [
             {title: "Task 1", _id: rendom()},
             {title: "Task 2", _id: rendom()},
             {title: "Task 3", _id: rendom()}
        ],
        inputValue: '',
        selectedTasks: new Set(),
        checkSelectTasks:"",
        checkButton: true,

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
        this.setState({
            tasks,
            checkSelectTasks: false
        })
    }
    checkAll = () => {
        let {checkButton} = this.state;
        let selectedTasks = new Set(this.state.selectedTasks);
        let checkSelectTasks = this.state.checkSelectTasks;
        if(checkButton){
            selectedTasks.clear();
            this.state.tasks.forEach(task => {
                selectedTasks.add(task._id);
            })
            checkSelectTasks = true;
        }else {
            selectedTasks.clear();
            checkSelectTasks = false;
        }
        checkButton = !checkButton;
        this.setState({
            checkButton,
            selectedTasks,
            checkSelectTasks
        });
    }
  
    render(){
        const Tasks = this.state.tasks.map(task => {
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
        });    
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
                    >Delete Tasks
                    </Button>
                    <Button
                    className="ml-5"
                    variant="primary"
                    onClick={this.checkAll}
                    >
                    {this.state.selectedTasks.size === this.state.tasks.length ? "Remove Checked" : "All Check"}
                    </Button>
                 </Row>
            </Container>
        ); 
    }
}

export default ToDo;