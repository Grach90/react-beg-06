import style from "./singleTask.module.css";
import React from "react";
import {withRouter} from "react-router-dom";
import {Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import ModalAddTask from "../ToDo/AddTask/ModalAddTask";
import dateformator from "../../helpers/dateformator";
import PropTypes from "prop-types";
import Spiner from '../Spiner/Spiner';

class SingleTask extends React.Component {
  state = {
    singleTask: null,
    isModalAddTask: true,
    loading: false
  }

  removeTask = () => {
    this.setState({
      loading: true
    });
    const {singleTask} = this.state;
    fetch(`http://localhost:3001/task/${singleTask._id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
      if(data.error) throw data.error;
      this.props.history.push("/");
    })
    .catch(error => {
      console.log("Error", error)
      this.setState({loading: false});
    }); 
  }

  handleCloseModal = () => {
    const {isModalAddTask} = this.state;
    this.setState({
      isModalAddTask: !isModalAddTask
    })
  }

  handleEditTask = (singleTask) => {
    singleTask.date = dateformator(singleTask.date);
    this.setState({
      loading: true
    });
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
      this.setState({
        singleTask : data,
        isModalAddTask: true
      });
    } catch(error) {
      console.log("Error", error);
    } finally {
      this.setState({loading: false});
    }
    })();
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    fetch(`http://localhost:3001/task/${id}`)
    .then(response => response.json())
    .then(singleTask => {
      if(singleTask.error) throw singleTask.error;
      this.setState({
        singleTask
      })
    })
    .catch((error) => this.props.history.push('/error', error));
  }

  render() {
    const {singleTask, isModalAddTask, loading} = this.state;
    if(!singleTask) return <Spiner />
    return (
        <div className={style.singleTask}>
            <div> Title: {singleTask.title}</div>
            <div>Description: {singleTask.description}</div>
            <div>Date: {singleTask.date.slice(0, 10)}</div>
            <div style={{marginTop: "20px"}}>
              <Button onClick={this.removeTask} variant="primary">
                  <FontAwesomeIcon icon={faTrash} />
              </Button>
              <Button onClick={this.handleCloseModal} variant="danger" className="ml-3 mr-5">
                  <FontAwesomeIcon icon={faEdit} />
              </Button>
              <Button onClick={() => this.props.history.goBack()}>Go Back</Button>
            </div>
            {loading && <Spiner />}
            {isModalAddTask || <ModalAddTask 
            handleCloseModal= {this.handleCloseModal}
            editTask= {this.state.singleTask}
            handleEditTask= {this.handleEditTask}
            />}
        </div>
    )
  }
}
SingleTask.propTypes = {
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

export default withRouter(SingleTask);