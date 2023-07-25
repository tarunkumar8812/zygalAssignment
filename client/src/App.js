import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage1 from './pages/Homepage1';
import Homepage2 from './pages/Homepage2';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage1></Homepage1>}></Route>
        <Route path='/homepage1' element={<Homepage1></Homepage1>}></Route>
        <Route path='/homepage2' element={<Homepage2></Homepage2>}></Route>
      </Routes>
    </BrowserRouter>


  );
}

export default App;
