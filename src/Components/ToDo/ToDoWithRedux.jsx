import { connect } from "react-redux";
import {useEffect} from "react";
import Task from "./Task/Task";
import {Row, Col, Button} from "react-bootstrap";
import ModalAddTaskWithRedux from "./AddTask/ModalAddTaskWithRedux";
import {Link, Redirect} from 'react-router-dom';
import ConfirmModl from "./Confirm/ConfirmModal";
import Spiner from '../Spiner/Spiner';
import style from './ToDo.module.css';
import types from './../../Redux/actionTypes';
import Search from '../Search/Search';
import Zoom from 'react-reveal/Bounce';
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
    handleActiveTask,
    location
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

  const page = [];
  for(let i = 0; i < Math.ceil(tasks.length/6); i++){
        page.push(
          <Row key={i} className={style.pageLink}>
            <Link to={`/${i+1}`}>
              {i+1}
            </Link>
          </Row>
        )
     }

     if(loading) return <Spiner />

  const isAddEditModal = (isModalEditTask===false || isModalAddTask===false) ? false : true;
  const path = +location.pathname.slice(1);
  if(!Number.isInteger(path) || (path === 0 || path > page.length)) return <Redirect to='/1'/>

  const tasksJSX = [];
  const length = tasks.length > 6 * path ? 6 * path : tasks.length;

  const index =  path === 0 ? 0
  : (tasks.length > 6 && (tasks.length % 6 === 0 || path === 1)) ? path * 6 - 6 
  : tasks.length > 6 ? 6 * (path-1)
  : 0;

  for(let i = index; i < length; i++){
    tasksJSX.push(
          <Col key={tasks[i]._id} className={style.tasksCol}>
              <Task 
              task={tasks[i]}
              cheked={!!markedTasks.has(tasks[i]._id)}
              removeTask= {remov_eTask}
              handleMarkedTasks={chekedTasks}
              isEmptyMarkedTasks= {!!markedTasks.size}
              handleOpenEditTaskModal= {openEditTaskModal}
              handleActiveTask={handleActiveTask}
                />
          </Col>
      )
  }

  
  
  return ( 
    <div className={style.mainDiv}>
        <h1 className={style.reveal}>
          <Zoom left cascade >
            T O D O   L I S T
          </Zoom>
        </h1>
       <Search />
        <Row className={style.buttonsRow}>
          <Row>
            <Button  onClick={() => openModal()} disabled= {!!markedTasks.size}>
                Add Task
            </Button>
            <Button disabled={!tasks.length || !!!markedTasks.size} 
                onClick={toggleConfirmModal} 
            className="mr-5 ml-5" variant="dark" variant='danger'
            >
            Delete
            </Button>
            <Button disabled={!tasks.length} onClick={markAllTasks} >
                {tasks.length === markedTasks.size ? "Remove Checks" : "Check All"}
            </Button>
          </Row>
          <Row className={style.pagination}>
            {page}
          </Row>
           
          <Row className={style.tasksRow}>
            {tasks.length !== 0 ? tasksJSX : "There are not tasks"}
          </Row>
          {page}
        </Row>
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
