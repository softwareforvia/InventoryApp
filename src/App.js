import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home' 
import QBReports from './Pages/QBReports' 

function App() {

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/qb-reports" element={<QBReports/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
