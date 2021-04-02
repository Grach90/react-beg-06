import React from "react";
import Task from "./Task/Task";
import {Row, Col, Button} from "react-bootstrap";
import ModalAddTask from "./AddTask/ModalAddTask";
import ConfirmModl from "./Confirm/ConfirmModal";
import dateformator from "../../helpers/dateformator";
import Spiner from '../Spiner/Spiner';
import style from './ToDo.module.css';




class ToDo extends React.Component {
    state = {
        tasks: [],
        markedTasks: new Set(),
        checkMarkedTask: true,
        isModalAddTask: true,
        isConfirmModal: true,
        isModalEditTask:true,
        editTask: null,
        loading: false
    }
    
    getValueAddTask = (task) => {
        this.setState({loading: true});
        (async() => {
            try {
                task.date = dateformator(task.date);
                let response = await fetch("http://localhost:3001/task", {
                    method: "POST",
                    body: JSON.stringify(task),
                    headers: {
                        "Content-Type":"application/json"
                    }
                })
                let data = await response.json();
                if(data.error) throw data.error;
                let {tasks} = this.state; 
                tasks.push(data);
                this.setState({
                    tasks,
                    isModalAddTask: true
                }); 
            } catch(error){
                console.log("Error", error);
            } finally {
                this.setState({loading: false});
            }
        })();  
    };

    removeTask = (deleteTask) => {
        this.setState({loading: true});
        fetch(`http://localhost:3001/task/${deleteTask._id}`, {method: "DELETE"})
        .then(res => res.json())
        .then(data => {
            if(data.error) throw data.error;
            let {tasks} = this.state;
            tasks = tasks.filter(task => task._id !== deleteTask._id);
            this.setState({
                tasks,
            });
        })
        .catch(error => console.log("Error", error))
        .finally(() => this.setState({loading: false}));
    }
    
    removeMarkedTasks = () => {
        this.setState({loading: true});
        const markedTasks = new Set(this.state.markedTasks);
        fetch("http://localhost:3001/task", {
            method: "PATCH",
            body: JSON.stringify({tasks: Array.from(markedTasks)}),
            headers: {
                "Content-Type":"application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.error) throw data.error;
            let {tasks} = this.state;
            tasks = tasks.filter(task => !markedTasks.has(task._id));
            this.setState({
                tasks,
                markedTasks: new Set(),
                isConfirmModal: true
            })
        })
        .catch(error => console.log("Error", error))
        .finally(() => this.setState({loading: false})); 
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
    handleCloseModal = (name) => {
        this.setState({
            [name]: true,
            editTask: null
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
    handleOpenEditTaskModal = (editTask) => {
        editTask.date = new Date(editTask.date);
        this.setState({
            isModalEditTask: false,
            editTask
        })
    }
    handleEditTask = (editTask) => {
        this.setState({loading: true});
        editTask.date = dateformator(editTask.date);
        fetch(`http://localhost:3001/task/${editTask._id}`, {
            method: "PUT",
            body: JSON.stringify(editTask),
            headers: {
                "Content-Type":"application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.error) throw data.error;
            let index = this.state.tasks.findIndex((task) => task._id === editTask._id);
            let tasks = [...this.state.tasks];
            tasks[index] = data;
            this.setState({
                tasks,
                isModalEditTask: true,
                editTask:null
            })
        })
        .catch(error => console.log("Error", error))
        .finally(() => this.setState({loading: false}));
    }

    componentDidMount(){
        this.setState({
            loading: true
          });
        fetch("http://localhost:3001/task")
        .then(response => response.json())
        .then(data => {
            if(data.error) throw data.error;
            this.setState({tasks: data});
        })
        .catch(error => console.log("Error", error))
        .finally(() => this.setState({loading: false}));
    }

    render() {
        let {isModalAddTask, isConfirmModal, isModalEditTask, loading} = this.state;
        const isAddEditModal = (isModalEditTask===false || isModalAddTask===false) ? false : true;
        const tasks = this.state.tasks.map(task => {
            return (
                <Col key={task._id}>
                    <Task 
                    task={task}
                    removeTask= {this.removeTask}
                    handleMarkedTasks={this.handleMarkedTasks}
                    cheked={!!this.state.markedTasks.has(task._id)}
                    isEmptyMarkedTasks= {!!this.state.markedTasks.size}
                    handleOpenEditTaskModal= {this.handleOpenEditTaskModal}
                     />
                </Col>
            )
        })
        return ( 
            <div className={style.mainDiv}>
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
                    {loading && <Spiner />}
                    {isAddEditModal || <ModalAddTask 
                        handleCloseModal= {this.handleCloseModal}
                        getValueAddTask= {this.getValueAddTask} 
                        editTask= {this.state.editTask}
                        handleEditTask= {this.handleEditTask}
                    />} 
                {isConfirmModal || <ConfirmModl
                removeMarkedTasks= {this.removeMarkedTasks}
                handleCloseConfirmModal= {this.handleCloseConfirmModal}
                count= {this.state.markedTasks.size}
                 />}
            </div>
        )
    }
}

export default ToDo;