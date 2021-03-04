import style from "../Task/Task.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {Button} from "react-bootstrap";



 function Task({
     task, 
     removeTask, 
     id,
     selectTask,
     checkSelectTasks,
     selectedTasks
    })
    {
    return(
        <div className={selectedTasks.has(id) ? style.active : style.task}>
            <div className={style.checkbox}>
                <input onClick={() => selectTask(id)} type="checkbox" />
            </div>
            {task}
            <div className="mt-3">
                <Button onClick={() => removeTask(true, id)} disabled={checkSelectTasks}> 
                <FontAwesomeIcon icon={faTrash} /> 
                </Button>
            </div>
        </div>
    )
}

export default Task;