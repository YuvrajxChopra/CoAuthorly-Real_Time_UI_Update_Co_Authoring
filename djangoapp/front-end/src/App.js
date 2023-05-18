import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/Homepage/homepage';
import MainPage from './pages/Main/mainpage';
import Dashboard from './pages/Dashboard/dashboard';
import LogIn from './pages/Login/login';
import Register from './pages/Register/register';

function App() {
  return (
    <div>
      <Router>
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>
        <Route exact path='/Main' element={<MainPage projectname="Public Project" username="YC"/>}/>
        <Route exact path='/Dashboard' element={<Dashboard/>}/>
        <Route exact path='/Login' element={<LogIn/>}/>
        <Route exact path='/Register' element={<Register/>}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
