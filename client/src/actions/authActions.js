import axios from "axios";
import jwt_decode from "jwt-decode";

import baseURL from "../baseURL";
import setAuthToken from "../utils/setAuthToken";

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from "./types";


// registerUser
// Make a request to register the user to the backend. If there
// are errors, dispatch them to the state. If not, redirect
// to the login page.
export const registerUser = (userData, history) => (dispatch) => {
    // Debug
    console.log(baseURL + '/api/users/register');

    // POST request to backend API
    axios
        .post(baseURL + '/api/users/register', userData)
        .then((res) => history.push("/login"))
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};


// loginUser
// Make a request to login the user to the backend. If there
// are errors, dispatch them to the state. If not, get the
// user token from the response, save it in local storage,
// set it as our auth token, dispatch setCurrentUser to
// the newly logged in user.
export const loginUser = (userData) => (dispatch) => {
    // POST request to API backend
    axios
        .post(baseURL + '/api/users/login', userData)
        .then((res) => {
            // Debug
            console.log(baseURL + '/api/users/login');

            // Save to localStorage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);

            // Set token to Auth header
            setAuthToken(token);

            // Decode token to get user data
            const decoded = jwt_decode(token);

            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch((err) => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};


// setCurrentUser
// Set the current user model
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
    };
};


// setUserLoading
// Set the user as loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING,
    };
};


// logoutUser
// Remove the user token from storage, and remove from the 
// header. Finally dispatch setCurrentUser to an empty user.
export const logoutUser = () => (dispatch) => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};
