import axios from "axios";
import { AUTH_ERROR, AUTH_USER } from "./types";

export const signup = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post("/signup", formProps);

    dispatch({ type: AUTH_USER, payload: response.data.token });

    localStorage.setItem("token", response.data.token);

    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use" });
  }
};

export const signin = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post("/signin", formProps);

    dispatch({ type: AUTH_USER, payload: response.data.token });

    localStorage.setItem("token", response.data.token);

    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid login credentials." });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  dispatch({ type: AUTH_USER, payload: "" });

  dispatch({ type: "removeUser" });
};
