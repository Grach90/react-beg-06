import {Container, Row, Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import style from "./Task.module.css";

function Task({task, removeTask, handleMarkedTasks, cheked, isEmptyMarkedTasks}){
    
    
    function handleRemoveTask(){
        removeTask(task._id);
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
                {task.name}
            </Row>
            <Row className="justify-content-center">
                <Button disabled= {isEmptyMarkedTasks} onClick={handleRemoveTask} variant="primary">
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button disabled= {isEmptyMarkedTasks} variant="danger" className="ml-3">
                    <FontAwesomeIcon icon={faEdit} />
                </Button>
            </Row>
        </Container>
    )
}

export default Task;