import {connect} from 'react-redux';
import style from "./singleTask.module.css";
import {useEffect} from "react";
import {Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import ModalAddTask from "../ToDo/AddTask/ModalAddTask";
import PropTypes from "prop-types";
import Spiner from '../Spiner/Spiner';

const SingleTaskWithRedux = (props) => {
  // console.log(props);
  const {state: {singleTaskState: {singleTask, isModalAddTask, loading}}} = props;
  const {
    toggleSetLoading,
    editSingleTask,
    toggleCloseModal
  } = props;
  
  const removeTask = () => {
    toggleSetLoading();
    fetch(`http://localhost:3001/task/${singleTask._id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
      if(data.error) throw data.error;
      toggleSetLoading();
      props.history.push("/");
    })
    .catch(error => {
      console.log("Error", error)
      toggleSetLoading();
    }); 
  }

  const handleCloseModal = () => {
    toggleCloseModal();
  }

  const handleEditTask = (singleTask) => {
    toggleSetLoading();
    (async() => {
      try {
      const response = await fetch(`http://localhost:3001/task/${singleTask._id}`, {
        method: "PUT",
        body: JSON.stringify(singleTask),
        headers: {
          "Content-Type":"application/json"
        }
      });
      const data = await response.json();
      if(data.error) throw data.error;
      editSingleTask(data);
      toggleCloseModal();
    } catch(error) {
      console.log("Error", error);
    } finally {
      toggleSetLoading();
    }
    })();
  }

  useEffect(() => {
    const {id} = props.match.params;
    fetch(`http://localhost:3001/task/${id}`)
    .then(response => response.json())
    .then(singleTask => {
      if(singleTask.error) throw singleTask.error;
      editSingleTask(singleTask);
    })
    .catch((error) => props.history.push('/error', error));
  }, []);
  
  if(!singleTask) return <Spiner />
  return (
      <div className={style.singleTask}>
          <div> Title: {singleTask.title}</div>
          <div>Description: {singleTask.description}</div>
          <div>Date: {singleTask.date.slice(0, 10)}</div>
          <div style={{marginTop: "20px"}}>
            <Button onClick={removeTask} variant="primary">
                <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Button onClick={handleCloseModal} variant="danger" className="ml-3 mr-5">
                <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button onClick={() => props.history.goBack()}>Go Back</Button>
          </div>
          {loading && <Spiner />}
          {isModalAddTask || <ModalAddTask 
          handleCloseModal= {handleCloseModal}
          editTask= {singleTask}
          handleEditTask= {handleEditTask}
          />}
      </div>
  )
}

const mapStateToProps = (state) => {
  return {
    state: {...state}
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      toggleSetLoading: () => dispatch({type: "TOGGLE_SET_LOADING"}),
      editSingleTask: (singleTask) => dispatch({type: "EDIT_SINGLETASK", singleTask}),
      toggleCloseModal: () => dispatch({type: "CLOSE_SINGLETASK_MODAL"})
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