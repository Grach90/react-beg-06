import {useReducer, useEffect} from 'react';
import style from "./singleTask.module.css";
import React from "react";
import {withRouter} from "react-router-dom";
import {Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import ModalAddTask from "../ToDo/AddTask/ModalAddTask";
import PropTypes from "prop-types";
import Spiner from '../Spiner/Spiner';

const initialState = {
  singleTask: null,
  isModalClose: true,
  loading: false
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'TOGGLE_LOADING' : {
      return {
        ...state,
        loading: !state.loading
      }
    }
    case 'ISMODALCLOSE' : {
      return {
        ...state,
        isModalClose: !state.isModalClose
      }
    }
    case 'ADD_SINGLETASK' : {
      return {
        ...state,
        singleTask: action.data
      }
    }
  }
}

const SingleTaskWithReduce = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const removeTask = () => {
    dispatch({type: 'TOGGLE_LOADING'});
    const {singleTask} = state;
    fetch(`http://localhost:3001/task/${singleTask._id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
      if(data.error) throw data.error;
      props.history.push("/");
    })
    .catch(error => {
      console.log("Error", error)
      dispatch({type: 'TOGGLE_LOADING'});
    }); 
  }

  const handleEditTask = (singleTask) => {
    dispatch({type: 'TOGGLE_LOADING'});
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
      dispatch({type: 'ADD_SINGLETASK', data});
      dispatch({type: 'ISMODALCLOSE'});
    } catch(error) {
      console.log("Error", error);
    } finally {
      dispatch({type: 'TOGGLE_LOADING'});
    }
    })();
  }

  const handleCloseModal = () => {
    dispatch({type: 'ISMODALCLOSE'});
  }

  useEffect(()=> {
    const {id} = props.match.params;
    fetch(`http://localhost:3001/task/${id}`)
    .then(response => response.json())
    .then(data => {
      if(data.error) throw data.error;
      dispatch({type: 'ADD_SINGLETASK', data});
    })
    .catch((error) => props.history.push('/error', error));
  }, []);

  if(!state.singleTask) return <Spiner />
  return (
    <div className={style.singleTask}>
      <div> Title: {state.singleTask.title}</div>
      <div>Description: {state.singleTask.description}</div>
      <div>Date: {state.singleTask.date.slice(0, 10)}</div>
      <div style={{marginTop: "20px"}}>
        <Button onClick={removeTask} variant="primary">
            <FontAwesomeIcon icon={faTrash} />
        </Button>
        <Button onClick={handleCloseModal} variant="danger" className="ml-3 mr-5">
            <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Button onClick={() => props.history.goBack()}>Go Back</Button>
      </div>
      {state.loading && <Spiner />}
      {state.isModalClose || <ModalAddTask 
      handleCloseModal= {handleCloseModal}
      editTask= {state.singleTask}
      handleEditTask= {handleEditTask}
      />}
    </div>
  )
}
SingleTaskWithReduce.propTypes = {
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

export default withRouter(SingleTaskWithReduce);