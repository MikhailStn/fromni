import axios from "axios";
import { changeCurrentUser } from "../store/currentUserSlice";
import { showSplash, hideSplash } from "../store/splashScreen";
import { store } from "../app/store";

export const registration = (email: string, password: string) => {
  store.dispatch(showSplash());
  return async function dispatch() {
    try {
      const response = await axios.post("http://localhost:5000/registration", { email, password });
      localStorage.setItem("token", response.data.token);
      store.dispatch(changeCurrentUser(response.data.user));
      store.dispatch(hideSplash());
      return response;
    } catch (e: any) {
      alert(e.response.data.message);
      store.dispatch(hideSplash());
    }
  };
};

export const login = (email: string, password: string) => {
  store.dispatch(showSplash());
  return async function dispatch() {
    try {
      const response = await axios.post("http://localhost:5000/login", { email, password });
      localStorage.setItem("token", response.data.token);
      store.dispatch(changeCurrentUser(response.data.user));
      store.dispatch(hideSplash());
      return response.data.user;
    } catch (e: any) {
      store.dispatch(hideSplash());
      alert(e.response.data.message);
    }
  };
};

export const auth = () => {
  store.dispatch(showSplash());
  return async function dispatch() {
    try {
      const response = await axios.get("http://localhost:5000/auth", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      store.dispatch(changeCurrentUser(response.data.user));
      store.dispatch(hideSplash());
    } catch (e: any) {
      store.dispatch(hideSplash());
      return e.response.data.message;
    }
  };
};

export const addChannel = async (token: string, message: string, quickButtons: string[], urlButtons: string[], keyboard: string, key: string) => {
  store.dispatch(showSplash());
  try {
    const response = await axios.put("http://localhost:5000/add-channel", { token, message, quickButtons, urlButtons, keyboard, key });
    console.log(response.data.user);
    store.dispatch(hideSplash());
  } catch (e: any) {
    store.dispatch(hideSplash());
    return e.response.data.message;
  }
};
