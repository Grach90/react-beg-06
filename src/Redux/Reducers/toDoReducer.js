import types from './../actionTypes';

const initialState = {
    tasks: [],
    markedTasks: new Set(),
    checkMarkedTask: true,
    isModalAddTask: true,
    isConfirmModal: true,
    isModalEditTask: true,
    editTask: null
}

const toDoReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.EDIT_TASK:
            {
                let { tasks } = state;
                const { data } = action;
                const index = tasks.findIndex((task) => task._id === data._id);
                tasks[index] = data;
                return {
                    ...state,
                    tasks,
                    isModalEditTask: true,
                    editTask: null
                }
            }
        case types.OPEN_EDIT_TASK_MODAL:
            {
                return {
                    ...state,
                    editTask: action.editTask,
                    isModalEditTask: false
                }
            }
        case types.TOGGLE_CONFIRM_MODAL:
            {
                return {
                    ...state,
                    isConfirmModal: !state.isConfirmModal
                }
            }
        case types.CLOSE_MODAL:
            {
                return {
                    ...state,
                    [action.name]: true,
                    editTask: null
                }
            }
        case types.OPEN_MODAL:
            {
                return {
                    ...state,
                    isModalAddTask: !state.isModalAddTask
                }
            }
        case types.MARK_ALL_TASKS:
            {
                let { checkMarkedTask, markedTasks, tasks } = state;
                if (checkMarkedTask) {
                    tasks.forEach(task => markedTasks.add(task._id));
                    checkMarkedTask = !checkMarkedTask;
                } else {
                    markedTasks.clear();
                    checkMarkedTask = !checkMarkedTask;
                }
                return {
                    ...state,
                    markedTasks,
                    checkMarkedTask
                }
            }
        case types.MARKED_TASKS:
            {
                const { markedTasks } = state;
                if (markedTasks.has(action._id))
                    markedTasks.delete(action._id);
                else
                    markedTasks.add(action._id);
                return {
                    ...state,
                    markedTasks
                }
            }
        case types.REMOVE_MARKED_TASKS:
            {
                let { tasks, markedTasks } = state;
                tasks = tasks.filter(task => !markedTasks.has(task._id));
                return {
                    ...state,
                    tasks,
                    markedTasks: new Set(),
                    isConfirmModal: !state.isConfirmModal
                }
            }
        case types.ADD_TASK:
            {
                const { tasks } = state;
                tasks.push(action.data);
                return {
                    ...state,
                    isModalAddTask: !state.isModalAddTask,
                    tasks
                }
            }
        case types.REMOVE_TASK:
            {
                let { tasks } = state;
                tasks = tasks.filter(task => task._id !== action.deleteTask._id);
                return {
                    ...state,
                    tasks
                }
            }
        case types.GET_TASK:
            {
                return {
                    ...state,
                    tasks: action.data
                }
            }
        case types.RESET_TODO_STATE:
            {
                return {
                    ...initialState
                }
            }
        default:
            return state;
    }
}

export default toDoReducer;