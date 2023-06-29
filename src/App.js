import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";

function App() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Login />;
  }
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/dashboard" element={token ? <Profile /> : <Login />} /> */}
        if(!token) {<Route path="/" element={<Login />} />}
        if(token) {<Route path="/dashboard" element={<Profile />} />}
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
