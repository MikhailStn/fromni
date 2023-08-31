import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Profile } from "./pages/profile/profile";
import { Channels } from "./pages/channels/channels";
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import { auth } from "./requests/requests";
import { setActiveChannels, setActiveProfile } from "./store/headerSlice";
import { Settings } from "./pages/settingsPage/settings";

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(auth());
  }, []);

  window.location.pathname == "/settings" ? window.location.pathname = '/channels' : false;
  window.location.pathname == "/channels" ? dispatch(setActiveChannels()) : dispatch(setActiveProfile());
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Profile />}></Route>
        <Route path="/channels" element={<Channels />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
