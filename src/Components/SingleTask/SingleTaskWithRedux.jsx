import {connect} from 'react-redux';
import style from "./singleTask.module.css";
import {useEffect} from "react";
import {Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import ModalAddTaskWithRedux from "../ToDo/AddTask/ModalAddTaskWithRedux";
import PropTypes from "prop-types";
import Spiner from '../Spiner/Spiner';
import types from '../../Redux/actionTypes';
import {removeSingleTaskThunk, handleEditSingleTaskThunk, getsingleTaskThunk} from '../../Redux/action';

const SingleTaskWithRedux = (props) => {
  const {state:{singleTask, isModalAddTask, loading}} = props;
  const {
    resetState,
    removeTask,
    handleEditTask,
    getSingleTask,
    handleCloseModal
  } = props;
  
  console.log(singleTask);

  useEffect(() => {
    getSingleTask(props.match.params);
    return () => {
      resetState();
    }
  }, []);
  
  if(!singleTask) return <Spiner />
  return (
      <div className={style.singleTask}>
          <div> Title: {singleTask.title}</div>
          <div>Description: {singleTask.description}</div>
          {/* <div>Date: {singleTask.date.toISOString().slice(0, 10)}</div> */}
          <div style={{marginTop: "20px"}}>
            <Button onClick={() => removeTask(singleTask, props.history)} variant="primary">
                <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Button onClick={handleCloseModal} variant="danger" className="ml-3 mr-5">
                <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button onClick={() => props.history.goBack()}>Go Back</Button>
          </div>
          {loading && <Spiner />}
          {isModalAddTask || <ModalAddTaskWithRedux 
          handleCloseModal= {handleCloseModal}
          editableTask= {singleTask}
          handleEditTask= {handleEditTask}
          />}
      </div>
  )
}

const mapStateToProps = (state) => {
  return {
    state: {...state.singleTaskState, ...state.globalState}
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      handleCloseModal: () => dispatch({type: types.CLOSE_SINGLETASK_MODAL}),
      resetState: () => dispatch({type: types.RESET_SINGLETASK_STATE}),
      removeTask: (singleTask, history) => {
        dispatch((dispatch) => removeSingleTaskThunk(dispatch, singleTask, history));
      },
      handleEditTask: (singleTask) => {
        dispatch((dispatch) => handleEditSingleTaskThunk(dispatch, singleTask));
      }, 
      getSingleTask: (params) => dispatch((dispatch) => getsingleTaskThunk(dispatch, params))
    }
}
SingleTaskWithRedux.propTypes = {
  singleTask: PropTypes.oneOfType([
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      _id: PropTypes.string,
      date: PropTypes.object
    }),
    PropTypes.object
  ]),
  handleEditTask: PropTypes.func
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleTaskWithRedux);