import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FormChurrasco from './Pages/FormChurrasco.jsx';
import FormParticipante from './Pages/FormParticipante';
import DetalhesChurrasco from './Pages/detalhesChurrasco';
import Header from './components/Header';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
        <Header />
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='/cadastrarChurrasco' element={<FormChurrasco isAtualizacao={false}/>}/>
            <Route path='/editarChurrasco/:id' element={<FormChurrasco isAtualizacao={true}/>}/>
            <Route path='/adicionarParticipante/:id' element={<FormParticipante/>}/>
            <Route path='/editarParticipante/:id/participante/:participanteId' element={<FormParticipante isAtualizacao={true}/>}/>
            <Route path='/detalhesChurrasco/:id' element={<DetalhesChurrasco/>}/>
        </Routes>

    </BrowserRouter>
);
