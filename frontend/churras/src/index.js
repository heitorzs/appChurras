import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CadastrarChurrasco from './Pages/cadastrarChurrasco';
import AdicionarParticipante from './Pages/adicionarParticipante'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='/cadastrarChurrasco' element={<CadastrarChurrasco />}/>
            <Route path='/adicionarParticipante' element={<AdicionarParticipante/>}/>
        </Routes>

    </BrowserRouter>
);
