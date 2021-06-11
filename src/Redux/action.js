import types from './actionTypes';
import dateFormator from '../helpers/dateformator';
import { getToken } from '../helpers/storage';
const API_HOST = process.env.REACT_APP_API_URL;

export const handleEditTaskThunk = async(dispatch, editTableTask) => {
    const token = await getToken();
    dispatch({ type: types.SET_LOADING });
    fetch(`${API_HOST}/task/${editTableTask._id}`, {
            method: "PUT",
            body: JSON.stringify(editTableTask),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
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

export const removeMarkedTasksthunk = async(dispatch, markedTasks) => {
    const token = await getToken();
    dispatch({ type: types.SET_LOADING });
    fetch(`${API_HOST}/task`, {
            method: "PATCH",
            body: JSON.stringify({ tasks: Array.from(markedTasks) }),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
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
    const token = await getToken();
    dispatch({ type: types.SET_LOADING });
    try {
        let response = await fetch(`${API_HOST}/task`, {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
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

export const removeTaskThunk = async(dispatch, deleteTask) => {
    const token = await getToken();
    dispatch({ type: types.SET_LOADING });
    fetch(`${API_HOST}/task/${deleteTask._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: types.REMOVE_TASK, deleteTask });
            dispatch({ type: types.SET_SUCCSSES_MESSAGE, successMessage: 'Task has been deleted success!' });
        })
        .catch(error => dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: error.message }))
        .finally(() => dispatch({ type: types.SET_LOADING }));
}

export async function useEffectTrunk(dispatch) {
    const token = await getToken();
    dispatch({ type: types.SET_LOADING });
    fetch(`${API_HOST}/task`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
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
            dispatch({ type: types.SET_SUCCSSES_MESSAGE, successMessage: 'Datas have been sent successfully!' });
        })
        .catch(error => {
            console.log("Error", error);
            dispatch({ type: types.SET_LOADING });
            dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: error.message });
        });
};
export const removeSingleTaskThunk = async(dispatch, singleTask, history) => {
    const token = await getToken();
    dispatch({ type: types.SET_LOADING });
    fetch(`${API_HOST}/task/${singleTask._id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
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

export const handleEditSingleTaskThunk = async(dispatch, singleTask) => {
    const token = await getToken();
    dispatch({ type: types.SET_LOADING });
    (async() => {
        try {
            const response = await fetch(`${API_HOST}/task/${singleTask._id}`, {
                method: "PUT",
                body: JSON.stringify(singleTask),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.error) throw data.error;
            dispatch({ type: types.EDIT_SINGLETASK, singleTask: data });
            dispatch({ type: types.CLOSE_SINGLETASK_MODAL });
            dispatch({ type: types.SET_SUCCSSES_MESSAGE, successMessage: 'Task has been edited successfully!' });
        } catch (error) {
            dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: error.message });
        } finally {
            dispatch({ type: types.SET_LOADING });
        }
    })();
}

export const getsingleTaskThunk = async(dispatch, params) => {
    const token = await getToken();
    const { id } = params;
    fetch(`${API_HOST}/task/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(singleTask => {
            if (singleTask.error) throw singleTask.error;
            dispatch({ type: types.EDIT_SINGLETASK, singleTask });
        })
        .catch((error) => dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: error.message }));
}

export const handleActiveTaskThunk = async(dispatch, task) => {
    const token = await getToken();
    const status = task.status === 'active' ? 'done' : 'active';
    fetch(`${API_HOST}/task/${task._id}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).
    then(response => response.json()).
    then(data => {
        if (data.error) throw data.error;
        dispatch({ type: types.EDIT_TASK, data });
    }).
    catch(error => dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: error.message }));
}

export const searchThunk = async(dispatch, searchState) => {
    const token = await getToken();
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
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).
    then(response => response.json()).
    then(data => {
        if (data.error) throw data.error;
        dispatch({ type: types.GET_TASK, data });
        dispatch({ type: types.SET_SUCCSSES_MESSAGE, successMessage: 'Search completed successfully!' });
    }).
    catch(error => dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: error.message })).
    finally(() => dispatch({ type: types.SET_LOADING }));
}

export const registerThunk = (dispatch, formData, history) => {
    dispatch({ type: types.SET_LOADING });
    let url = `${API_HOST}/user`;
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            name: formData.name.value,
            surname: formData.surname.value,
            email: formData.email.value,
            password: formData.password.value,
            confirmPassword: formData.confirmPassword.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).
    then(res => res.json()).
    then(data => {
        if (data.error) throw data.error;
        dispatch({ type: types.SET_SUCCSSES_MESSAGE, successMessage: 'You have been registered successfully!' });
        history.push('/login');
    }).
    catch(error => dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: error.message })).
    finally(() => dispatch({ type: types.SET_LOADING }));
}

export const loginThunk = async(dispatch, formData, history) => {
    dispatch({ type: types.SET_LOADING });
    let urlLogin = `${API_HOST}/user/sign-in`;
    let urlUser = `${API_HOST}/user`;
    try {
        const responsLogin = await fetch(urlLogin, {
            method: 'POST',
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const dataLogin = await responsLogin.json();
        if (dataLogin.error) throw dataLogin.error;
        else if (dataLogin.status === 403) throw dataLogin;
        localStorage.setItem('token', JSON.stringify(dataLogin));

        const responsUser = await fetch(urlUser, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${dataLogin.jwt}`
            }
        });
        const dataUser = await responsUser.json();
        if (dataUser.error) throw dataUser.error;
        localStorage.setItem('userName', dataUser.name);

        dispatch({ type: types.LOG_IN, dataLogin, dataUser })
    } catch (error) {
        dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: error.message });
    } finally {
        dispatch({ type: types.SET_LOADING });
    }
}