import React from "react";
import Task from "../Task/Task";
import random from "../helpers/Rendom";
import {Container, Row, Col, Button} from "react-bootstrap";
import ModalAddTask from "../AddTask/ModalAddTask";
import ConfirmModl from "../Confirm/ConfirmModal";


class ToDo extends React.Component {
    state = {
        tasks: [
            {
                title: "Task 1",
                discription: "Task 1",
                _id: random()
            },
            {
                title: "Task 2",
                discription: "Task 2",
                _id: random()
            },
            {
                title: "Task 3",
                discription: "Task 3",
                _id: random()
            }
        ],
        markedTasks: new Set(),
        checkMarkedTask: true,
        isModalAddTask: true,
        isConfirmModal: true
    }

    getValueAddTask = (title, discription) => {
            let {tasks} = this.state; 
            tasks.push({title: title, discription: discription, _id: random()});
            this.setState({
                tasks,
                isModalAddTask: true
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
            markedTasks: new Set(),
            isConfirmModal: true
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
    handleOpenModal = () => {
        let {isModalAddTask} = this.state;
        isModalAddTask = !isModalAddTask
        this.setState({
            isModalAddTask
        })
    }
    handleCloseModal = (isModalAddTask) => {
        this.setState({
            isModalAddTask
        })
    }
    handleOpenConfirmModal = () => {
        let {isConfirmModal} = this.state;
        isConfirmModal = !isConfirmModal;
        this.setState({
            isConfirmModal
        })
    }
    handleCloseConfirmModal = (isConfirmModal) => {
        this.setState({
            isConfirmModal
        })
    }
    render() {
        let {isModalAddTask, isConfirmModal} = this.state;
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
                <Row className="justify-content-center mt-3">
                <Button onClick={this.handleOpenModal} disabled= {!!this.state.markedTasks.size}>
                    Add Task
                </Button>
                </Row>
                <Row className="justify-content-center">
                {this.state.tasks.length !== 0 ? tasks : "There are not tasks"}
                </Row>
                <Row className="mt-5 justify-content-center">
                    <Button disabled={!this.state.tasks.length || !!!this.state.markedTasks.size} 
                    onClick={this.handleOpenConfirmModal} 
                    className="mr-5" variant="danger"
                    >
                    Delete
                    </Button>
                    <Button disabled={!this.state.tasks.length} onClick={this.handleAllMark} variant="primary">
                        {this.state.tasks.length === this.state.markedTasks.size ? "Remove Checks" : "Check All"}
                    </Button>
                </Row>
                {isModalAddTask || <ModalAddTask 
                handleCloseModal= {this.handleCloseModal}
                getValueAddTask= {this.getValueAddTask} 
                isEmptyMarkedTasks= {!!this.state.markedTasks.size}
                />}
                {isConfirmModal || <ConfirmModl
                removeMarkedTasks= {this.removeMarkedTasks}
                handleCloseConfirmModal= {this.handleCloseConfirmModal}
                count= {this.state.markedTasks.size}
                 />}
            </Container>
        )
    }
}

export default ToDo;