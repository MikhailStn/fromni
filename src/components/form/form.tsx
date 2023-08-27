import "./form.css";
import { channels } from "../../data/channels";
import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
};

export function Form(props: Props) {
  const navigate = useNavigate();
  let channel = {
    id: "",
    name: "",
    logo: "",
  };
  if (props.id == "vk") {
    channel = channels[0];
  } else if (props.id == "telegram") {
    channel = channels[1];
  } else if (props.id == "whatsapp") {
    channel = channels[2];
  } else if (props.id == "sms") {
    channel = channels[3];
  }
  return (
    <form className="form">
      <button
        className="form__button"
        onClick={() => {
          navigate("/channels");
        }}
      >
        Назад
      </button>
      <div>
        <img className="from__logo" src={channel.logo} />
      </div>
    </form>
  );
}
