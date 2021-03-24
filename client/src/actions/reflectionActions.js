import axios from "axios";
import jwt_decode from "jwt-decode";

import baseURL from "../baseURL";
import setAuthToken from "../utils/setAuthToken";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// makePost
// Make a request to add post the reflectionis to the backend. If there
// are errors, dispatch them to the state.
export const makePost = (reflectionData) => (dispatch) => {
    // Debug
    console.log(baseURL + "/api/reflections/createReflection");

    // POST request to backend API
    axios
        .post(baseURL + "/api/reflections/createReflection", reflectionData)
        .then()
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};
