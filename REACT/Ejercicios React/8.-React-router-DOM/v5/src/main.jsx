import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { AboutMe, Gallery, Home, NotFound, SingleElement } from './pages/index.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<App/>}>
          <Route index element={<Home/>}/>
          <Route path="/gallery" element={<Gallery/>}/>
          <Route path="/element/:id" element={<SingleElement/>}/>
          <Route path="*" element={<NotFound/>}/>
          <Route path="/aboutMe" element={<AboutMe/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
