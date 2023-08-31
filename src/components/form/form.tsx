import "./form.css";
import { channels } from "../../data/channels";
import { useNavigate } from "react-router-dom";
import { addChannel, removeBtn } from "../../requests/requests";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeMessage } from "../../store/currentUserSlice";
import { RadioGroup, FormControl, FormControlLabel, Radio } from "@mui/material";
import { useRef, useState } from "react";
import { isValidUrl } from "../../functions";

type Props = {
  id: string;
};

export let index = 0;

export function Form(props: Props) {
  let index = 0;
  const state = useAppSelector((state) => state.currentUser.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [inputQuick, showQuickInput] = useState({ display: "none", border: "1px solid gray" });
  const [inputUrl, showUrlInput] = useState({ display: "none", border: "1px solid gray" });
  const [inputQuickValue, changeQuickInput] = useState("");
  const [inputUrlValue, changeUrlInput] = useState("");
  const [error, setError] = useState("");
  const inputQuickRef = useRef<HTMLInputElement | null>(null);
  const inputUrlRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLInputElement>(null);
  let channel = {
    id: "",
    name: "",
    logo: "",
  };
  let max = 0;
  if (props.id == "vk") {
    channel = channels[0];
    index = 0;
    max = 4096;
  } else if (props.id == "telegram") {
    channel = channels[1];
    index = 1;
    max = 4096;
  } else if (props.id == "whatsapp") {
    channel = channels[2];
    index = 2;
    max = 1000;
  } else if (props.id == "sms") {
    channel = channels[3];
    index = 3;
    max = 1000;
  }
  const [keyboard, setKeyboard] = useState(state.channels[index].keyboard);
  let placeholder = "Ответ";
  let maxBtnVal = 1000;
  if (props.id == "whatsapp") {
    placeholder = "Ответ (макс: 20)";
    maxBtnVal = 20;
  } else if (props.id == "telegram" && keyboard == "inline") {
    placeholder = "Ответ (макс: 64)";
    maxBtnVal = 64;
  }
  const quickBtns = state.channels[index].quickButtons?.slice(0);
  const urlBtns = state.channels[index].urlButtons?.slice(0);
  return (
    <form className="form">
      <button
        className="form__button_back"
        onClick={() => {
          navigate("/channels");
        }}
      >
        Назад
      </button>
      <div className="form__content">
        <img className="form__logo" src={channel.logo} />
        <p style={index == 3 ? { display: "none" } : { display: "flex" }}>Текст сообщения (Макс: {max})</p>
        <p style={index == 3 ? { display: "flex" } : { display: "none" }}>Текст сообщения</p>
        <input
          ref={messageRef}
          maxLength={max}
          type="text"
          name="text-message"
          className="form__input_message"
          placeholder="Текст сообщения"
          value={state.channels[index].message}
          onChange={(e) => {
            dispatch(changeMessage({ index: index, message: e.target.value }));
          }}
        ></input>
        <p style={index == 3 ? { display: "none" } : {}}>Быстрые ответы:</p>
        <div style={index == 3 ? { display: "none" } : {}} className="form__active_buttons_container quick">
          {state.channels[index].quickButtons?.map((el, index) => (
            <div className="form__active_buttons" key={el + index}>
              <input readOnly className="form__active_button" value={el} name="quick-button"></input>
              <button
                className="form__active_button button__remove"
                onClick={(e) => {
                  e.preventDefault();
                  let index = quickBtns.indexOf(el);
                  quickBtns.splice(index, 1);
                  if (messageRef.current)
                    dispatch(
                      removeBtn(localStorage.getItem("token") || "", messageRef.current.value, quickBtns, urlBtns, keyboard, props.id)
                    );
                }}
              >
                x
              </button>
            </div>
          ))}
        </div>
        <p style={index == 3 ? { display: "none" } : {}}>Ссылки:</p>
        <div style={index == 3 ? { display: "none" } : {}} className="form__active_buttons_container url">
          {state.channels[index].urlButtons?.map((el, index) => (
            <div className="form__active_buttons" key={el + index}>
              <input readOnly className="form__active_button" value={el} name="url-button"></input>
              <button
                className="form__active_button button__remove"
                onClick={(e) => {
                  e.preventDefault();
                  let index = urlBtns.indexOf(el);
                  urlBtns.splice(index, 1);
                  if (messageRef.current)
                    dispatch(
                      removeBtn(localStorage.getItem("token") || "", messageRef.current.value, quickBtns, urlBtns, keyboard, props.id)
                    );
                }}
              >
                x
              </button>
            </div>
          ))}
        </div>
        <div style={index == 3 ? { display: "none" } : {}} className="form__keyboard">
          <FormControl onChange={() => {}}>
            <p style={{ fontSize: "16px", marginBottom: "20px" }} id="radio">
              Клавиатура
            </p>
            <RadioGroup
              sx={{ flexDirection: "row" }}
              aria-labelledby="radio"
              value={keyboard}
              onChange={(e) => {
                setKeyboard(e.target.value);
              }}
              name="radio-group"
            >
              <FormControlLabel value="standart" control={<Radio />} label="Стандартная"></FormControlLabel>
              <FormControlLabel value="inline" control={<Radio />} label="Inline"></FormControlLabel>
            </RadioGroup>
          </FormControl>
        </div>
        <div className="form__buttons">
          <button
            style={index == 3 ? { display: "none" } : {}}
            className="form__button button"
            onClick={(e) => {
              e.preventDefault();
              showQuickInput({ display: "flex", border: "1px solid gray" });
              showUrlInput({ display: "none", border: "1px solid gray" });
              changeUrlInput("");
            }}
          >
            + Быстрый ответ
          </button>
          <button
            style={
              index == 3 || (index == 2 && keyboard == "standart") || (index == 1 && keyboard == "standart") ? { display: "none" } : {}
            }
            className="form__button button"
            onClick={(e) => {
              e.preventDefault();
              showQuickInput({ display: "none", border: "1px solid gray" });
              showUrlInput({ display: "flex", border: "1px solid gray" });
              changeQuickInput("");
            }}
          >
            + Ссылка
          </button>
        </div>
        <input
          className="form__input add__btn"
          ref={inputQuickRef}
          style={inputQuick}
          value={inputQuickValue}
          type="text"
          name="add-quick"
          maxLength={maxBtnVal}
          placeholder={placeholder}
          onChange={(e) => {
            changeQuickInput(e.target.value);
          }}
        ></input>
        <input
          className="form__input add__btn"
          ref={inputUrlRef}
          style={inputUrl}
          value={inputUrlValue}
          type="text"
          name="add-url"
          placeholder="URL"
          onChange={(e) => {
            changeUrlInput(e.target.value);
            if (!isValidUrl(e.target.value) && e.target.value) {
              showUrlInput({ display: "flex", border: "1px solid red" });
            } else {
              showUrlInput({ display: "flex", border: "1px solid gray" });
            }
          }}
        ></input>
      </div>
      <p className="form__sumbit_err">{error}</p>
      <button
        className="form__button button"
        onClick={(e) => {
          e.preventDefault();
          if (inputUrlRef.current)
            if (!isValidUrl(inputUrlRef.current?.value) && inputUrlRef.current?.value) {
              showUrlInput({ display: "flex", border: "1px solid red" });
              return;
            }
          for (let i = 0; i < quickBtns.length; i++) {
            if (inputQuickRef.current?.value == quickBtns[i]) {
              showQuickInput({ display: "flex", border: "1px solid red" });
              return;
            } else {
              showQuickInput({ display: "flex", border: "1px solid gray" });
            }
          }
          for (let i = 0; i < urlBtns.length; i++) {
            if (inputUrlRef.current?.value == urlBtns[i]) {
              showUrlInput({ display: "flex", border: "1px solid red" });
              showQuickInput({ display: "none", border: "1px solid gray" });
              return;
            } else {
              showUrlInput({ display: "flex", border: "1px solid gray" });
            }
          }
          if (inputQuickRef.current && quickBtns && inputQuickRef.current?.value) quickBtns.push(inputQuickRef?.current.value);
          if (inputUrlRef.current && urlBtns && inputUrlRef.current?.value) urlBtns.push(inputUrlRef?.current.value);
          if (quickBtns && urlBtns)
            dispatch(
              addChannel(localStorage.getItem("token") || "", state.channels[index].message, quickBtns, urlBtns, keyboard, props.id)
            );
          changeQuickInput("");
          changeUrlInput("");
          showQuickInput({ display: "none", border: "1px solid gray" });
          showUrlInput({ display: "none", border: "1px solid gray" });
          setError("");
        }}
      >
        Сохранить
      </button>
    </form>
  );
}
