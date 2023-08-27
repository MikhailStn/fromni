import "./registration.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { registration, login } from "../../requests/requests";
import {
  changeEntryEmail,
  changeEntryPassword,
  changeRegEmail,
  changeRegPassword,
  changeRegConfPassword,
} from "../../store/registrationInputSlice";
import { useState } from "react";

export function Registration() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.reg);
  const [entryError, setEntryError] = useState("");
  const [regError, setRegError] = useState("");
  return (
    <div className="registration__container">
      <p>Вы не вошли в профиль</p>
      <p style={{ paddingTop: "40px" }}>Вход:</p>
      <p className="text-danger">{entryError}</p>
      <input
        autoComplete="true"
        className="registration__input"
        name="email"
        type="email"
        placeholder="Email"
        value={state.entryEmail}
        onChange={(e) => {
          if (e.target.value == "") {
            setEntryError("Заполните все поля");
            dispatch(changeEntryEmail(e.target.value));
          } else {
            setEntryError("");
            dispatch(changeEntryEmail(e.target.value));
          }
        }}
      ></input>
      <input
        className="registration__input"
        name="password"
        type="password"
        placeholder="Password"
        value={state.entryPassword}
        onChange={(e) => {
          if (e.target.value == "") {
            setEntryError("Заполните все поля");
            dispatch(changeEntryPassword(e.target.value));
          } else {
            setEntryError("");
            dispatch(changeEntryPassword(e.target.value));
          }
        }}
      ></input>
      <button
        className="profile__button button"
        onClick={() => {
          if (state.entryEmail == "" || state.entryPassword == "") {
            setEntryError("Заполните все поля");
          } else {
            setEntryError("");
            dispatch(login(state.entryEmail, state.entryPassword));
          }
        }}
      >
        Вход
      </button>
      <p style={{ paddingTop: "40px" }}>Регистрация:</p>
      <p className="text-danger">{regError}</p>
      <input
        autoComplete="true"
        className="registration__input"
        name="email"
        type="email"
        placeholder="Email"
        value={state.regEmail}
        onChange={(e) => {
          dispatch(changeRegEmail(e.target.value));
        }}
      ></input>
      <input
        className="registration__input"
        name="password"
        type="password"
        placeholder="Password"
        value={state.regPassword}
        onChange={(e) => {
          dispatch(changeRegPassword(e.target.value));
        }}
      ></input>
      <input
        className="registration__input"
        name="password"
        type="password"
        placeholder="Confirm Password"
        value={state.regConfPassword}
        onChange={(e) => {
          dispatch(changeRegConfPassword(e.target.value));
        }}
      ></input>
      <button
        className="profile__button button"
        onClick={() => {
          if (state.regPassword != state.regConfPassword) {
            setRegError("Пароли не совпадают");
          } else if (state.regEmail == "") {
            setRegError("Заполните все поля");
          } else if (state.regPassword == "") {
            ("Заполните все поля");
          } else {
            setRegError("");
            dispatch(registration(state.regEmail, state.regPassword));
          }
        }}
      >
        Регистрация
      </button>
    </div>
  );
}
