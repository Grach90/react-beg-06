import types from './actionTypes';
import dateFormator from '../helpers/dateformator';
const API_HOST = process.env.REACT_APP_API_URL;

export const handleEditTaskThunk = (dispatch, editTableTask) => {
    dispatch({ type: types.SET_LOADING });
    fetch(`${API_HOST}/task/${editTableTask._id}`, {
            method: "PUT",
            body: JSON.stringify(editTableTask),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: types.EDIT_TASK, data });
            dispatch({ type: types.SET_SUCCSSES_MESSAGE, successMessage: 'Task has been edited success!' });
        })
        .catch(error => dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: error.message }))
        .finally(() => dispatch({ type: types.SET_LOADING }));
}

export const removeMarkedTasksthunk = (dispatch, markedTasks) => {
    dispatch({ type: types.SET_LOADING });
    fetch(`${API_HOST}/task`, {
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
            dispatch({ type: types.SET_SUCCSSES_MESSAGE, successMessage: 'Marked Tasks have been deleted success!' });
        })
        .catch(error => dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: error.message }))
        .finally(() => dispatch({ type: types.SET_LOADING }));
}

export const addTaskThunk = async(dispatch, task) => {
    dispatch({ type: types.SET_LOADING });
    try {
        let response = await fetch(`${API_HOST}/task`, {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json"
            }
        })
        let data = await response.json();
        if (data.error) throw data.error;
        dispatch({ type: types.ADD_TASK, data });
        dispatch({ type: types.SET_SUCCSSES_MESSAGE, successMessage: 'Task has been added success!' });
    } catch (error) {
        dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: error.message });
    } finally {
        dispatch({ type: types.SET_LOADING });
    }
};

export const removeTaskThunk = (dispatch, deleteTask) => {
    dispatch({ type: types.SET_LOADING });
    fetch(`${API_HOST}/task/${deleteTask._id}`, { method: "DELETE" })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: types.REMOVE_TASK, deleteTask });
            dispatch({ type: types.SET_SUCCSSES_MESSAGE, successMessage: 'Task has been deleted success!' });
        })
        .catch(error => dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: error.message }))
        .finally(() => dispatch({ type: types.SET_LOADING }));
}

export const useEffectTrunk = (dispatch) => {
    dispatch({ type: types.SET_LOADING });
    fetch(`${API_HOST}/task`)
        .then(response => response.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: types.GET_TASK, data });
        })
        .catch(error => dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: error.message }))
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
    dispatch({ type: types.SET_LOADING });
    fetch(`${API_HOST}/form`, {
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
            dispatch({ type: types.SET_SUCCSSES_MESSAGE, successMessage: 'Datas have been sent success!' });
        })
        .catch(error => {
            console.log("Error", error);
            dispatch({ type: types.SET_LOADING });
            dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: error.message });
        });
};
export const removeSingleTaskThunk = (dispatch, singleTask, history) => {
    dispatch({ type: types.SET_LOADING });
    fetch(`${API_HOST}/task/${singleTask._id}`, {
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
            dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: error.message });
        });
};

export const handleEditSingleTaskThunk = (dispatch, singleTask) => {
    dispatch({ type: types.SET_LOADING });
    (async() => {
        try {
            const response = await fetch(`${API_HOST}/task/${singleTask._id}`, {
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
            dispatch({ type: types.SET_SUCCSSES_MESSAGE, successMessage: 'Task has been edited success!' });
        } catch (error) {
            dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: error.message });
        } finally {
            dispatch({ type: types.SET_LOADING });
        }
    })();
}

export const getsingleTaskThunk = (dispatch, params) => {
    const { id } = params;
    fetch(`${API_HOST}/task/${id}`)
        .then(response => response.json())
        .then(singleTask => {
            if (singleTask.error) throw singleTask.error;
            dispatch({ type: types.EDIT_SINGLETASK, singleTask });
        })
        .catch((error) => dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: error.message }));
}

export const handleActiveTaskThunk = (dispatch, task) => {
    const status = task.status === 'active' ? 'done' : 'active';
    fetch(`${API_HOST}/task/${task._id}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).
    then(response => response.json()).
    then(data => {
        if (data.error) throw data.error;
        dispatch({ type: types.EDIT_TASK, data });
    }).
    catch(error => dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: error.message }));
}

export const handleSubmitThunk = (dispatch, searchState) => {
    dispatch({ type: types.SET_LOADING });
    let url = `${API_HOST}/task?`;
    for (let key in searchState) {
        if (searchState[key] instanceof Date) {
            searchState[key] = dateFormator(searchState[key]);
        }
        if (searchState[key]) {
            url = url + `${key}=${searchState[key]}&`;
        }
    }
    url = url.slice(0, url.length - 1);
    fetch(url).
    then(response => response.json()).
    then(data => {
        if (data.error) throw data.error;
        dispatch({ type: types.GET_TASK, data });
        dispatch({ type: types.SET_SUCCSSES_MESSAGE, successMessage: 'Search completed successfully!' });
    }).
    catch(error => dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: error.message })).
    finally(() => dispatch({ type: types.SET_LOADING }));
}