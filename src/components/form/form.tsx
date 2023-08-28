import "./form.css";
import { channels } from "../../data/channels";
import { useNavigate } from "react-router-dom";
import { addChannel } from "../../requests/requests";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeMessage } from "../../store/currentUserSlice";
import { TextField } from "@mui/material";

type Props = {
  id: string;
};

export function Form(props: Props) {
  const state = useAppSelector((state) => state.currentUser.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let channel = {
    id: "",
    name: "",
    logo: "",
  };
  let index = 0;
  if (props.id == "vk") {
    channel = channels[0];
    index = 0;
  } else if (props.id == "telegram") {
    channel = channels[1];
    index = 1;
  } else if (props.id == "whatsapp") {
    channel = channels[2];
    index = 2;
  } else if (props.id == "sms") {
    channel = channels[3];
    index = 3;
  }
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
        <img className="from__logo" src={channel.logo} />
        <p>Текст сообщения</p>
        <TextField
        multiline
          type="text"
          placeholder="Текст сообщения"
          value={state.channels[index].message}
          onChange={(e) => {
            dispatch(changeMessage({ index: index, message: e.target.value }));
          }}
        ></TextField>
        <div className="form__buttons">
          <button
            className="form__button button"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Добавить кнопку с быстрым ответом
          </button>
          <button
            className="form__button button"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Добавить кнопку-ссылку
          </button>
        </div>
      </div>
      <button
        className="form__button button"
        onClick={(e) => {
          e.preventDefault();
          addChannel(localStorage.getItem("token") || "", "test", ["test"], ["test"], "test", props.id);
        }}
      >
        Сохранить
      </button>
    </form>
  );
}
