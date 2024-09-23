import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Status from "./Components/Status/Status";
import CreateGroup from "./Components/Group/CreateGroup";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";


function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile" element={<HomePage/>}/>
        <Route path="/createGroup" element={<HomePage/>} />
        <Route path="/status" element={<Status/>}/>
        <Route path="/status/:userId" element={<Status/>} />
      </Routes>
    </div>
  );
}

export default App;
