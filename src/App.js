import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Login, Register, Dashboard} from './Pages/index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index path = "/login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;