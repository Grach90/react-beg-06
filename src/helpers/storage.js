import jwt_decode from 'jwt-decode';
import store from '../Redux/store';
import types from '../Redux/actionTypes';

const API_HOST = process.env.REACT_APP_API_URL;

export const getToken = () => {
    const token = localStorage.getItem('token');

    if (token) {
        const parsed = jwt_decode(JSON.parse(token).jwt);
        if (parsed.exp - new Date().getTime() / 1000 < 590) {

            const refreshToken = JSON.parse(token).refreshToken;

            return fetch(`${API_HOST}/user/${parsed.userId}/token`, {
                method: 'PUT',
                body: JSON.stringify({ refreshToken }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).
            then(res => res.json()).
            then(data => {
                if (data.error) throw data.error
                console.log('data', typeof data.jwt);
                localStorage.setItem('token', JSON.stringify(data));
                return data.jwt;
            }).
            catch(error => {
                if (error.status >= 400 && error.status <= 600) {
                    store.dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: error.message });
                } else {
                    store.dispatch({ type: types.SET_ERRORMESSAGE, errorMessage: 'Something went wrong!' });
                }
                store.dispatch({ type: types.LOG_OUT });
            });
        } else return Promise.resolve(JSON.parse(token).jwt);
    }
}