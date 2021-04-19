import types from './actionTypes';
import dateFormator from '../helpers/dateformator';

export const handleEditTaskThunk = (dispatch, tasks, editTableTask) => {
    dispatch({ type: types.SET_LOADING });
    fetch(`http://localhost:3001/task/${editTableTask._id}`, {
            method: "PUT",
            body: JSON.stringify(editTableTask),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) throw data.error;
            let index = tasks.findIndex((task) => task._id === editTableTask._id);
            tasks[index] = data;
            dispatch({ type: types.EDIT_TASK, tasks });
        })
        .catch(error => console.log("Error", error))
        .finally(() => dispatch({ type: types.SET_LOADING }));
}

export const removeMarkedTasksthunk = (dispatch, markedTasks) => {
    dispatch({ type: types.SET_LOADING });
    fetch("http://localhost:3001/task", {
            method: "PATCH",
            body: JSON.stringify({ tasks: Array.from(markedTasks) }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: types.REMOVE_MARKED_TASKS });
        })
        .catch(error => console.log("Error", error))
        .finally(() => dispatch({ type: types.SET_LOADING }));
}

export const addTaskThunk = async(dispatch, task) => {
    dispatch({ type: types.SET_LOADING });
    try {
        let response = await fetch("http://localhost:3001/task", {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json"
            }
        })
        let data = await response.json();
        if (data.error) throw data.error;
        dispatch({ type: types.ADD_TASK, data });
    } catch (error) {
        console.log("Error", error);
    } finally {
        dispatch({ type: types.SET_LOADING });
    }
};

export const removeTaskThunk = (dispatch, deleteTask) => {
    dispatch({ type: types.SET_LOADING });
    fetch(`http://localhost:3001/task/${deleteTask._id}`, { method: "DELETE" })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: types.REMOVE_TASK, deleteTask })
        })
        .catch(error => console.log("Error", error))
        .finally(() => dispatch({ type: types.SET_LOADING }));
}

export const useEffectTrunk = (dispatch) => {
    dispatch({ type: types.SET_LOADING });
    fetch("http://localhost:3001/task")
        .then(response => response.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: types.GET_TASK, data });
        })
        .catch(error => console.log("Error", error))
        .finally(() => dispatch({ type: types.SET_LOADING }));
}

export const subMitThunk = (dispatch, formData, history) => {
    let formDataObj = {...formData };
    formData = {};
    let valid;
    for (let key in formDataObj) {
        formData[key] = formDataObj[key].value;
        if (formDataObj[key].valid === false) valid = false;
        else valid = true;
    }

    if (!valid) return;
    dispatch({ type: types.UNSET_ERRORMESSAGE });
    dispatch({ type: types.SET_LOADING });
    fetch("http://localhost:3001/form", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(respons => respons.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: types.SET_LOADING });
            history.replace("/");
        })
        .catch(error => {
            console.log("Error", error);
            dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: error.message });
            dispatch({ type: types.SET_LOADING });
        });
};
export const removeSingleTaskThunk = (dispatch, singleTask, history) => {
    dispatch({ type: types.SET_LOADING });
    fetch(`http://localhost:3001/task/${singleTask._id}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: types.SET_LOADING });
            history.push("/");
        })
        .catch(error => {
            console.log("Error", error)
            dispatch({ type: types.SET_LOADING });
        });
};

export const handleEditSingleTaskThunk = (dispatch, singleTask) => {
    dispatch({ type: types.SET_LOADING });
    (async() => {
        try {
            const response = await fetch(`http://localhost:3001/task/${singleTask._id}`, {
                method: "PUT",
                body: JSON.stringify(singleTask),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (data.error) throw data.error;
            dispatch({ type: types.EDIT_SINGLETASK, singleTask: data });
            dispatch({ type: types.CLOSE_SINGLETASK_MODAL });
        } catch (error) {
            console.log("Error", error);
        } finally {
            dispatch({ type: types.SET_LOADING });
        }
    })();
}

export const getsingleTaskThunk = (dispatch, params, history) => {
    const { id } = params;
    fetch(`http://localhost:3001/task/${id}`)
        .then(response => response.json())
        .then(singleTask => {
            if (singleTask.error) throw singleTask.error;
            dispatch({ type: types.EDIT_SINGLETASK, singleTask });
        })
        .catch((error) => history.push('/error', error));
}