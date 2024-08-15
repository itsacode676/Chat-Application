import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import "./App.css";
import Login from "./Pages/Login";
import Otp from "./Pages/Otp";

function App() {
  return (
    <div className="min-h-screen w-screen">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
      </Routes>
    </div>
  );
}

export default App;
