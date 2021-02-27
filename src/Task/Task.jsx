import style from "../Task/Task.module.css";

function Task({task}) {
    return(
        <div className={style.task}>
            {task}
        </div>
    )
}

export default Task;