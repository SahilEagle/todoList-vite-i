import "./App.css";
import Auth from "./pages/Auth";
import Todo from "./pages/Todo";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/todo" />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
