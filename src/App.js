import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layouts/Header/index.jsx";
import Login from "./Pages/Login/index.jsx";
import Dashboard from "./Pages/Dashboard/index.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="blogs" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;