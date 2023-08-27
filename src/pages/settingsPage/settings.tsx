import "./settings.css";
import { Form } from "../../components/form/form";
import { Header } from "../../components/header/header";
import { useAppSelector } from "../../app/hooks";

export function Settings() {
  const channel = useAppSelector((state) => state.channel);
  return (
    <div className="settings">
      <Header />
      <Form id={channel.id} />
    </div>
  );
}
