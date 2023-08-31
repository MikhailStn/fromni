import "./settings.css";
import { Form } from "../../components/form/form";
import { Header } from "../../components/header/header";
import { useAppSelector } from "../../app/hooks";
import { Registration } from "../../components/registration/registration";
import { SplashScreen } from "../../components/splashScreen/splashScreen";

export function Settings() {
  const state = useAppSelector((state) => state.currentUser);
  const channel = useAppSelector((state) => state.channel);
  return state.isAuth ? (
    <div className="settings">
      <SplashScreen/>
      <Header />
      <Form id={channel.id} />
    </div>
  ) : (
    <div>
      <SplashScreen/>
      <Header />
      <div className="registration__wrapper">
        <Registration />
      </div>
    </div>
  );
}
