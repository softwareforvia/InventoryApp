import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home' 
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import QBReports from './Pages/QuickBase/QBReports' 
import Inventory from './Pages/Inventory/Inventory' 
import PartsPage from './Pages/Parts/PartsPage';

function App() {

  return (
    <div className="App">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/inventory/*" element={<Inventory/>}/>
        <Route path="/parts/*" element={<PartsPage/>}/>
        <Route path="/qb-reports/*" element={<QBReports/>}/>
      </Routes>
    </BrowserRouter>
    </LocalizationProvider>
    </div>
  );
}

export default App;
