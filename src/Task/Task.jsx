import style from "../Task/Task.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {Button, ToggleButtonGroup, ToggleButton} from "react-bootstrap";



 function Task({task, removeTask, id}){

    return(
        <div className={style.task}>
            <div className={style.checkbox}>
            <ToggleButtonGroup type="checkbox" >
                <ToggleButton value={1}>1</ToggleButton>
                <ToggleButton value={2}>2</ToggleButton>
            </ToggleButtonGroup>
            </div>
            {task}
            <div>
                <Button onClick={() => removeTask(true, id)}> 
                <FontAwesomeIcon icon={faTrash} /> 
                </Button>
            </div>
        </div>
    )
}

export default Task;