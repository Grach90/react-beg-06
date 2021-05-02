import { connect } from "react-redux";
import {useEffect} from "react";
import Task from "./Task/Task";
import {Row, Col, Button} from "react-bootstrap";
import ModalAddTaskWithRedux from "./AddTask/ModalAddTaskWithRedux";
import ConfirmModl from "./Confirm/ConfirmModal";
import Spiner from '../Spiner/Spiner';
import style from './ToDo.module.css';
import types from './../../Redux/actionTypes';
import Search from '../Search/Search';
import {handleEditTaskThunk, 
  removeMarkedTasksthunk, 
  addTaskThunk, 
  removeTaskThunk, 
  useEffectTrunk,
  handleActiveTaskThunk
} from '../../Redux/action';


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
    resetToDoState,
    handleActiveTask
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
              handleActiveTask={handleActiveTask}
                />
          </Col>
      )
  })

  return ( 
    <div className={style.mainDiv}>
       <Search />
        <Row className={style.buttonsRow}>
        <Button onClick={() => openModal()} disabled= {!!markedTasks.size}>
            Add Task
        </Button>
        <Button disabled={!tasks.length || !!!markedTasks.size} 
            onClick={toggleConfirmModal} 
            className="mr-5 ml-5" variant="danger"
            >
            Delete
            </Button>
            <Button disabled={!tasks.length} onClick={markAllTasks} variant="primary">
                {tasks.length === markedTasks.size ? "Remove Checks" : "Check All"}
            </Button>
        </Row>
        <Row className={style.tasksRow}>
          {tasks.length !== 0 ? tasksJSX : "There are not tasks"}
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
      dispatch((dispatch) => handleEditTaskThunk(dispatch, editTableTask));
    }, 
    chekedTasks: (_id) => dispatch({type: types.MARKED_TASKS, _id}),
    markAllTasks: () =>  dispatch({type: types.MARK_ALL_TASKS}),
    openModal: () => dispatch({type: types.OPEN_MODAL}),
    closeModal: (name) => dispatch({type: types.CLOSE_MODAL, name}),
    toggleConfirmModal: () => dispatch({type: types.TOGGLE_CONFIRM_MODAL}),
    openEditTaskModal: (editTask) => dispatch({type: types.OPEN_EDIT_TASK_MODAL, editTask}),
    resetToDoState: () => dispatch({type: types.RESET_TODO_STATE}),
    handleActiveTask: (task) => {
      dispatch((dispatch) => handleActiveTaskThunk(dispatch, task))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoWithRedux);
