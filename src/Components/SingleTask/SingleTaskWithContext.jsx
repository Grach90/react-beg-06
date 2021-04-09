import {useContext, useEffect} from 'react';
import {singleTaskContext} from '../../Context/Context';
import style from "./singleTask.module.css";
import {Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import ModalAddTask from "../ToDo/AddTask/ModalAddTask";
import PropTypes from "prop-types";
import Spiner from '../Spiner/Spiner';

const SingleTaskWithContext = (props) => {
  const context = useContext(singleTaskContext);
  const {
     //state
     singleTask,
     isModalAddTask,
     loading,
     //functions
     removeTask,
     handleCloseModal,
     handleEditTask,
     forUseEffect
  } = context;

  useEffect(() => {
    forUseEffect();
    }, [forUseEffect]);

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
SingleTaskWithContext.propTypes = {
  singleTask: PropTypes.oneOfType([
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      _id: PropTypes.string,
      date: PropTypes.object
    }),
    PropTypes.object
  ]),
  handleEditTask: PropTypes.func,
  isModalAddTask: PropTypes.bool,
  loading: PropTypes.bool,
  removeTask: PropTypes.func,
  handleCloseModal: PropTypes.func,
  forUseEffect: PropTypes.func
}

export default SingleTaskWithContext;