import { connect } from "react-redux";
import {useEffect} from "react";
import Task from "./Task/Task";
import {Row, Col, Button} from "react-bootstrap";
// import ModalAddTask from "./AddTask/ModalAddTask";
import ModalAddTaskWithRedux from "./AddTask/ModalAddTaskWithRedux";
import ConfirmModl from "./Confirm/ConfirmModal";
import Spiner from '../Spiner/Spiner';
import style from './ToDo.module.css';
import {handleEditTaskThunk, 
  removeMarkedTasksthunk, 
  addTaskThunk, 
  removeTaskThunk, 
  useEffectTrunk
} from '../../Redux/action';
import types from './../../Redux/actionTypes';

const ToDoWithRedux = (props) => {
  let {state: {
    tasks,
    isModalAddTask, 
    isConfirmModal, 
    isModalEditTask, 
    loading,
    markedTasks,
    editTask
  },
    getTask,
    remov_eTask,
    addTask,
    removeMarkedTasks,
    chekedTasks,
    markAllTasks,
    openModal,
    closeModal,
    toggleConfirmModal,
    openEditTaskModal,
    edit_Task,
    resetToDoState
  } = props;

  const handleEditTask = (editTableTask) => {
    edit_Task(editTableTask, tasks);
  }

  useEffect(() => {
    getTask();
    return () => {
      resetToDoState();
    }
  }, []);

  const isAddEditModal = (isModalEditTask===false || isModalAddTask===false) ? false : true;
  const tasksJSX = tasks.map(task => {
      return (
          <Col key={task._id}>
              <Task 
              task={task}
              removeTask= {remov_eTask}
              handleMarkedTasks={chekedTasks}
              cheked={!!markedTasks.has(task._id)}
              isEmptyMarkedTasks= {!!markedTasks.size}
              handleOpenEditTaskModal= {openEditTaskModal}
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
            {isAddEditModal || <ModalAddTaskWithRedux 
                handleCloseModal= {closeModal}
                getValueAddTask= {addTask} 
                editableTask= {editTask}
                handleEditTask= {handleEditTask}
            />} 
        {isConfirmModal || <ConfirmModl
        removeMarkedTasks= {() => removeMarkedTasks(markedTasks)}
        toggleConfirmModal= {toggleConfirmModal}
        count= {markedTasks.size === 1 ? tasks.filter(task => markedTasks.has(task._id)) : markedTasks.size}
         />}
    </div>
)
}

const mapStateToProps = (state) => {
  return {
      state: {...state.toDoState, ...state.globalState}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTask: () => { 
      dispatch((dispatch) => useEffectTrunk(dispatch));
    },
    remov_eTask: (task) => {
      dispatch((dispatch) => removeTaskThunk(dispatch, task));
    },
    addTask: (task) => {
       dispatch((dispatch) => addTaskThunk(dispatch, task));
    },
    removeMarkedTasks: (markedTasks) => {
       dispatch((dispatch) => removeMarkedTasksthunk(dispatch,markedTasks));
    },
    edit_Task: (editTableTask, tasks) => {
      dispatch((dispatch) => handleEditTaskThunk(dispatch, tasks, editTableTask));
    }, 
    chekedTasks: (_id) => dispatch({type: types.MARKED_TASKS, _id}),
    markAllTasks: () =>  dispatch({type: types.MARK_ALL_TASKS}),
    openModal: () => dispatch({type: types.OPEN_MODAL}),
    closeModal: (name) => dispatch({type: types.CLOSE_MODAL, name}),
    toggleConfirmModal: () => dispatch({type: types.TOGGLE_CONFIRM_MODAL}),
    openEditTaskModal: (editTask) => dispatch({type: types.OPEN_EDIT_TASK_MODAL, editTask}),
    resetToDoState: () => dispatch({type: types.RESET_TODO_STATE})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoWithRedux);
