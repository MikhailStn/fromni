import "./channels.css";
import { Header } from "../../components/header/header";
import { Registration } from "../../components/registration/registration";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { channels } from "../../data/channels";
import { Link } from "react-router-dom";
import { setChannel } from "../../store/currentChannel";

export function Channels() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.currentUser);
  return (
    <div>
      <Header />
      <main className="main">
        {!state.isAuth ? (
          <div className="channel__section main__section">
            <Registration />
          </div>
        ) : (
          <div className="channel__section">
            <div className="channels">
              {channels.map((el) => {
                return (
                  <div className="channel" key={el.id}>
                    <img className="channel__logo" src={el.logo}></img>
                    <p className="channel__name">{el.name}</p>
                    <p className="channel__status">Статус: Не активно</p>
                    <button className="channel__button button" onClick={() => dispatch(setChannel(el.id))}>
                      <Link className="channel__link" to="/settings">
                        Настроить
                      </Link>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
