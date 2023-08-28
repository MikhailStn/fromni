import { useAppSelector } from "../../app/hooks";
import "./splashScreen.css";

export function SplashScreen() {
  const className = useAppSelector((state) => state.splash.className);
  return (
    <div className={className}>
      <div className="loader"></div>
    </div>
  );
}
