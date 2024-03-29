import Register from "./pages/Register.jsx";
import "./style.scss"
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import{
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {AuthContext} from "./context/AuthContext.js";
import { useContext } from "react";


function App() {
  const{currentUser} = useContext(AuthContext)

  const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to="/login"/>
    }

    return children
  }
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<ProtectedRoute>
          <Home />
          </ProtectedRoute>
        } />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

      </Route>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
