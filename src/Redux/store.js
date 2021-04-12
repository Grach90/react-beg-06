import { createStore } from 'redux';

const initialState = {
    singleTaskState: {
        singleTask: null,
        isModalAddTask: true,
        loading: false
    },
    toDoState: {
        tasks: [],
        markedTasks: new Set(),
        checkMarkedTask: true,
        isModalAddTask: true,
        isConfirmModal: true,
        isModalEditTask: true,
        editTask: null,
        loading: false
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'EDIT_TASK':
            {
                return {
                    ...state,
                    toDoState: {
                        ...state.toDoState,
                        tasks: action.tasks,
                        isModalEditTask: true,
                        editTask: null
                    }
                }
            }
        case 'OPEN_EDIT_TASK_MODAL':
            {
                return {
                    ...state,
                    toDoState: {
                        ...state.toDoState,
                        editTask: action.editTask,
                        isModalEditTask: false
                    }
                }
            }
        case 'TOGGLE_CONFIRM_MODAL':
            {
                return {
                    ...state,
                    toDoState: {
                        ...state.toDoState,
                        isConfirmModal: !state.toDoState.isConfirmModal
                    }
                }
            }
        case 'CLOSE_MODAL':
            {
                return {
                    ...state,
                    toDoState: {
                        ...state.toDoState,
                        [action.name]: true,
                        editTask: null
                    }
                }
            }
        case 'OPEN_MODAL':
            {
                return {
                    ...state,
                    toDoState: {
                        ...state.toDoState,
                        isModalAddTask: !state.toDoState.isModalAddTask
                    }
                }
            }
        case 'MARK_ALL_TASKS':
            {
                let { checkMarkedTask, markedTasks, tasks } = state.toDoState;
                if (checkMarkedTask) {
                    tasks.forEach(task => markedTasks.add(task._id));
                    checkMarkedTask = !checkMarkedTask;
                } else {
                    markedTasks.clear();
                    checkMarkedTask = !checkMarkedTask;
                }
                return {
                    ...state,
                    toDoState: {
                        ...state.toDoState,
                        markedTasks,
                        checkMarkedTask
                    }
                }
            }
        case 'MARKED_TASKS':
            {
                return {
                    ...state,
                    toDoState: {
                        ...state.toDoState,
                        markedTasks: action.markedTasks
                    }
                }
            }
        case 'REMOVE_MARKED_TASKS':
            {
                return {
                    ...state,
                    toDoState: {
                        ...state.toDoState,
                        tasks: action.tasks,
                        markedTasks: new Set(),
                        isConfirmModal: !state.toDoState.isConfirmModal
                    }
                }
            }
        case 'ADD_TASK':
            {
                return {
                    ...state,
                    toDoState: {
                        ...state.toDoState,
                        isModalAddTask: !state.toDoState.isModalAddTask,
                        tasks: action.tasks
                    }
                }
            }
        case 'REMOVE_TASK':
            {
                return {
                    ...state,
                    toDoState: {
                        ...state.toDoState,
                        tasks: action.tasks
                    }
                }
            }
        case 'GET_TASK':
            {
                return {
                    ...state,
                    toDoState: {
                        ...state.toDoState,
                        tasks: action.data
                    }
                }
            }
        case 'SET_LOADING':
            {
                return {
                    ...state,
                    toDoState: {
                        ...state.toDoState,
                        loading: !state.toDoState.loading
                    }
                }
            }
        case "TOGGLE_SET_LOADING":
            {
                return {
                    ...state,
                    singleTaskState: {
                        ...state.singleTaskState,
                        loading: !state.singleTaskState.loading
                    }
                }
            }
        case "EDIT_SINGLETASK":
            {
                return {
                    ...state,
                    singleTaskState: {
                        ...state.singleTaskState,
                        singleTask: action.singleTask
                    }
                }
            }
        case "CLOSE_SINGLETASK_MODAL":
            {
                return {
                    ...state,
                    singleTaskState: {
                        ...state.singleTaskState,
                        isModalAddTask: !state.singleTaskState.isModalAddTask
                    }
                }
            }
        default:
            return state;
    }
}

const store = createStore(reducer);
export default store;