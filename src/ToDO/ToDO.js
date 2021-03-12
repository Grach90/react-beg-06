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
        checkMarkedTask: true
    }

    getValueAddTask = (inputValue) => {
            let {tasks} = this.state; 
            tasks.push({name: inputValue, _id: random()});
            this.setState({
                tasks
            });
    };

    removeTask = (_id) => {
        let {tasks} = this.state;
        tasks = tasks.filter(task => task._id !== _id);
        this.setState({
            tasks
        });
    }
    removeMarkedTasks = () => {
        const markedTasks = new Set(this.state.markedTasks);
        let {tasks} = this.state;

        tasks = tasks.filter(task => !markedTasks.has(task._id));
        this.setState({
            tasks,
            markedTasks: new Set()
        })
    }
    handleMarkedTasks = (_id) => {
        const markedTasks = new Set(this.state.markedTasks);
        if(markedTasks.has(_id))
        markedTasks.delete(_id);
        else
        markedTasks.add(_id);
        this.setState({
            markedTasks
        });
    }
    handleAllMark = () => {
        let {tasks, checkMarkedTask} = this.state;
        let markedTasks = new Set(this.state.markedTasks);

        if(checkMarkedTask){
            tasks.forEach(task => markedTasks.add(task._id));
            checkMarkedTask = !checkMarkedTask;
        }else{
            markedTasks.clear();
            checkMarkedTask = !checkMarkedTask;
        } 
        this.setState({
            markedTasks,
            checkMarkedTask
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
                    isEmptyMarkedTasks= {!!this.state.markedTasks.size}
                     />
                </Col>
            )
        })
        return ( 
            <Container>
                <AddTask
                getValueAddTask= {this.getValueAddTask} 
                isEmptyMarkedTasks= {!!this.state.markedTasks.size}
                />
                <Row className="justify-content-center">
                {this.state.tasks.length !== 0 ? tasks : "There are not tasks"}
                </Row>
                <Row className="mt-5 justify-content-center">
                    <Button disabled={!this.state.tasks.length} onClick={this.removeMarkedTasks} className="mr-5" variant="danger">
                        Delete
                    </Button>
                    <Button disabled={!this.state.tasks.length} onClick={this.handleAllMark} variant="primary">
                        {this.state.tasks.length === this.state.markedTasks.size ? "Remove Checks" : "Check All"}
                    </Button>
                </Row>
            </Container>
        )
    }
}

export default ToDo;