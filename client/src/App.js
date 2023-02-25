import logo from './logo.svg';
import './App.css';
import Home from "./Pages/Home"
import Chat from "./Pages/Chat"
import {Routes,Route} from "react-router-dom"


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/chat' element={<Chat/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
