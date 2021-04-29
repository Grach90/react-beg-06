import {Container, Row, Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faHourglassHalf, faCheck } from '@fortawesome/free-solid-svg-icons'
import style from "./Task.module.css";
import PropTypes from "prop-types";
import {memo} from "react";
import {Link} from "react-router-dom";

function Task({
    task, 
    removeTask, 
    handleMarkedTasks, 
    cheked, 
    isEmptyMarkedTasks,
    handleOpenEditTaskModal,
    handleActiveTask
})
{
    function handleRemoveTask(){
        removeTask(task);
    }
    return (
        <Container className={style.container}>
            <Row>
                <input 
                type="checkbox" 
                onChange={() => handleMarkedTasks(task._id)} 
                checked={cheked}
                />
            </Row>
            <Row className="justify-content-center mb-1">
               <Link to={`/task/${task._id}`} > Title: {task.title} </Link>
            </Row>
            <Row className="justify-content-center mb-1">
                Discription: {task.description}
            </Row>
            <Row className="justify-content-center mb-1">
                Date: {task.date.slice(0, 10)}
            </Row>
            <Row className="justify-content-center">
                <Button disabled= {isEmptyMarkedTasks} onClick={handleRemoveTask} variant="primary">
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button onClick= {() => handleOpenEditTaskModal(task)} disabled= {isEmptyMarkedTasks} variant="danger" className="ml-3">
                    <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button onClick={() => handleActiveTask(task)} className="ml-3" variant="info">
                {task.status === "active" && <FontAwesomeIcon icon={faHourglassHalf} />}
                {task.status === "done" && <FontAwesomeIcon icon={faCheck} />}
                </Button>
            </Row>
        </Container>
    )
}
Task.propTypes = {
    task: PropTypes.shape({
        title: PropTypes.string.isRequired,
        discription: PropTypes.string,
        _id: PropTypes.string.isRequired
    }),
    removeTask: PropTypes.func.isRequired,
    handleMarkedTasks: PropTypes.func.isRequired,
    cheked: PropTypes.bool.isRequired,
    isEmptyMarkedTasks: PropTypes.bool.isRequired
}
export default memo(Task);