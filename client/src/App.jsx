import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import "./App.css";
import Login from "./Pages/Login";
import Otp from "./Pages/Otp";
import Dashboard from "./Pages/Dashboard";
import SelectedChats from "./Pages/SelectedChats";
import Protected from "./Components/Reuseable/Protected";

function App() {
  return (
    <div className="min-h-screen w-screen">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route
          path="/dashboard"
          element={
            <Protected Component={Dashboard}/>
          }
        >
          <Route
            path="/dashboard/selectedChat/:chatId"
            element={<SelectedChats />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
