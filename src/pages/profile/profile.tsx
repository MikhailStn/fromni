import "./profile.css";
import { Header } from "../../components/header/header";
import { Registration } from "../../components/registration/registration";
import { useAppSelector } from "../../app/hooks";
import { SplashScreen } from "../../components/splashScreen/splashScreen";
import { channels } from "../../data/channels";

export function Profile() {
  const state = useAppSelector((state) => state.currentUser);
  const currentUser = useAppSelector((state) => state.currentUser);
  let counter = 0;
  return (
    <div>
      <SplashScreen />
      <Header />
      <main className="main">
        {!state.isAuth ? (
          <div className="profile__section main__section">
            <Registration />
          </div>
        ) : (
          <div className="profile__section">
            <div className="profile">
              <h2 className="profile__title">Профиль: {currentUser.currentUser.email}</h2>
              <p className="profile__subtitle">Активные каналы</p>
              <div className="profile__channels">
                {state.currentUser.channels.map((el, i) =>
                  el.isActive ? (
                    <div className="profile__item" key={el.name}>
                      <img src={channels[i].logo}></img>
                      <p className="profile__sub profile__sub_name">{channels[i].name}</p>
                      <p className="profile__sub">Текст сообщения: {el.message}</p>
                      <p style={i == 3 ? { display: "none" } : {}}>Клавиатура: {el.keyboard == "standart" ? "Стандартная" : "Inline"}</p>
                      <div style={i == 3 ? { display: "none" } : {}} className="profile__btns">
                        Быстрые ответы:
                        {el.quickButtons.map((el) => (
                          <input name="quick-button" readOnly key={el + i} value={el} className="profile__btn profile__quick_btn"></input>
                        ))}
                      </div>
                      <div style={i == 3 ? { display: "none" } : {}} className="profile__btns">
                        Ссылки:
                        {el.urlButtons.map((el) => (
                          <input name="url-button" readOnly key={el + i} value={el} className="profile__btn"></input>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div style={{ position: "absolute" }} key={el.name}>
                      <div style={{ display: "none" }}>{counter++}</div>
                      <p>{counter == 4 ? "Не найдено" : ""}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
