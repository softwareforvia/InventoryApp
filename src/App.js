import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home' 
import QBReports from './Pages/QuickBase/QBReports' 
import Inventory from './Pages/Inventory/Inventory' 
import PartMaster from './Pages/PartMaster/PartMaster';

function App() {

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/inventory" element={<Inventory/>}/>
        <Route path="/part-master" element={<PartMaster/>}/>
        <Route path="/qb-reports" element={<QBReports/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
