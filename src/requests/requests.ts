import axios from "axios";
import { changeCurrentUser } from "../store/currentUserSlice";
import { showSplash, hideSplash } from "../store/splashScreen";
import { store } from "../app/store";

export const registration = (email: string, password: string) => {
  store.dispatch(showSplash());
  return async function dispatch() {
    try {
      const response = await axios.post("https://fromi-api.onrender.com/registration", { email, password });
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
      const response = await axios.post("https://fromi-api.onrender.com/login", { email, password });
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
      const response = await axios.get("https://fromi-api.onrender.com/auth", {
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

export const addChannel = (token: string, message: string, quickButtons: string[], urlButtons: string[], keyboard: string, key: string) => {
  store.dispatch(showSplash());
  return async function dispatch() {
    try {
      const response = await axios.put("https://fromi-api.onrender.com/add-channel", { token, message, quickButtons, urlButtons, keyboard, key });
      store.dispatch(changeCurrentUser(response.data.user));
      store.dispatch(hideSplash());
    } catch (e: any) {
      store.dispatch(hideSplash());
      alert(e.response.data.message);
    }
  };
};

export const removeBtn = (token: string, message: string, quickButtons: string[], urlButtons: string[], keyboard: string, key: string) => {
  store.dispatch(showSplash());
  return async function dispatch() {
    try {
      const response = await axios.put("https://fromi-api.onrender.com/remove-button", { token, message, quickButtons, urlButtons, keyboard, key });
      store.dispatch(changeCurrentUser(response.data.user));
      store.dispatch(hideSplash());
    } catch (e: any) {
      store.dispatch(hideSplash());
      alert(e.response.data.message);
    }
  };
};

export const changeChannel = (token: string, isActive: boolean, key: string) => {
  store.dispatch(showSplash());
  return async function dispatch() {
    try {
      const response = await axios.put("https://fromi-api.onrender.com/set-channel", { token, isActive, key });
      store.dispatch(changeCurrentUser(response.data.user));
      store.dispatch(hideSplash());
    } catch (e: any) {
      store.dispatch(hideSplash());
      return e.response.data.message;
    }
  };
};
