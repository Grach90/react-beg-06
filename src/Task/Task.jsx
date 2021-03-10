import style from "./Task.module.css";
import {Button} from "react-bootstrap";
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Task({task}){
    return (
        <div className={style.task}>
            <div className={style.input}>
                <input type="checkbox"/>
            </div>
            <div>
                {task.name}
            </div>
            <div>
                <Button className={style.button} variant="primary">
                <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button className={style.button} variant="primary">
                <FontAwesomeIcon icon={faEdit} />
                </Button>
            </div>
           
        </div>
    )
}

export default Task;