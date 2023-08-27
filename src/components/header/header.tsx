import "./header.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setActiveChannels, setActiveProfile } from "../../store/headerSlice";
import { logOut } from "../../store/currentUserSlice";

export function Header() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.headerNav);
  const isAuth = useAppSelector((state) => state.currentUser.isAuth);
  return (
    <div className="header__container">
      <header className="header">
        <nav className="header__nav">
          <ul className="header__nav_list">
            <li className="header__nav_item">
              <Link
                className={state.classNameProfile}
                to="/"
                onClick={() => {
                  dispatch(setActiveProfile());
                }}
              >
                Мой профиль
              </Link>
            </li>
            <li className="header__nav_item">
              <Link
                className={state.classNameChannels}
                to="/channels"
                onClick={() => {
                  dispatch(setActiveChannels());
                }}
              >
                Каналы
              </Link>
            </li>
          </ul>
        </nav>
        <button
          className={isAuth ? "header__button" : "header__button header__button_disabled"}
          disabled={isAuth ? false : true}
          onClick={() => {
            dispatch(logOut());
            localStorage.removeItem("token");
          }}
        >
          Выйти
        </button>
      </header>
    </div>
  );
}
