import "./profile.css";
import { Header } from "../../components/header/header";
import { Registration } from "../../components/registration/registration";
import { useAppSelector } from "../../app/hooks";

export function Profile() {
  const state = useAppSelector((state) => state.currentUser);
  const currentUser = useAppSelector((state) => state.currentUser);
  return (
    <div>
      <Header />
      <main className="main">
        {!state.isAuth ? (
          <div className="profile__section main__section">
            <Registration />
          </div>
        ) : (
          <div className="profile__section">
            <div className="profile">
              <h2 className="profile__title">Мой профиль</h2>
              <p>Почта: {currentUser.currentUser.email}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
