import React from "react";
import Task from "../Task/Task";
import AddTask from "../AddTask/AddTask";
import random from "../helpers/Rendom";
import {Container, Row, Col, Button} from "react-bootstrap";


class ToDo extends React.Component {
    state = {
        tasks: [
            {
                name: "Task 1",
                _id: random()
            },
            {
                name: "Task 2",
                _id: random()
            },
            {
                name: "Task 3",
                _id: random()
            }
        ],
        markedTasks: new Set(),
        checkMarkedTask: true,
        isEmptyMarkedTasks: false,
        isEmptyTasks: false
    }

    getValueAddTask = (inputValue) => {
            let {tasks, isEmptyTasks} = this.state; 
            tasks.push({name: inputValue, _id: random()});
            isEmptyTasks = false;
            this.setState({
                tasks,
                isEmptyTasks
            });
    };

    removeTask = (_id) => {
        let {tasks, isEmptyTasks} = this.state;
        tasks = tasks.filter(task => task._id !== _id);
        if(tasks.length === 0)
        isEmptyTasks = true;
        this.setState({
            tasks,
            isEmptyTasks
        })
    }
    removeMarkedTasks = () => {
        const markedTasks = new Set(this.state.markedTasks);
        let {tasks, isEmptyTasks, isEmptyMarkedTasks} = this.state;

        tasks = tasks.filter(task => !markedTasks.has(task._id));
        if(tasks.length === 0)
        isEmptyTasks = true;
        isEmptyMarkedTasks = false;
        this.setState({
            tasks,
            markedTasks: new Set(),
            isEmptyTasks,
            isEmptyMarkedTasks
        })
    }
    handleMarkedTasks = (_id) => {
        const markedTasks = new Set(this.state.markedTasks);
        let {isEmptyMarkedTasks} = this.state;
        if(markedTasks.has(_id))
        markedTasks.delete(_id);
        else
        markedTasks.add(_id);
        isEmptyMarkedTasks = !!markedTasks.size;
        this.setState({
            markedTasks,
            isEmptyMarkedTasks
        })
    }
    handleAllMark = () => {
        let {tasks, checkMarkedTask, isEmptyMarkedTasks} = this.state;
        let markedTasks = new Set(this.state.markedTasks);

        if(checkMarkedTask){
            tasks.forEach(task => markedTasks.add(task._id));
            checkMarkedTask = !checkMarkedTask;
        }else{
            markedTasks.clear();
            checkMarkedTask = !checkMarkedTask;
        } 
        isEmptyMarkedTasks = !!markedTasks.size;
        this.setState({
            markedTasks,
            checkMarkedTask,
            isEmptyMarkedTasks
        })   
    }
    render() {
        const tasks = this.state.tasks.map(task => {
            return (
                <Col key={task._id}>
                    <Task 
                    task={task}
                    removeTask= {this.removeTask}
                    handleMarkedTasks={this.handleMarkedTasks}
                    cheked={!!this.state.markedTasks.has(task._id)}
                    isEmptyMarkedTasks= {this.state.isEmptyMarkedTasks}
                     />
                </Col>
            )
        })
        return ( 
            <Container>
                <AddTask
                getValueAddTask= {this.getValueAddTask} 
                isEmptyMarkedTasks= {this.state.isEmptyMarkedTasks}
                />
                <Row className="justify-content-center">
                {this.state.tasks.length !== 0 ? tasks : "There are not tasks"}
                </Row>
                <Row className="mt-5 justify-content-center">
                    <Button disabled={this.state.isEmptyTasks} onClick={this.removeMarkedTasks} className="mr-5" variant="danger">
                        Delete
                    </Button>
                    <Button disabled={this.state.isEmptyTasks} onClick={this.handleAllMark} variant="primary">
                        {this.state.tasks.length === this.state.markedTasks.size ? "Remove Checks" : "Check All"}
                    </Button>
                </Row>
            </Container>
        )
    }
}

export default ToDo;