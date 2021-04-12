import { connect } from "react-redux";
import {useEffect} from "react";
import Task from "./Task/Task";
import {Row, Col, Button} from "react-bootstrap";
import ModalAddTask from "./AddTask/ModalAddTask";
import ConfirmModl from "./Confirm/ConfirmModal";
import Spiner from '../Spiner/Spiner';
import style from './ToDo.module.css';


const ToDoWithRedux = (props) => {
  let {toDoState: {
    tasks,
    isModalAddTask, 
    isConfirmModal, 
    isModalEditTask, 
    loading,
    markedTasks,
    editTask
    },
    toggleSetLoading,
    getTask,
    remov_eTask,
    addTask,
    deleteMarketTasks,
    chekedTasks,
    markAllTasks,
    openModal,
    closeModal,
    toggleConfirmModal,
    openEditTaskModal,
    edit_Task
  } = props;

  const handleEditTask = (editTableask) => {
    toggleSetLoading();
    fetch(`http://localhost:3001/task/${editTableask._id}`, {
        method: "PUT",
        body: JSON.stringify(editTableask),
        headers: {
            "Content-Type":"application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.error) throw data.error;
        let index = tasks.findIndex((task) => task._id === editTableask._id);
        tasks[index] = data;
        edit_Task(tasks);
    })
    .catch(error => console.log("Error", error))
    .finally(() => toggleSetLoading());
}

  const handleOpenEditTaskModal = (editTask) => {
    openEditTaskModal(editTask)
}

  const handleCloseModal = (name) => {
    closeModal(name);
}

  const handleMarkedTasks = (_id) => {
    if(markedTasks.has(_id))
    markedTasks.delete(_id);
    else
    markedTasks.add(_id);
    chekedTasks(markedTasks);
  }

  const removeMarkedTasks = () => {
    toggleSetLoading();
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
        tasks = tasks.filter(task => !markedTasks.has(task._id));
        deleteMarketTasks(tasks);
    })
    .catch(error => console.log("Error", error))
    .finally(() => toggleSetLoading()); 
  }

  const getValueAddTask = (task) => {
    toggleSetLoading();
    (async() => {
        try {
            let response = await fetch("http://localhost:3001/task", {
                method: "POST",
                body: JSON.stringify(task),
                headers: {
                    "Content-Type":"application/json"
                }
            })
            let data = await response.json();
            if(data.error) throw data.error;
            tasks.push(data);
            addTask(tasks);
        } catch(error){
            console.log("Error", error);
        } finally {
          toggleSetLoading();
        }
    })();  
  };

  const removeTask = (deleteTask) => {
    toggleSetLoading();
    fetch(`http://localhost:3001/task/${deleteTask._id}`, {method: "DELETE"})
    .then(res => res.json())
    .then(data => {
        if(data.error) throw data.error;
        tasks = tasks.filter(task => task._id !== deleteTask._id);
        remov_eTask(tasks);
    })
    .catch(error => console.log("Error", error))
    .finally(() => toggleSetLoading());
  }

  useEffect(() => {
    toggleSetLoading();
  fetch("http://localhost:3001/task")
  .then(response => response.json())
  .then(data => {
      if(data.error) throw data.error;
      getTask(data);
  })
  .catch(error => console.log("Error", error))
  .finally(() => toggleSetLoading());
  }, []);

  const isAddEditModal = (isModalEditTask===false || isModalAddTask===false) ? false : true;
  const tasksJSX = tasks.map(task => {
      return (
          <Col key={task._id}>
              <Task 
              task={task}
              removeTask= {removeTask}
              handleMarkedTasks={handleMarkedTasks}
              cheked={!!markedTasks.has(task._id)}
              isEmptyMarkedTasks= {!!markedTasks.size}
              handleOpenEditTaskModal= {handleOpenEditTaskModal}
                />
          </Col>
      )
  })

  return ( 
    <div className={style.mainDiv}>
        <Row className="justify-content-center mt-3">
        <Button onClick={() => openModal()} disabled= {!!markedTasks.size}>
            Add Task
        </Button>
        </Row>
        <Row className="justify-content-center">
        {tasks.length !== 0 ? tasksJSX : "There are not tasks"}
        </Row>
        <Row className="mt-5 justify-content-center">
            <Button disabled={!tasks.length || !!!markedTasks.size} 
            onClick={toggleConfirmModal} 
            className="mr-5" variant="danger"
            >
            Delete
            </Button>
            <Button disabled={!tasks.length} onClick={markAllTasks} variant="primary">
                {tasks.length === markedTasks.size ? "Remove Checks" : "Check All"}
            </Button>
            </Row>
            {loading && <Spiner />}
            {isAddEditModal || <ModalAddTask 
                handleCloseModal= {handleCloseModal}
                getValueAddTask= {getValueAddTask} 
                editTask= {editTask}
                handleEditTask= {handleEditTask}
            />} 
        {isConfirmModal || <ConfirmModl
        removeMarkedTasks= {removeMarkedTasks}
        toggleConfirmModal= {toggleConfirmModal}
        count= {markedTasks.size}
         />}
    </div>
)
}

const mapStateToProps = (state) => {
  return {
      ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSetLoading: () => dispatch({type: 'SET_LOADING'}),
    getTask: (data) => dispatch({type: 'GET_TASK', data}),
    remov_eTask: (tasks) => dispatch({type: 'REMOVE_TASK', tasks}),
    addTask: (tasks) => dispatch({type: 'ADD_TASK', tasks}),
    deleteMarketTasks: (tasks) => dispatch({type: 'REMOVE_MARKED_TASKS', tasks}),
    chekedTasks: (markedTasks) => dispatch({type: 'MARKED_TASKS', markedTasks}),
    markAllTasks: () =>  dispatch({type: 'MARK_ALL_TASKS'}),
    openModal: () => dispatch({type: 'OPEN_MODAL'}),
    closeModal: (name) => dispatch({type: 'CLOSE_MODAL', name}),
    toggleConfirmModal: () => dispatch({type: 'TOGGLE_CONFIRM_MODAL'}),
    openEditTaskModal: (editTask) => dispatch({type: 'OPEN_EDIT_TASK_MODAL', editTask}),
    edit_Task: (tasks) => dispatch({type: 'EDIT_TASK', tasks})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoWithRedux);
