import React from 'react'
import Header from '../components/Header'
import axios from 'axios';
import { useState } from 'react';
import { Button, Checkbox, TextField, } from '@mui/material';
import './form.css'


export default function CadastrarChurrasco() {

  const [data, setData] = useState('');
  const [obs, setObs] = useState('');
  const [obsChurras, setObsChurras] = useState('');
  const [descricao, setDescricao] = useState('');
  //participantes
  const [nomeParticipante, setNomeParticipante] = useState('');
  const [valorContribuicao, setValorContribuicao] = useState('');
  const [bebida, setBebida] = useState(false);
  const [pago, setPago] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const novoChurrasco = {
      data,
      descricao,
      obsChurras,
      participantes: [{
        nome: nomeParticipante,
        valorContribuicao,
        bebida,
        pago,
        obs,
      }]

    };

    try {
      const response = await axios.post(`http://localhost:5000/Churrascos`, novoChurrasco);
      console.log('Resposta do servidor:', response.data);

      setData('')
      setDescricao('')
      setNomeParticipante('')
      setObs('')
      setObsChurras('')
      setValorContribuicao('')
      setPago(false)
      setBebida(false)

    } catch (error) {
      console.error('Erro ao enviar requisição:', error);
    }
  };


  return (
    <>
      <Header />
      <div className='wrapper'>

        <form className='form_wrap' onSubmit={handleSubmit}>
          <h1>Novo Churrasco</h1>

          <input className="input_date" type='date'
            label="escolha a data do churrasco"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />

          <TextField
            className='input'
            variant="standard"
            label="Novo do Evento"
            value={descricao} onChange={(e) => setDescricao(e.target.value)}
            required />

          <TextField
            className='input'
            placeholder='Descricao do churrasco'
            id='multiline'
            value={obsChurras}
            onChange={(e) => setObsChurras(e.target.value)}
          />

          {/* <h1>Novo Participante</h1>

          <TextField className='input'
            variant='standard'
            label="Nome do Participante"
            value={nomeParticipante}
            onChange={(e) => setNomeParticipante(e.target.value)}
            required
          />

          <TextField className='input'
            variant='standard'
            label="valor da Contribuição"
            type="number" value={valorContribuicao}
            onChange={(e) => setValorContribuicao(e.target.value)}
            required
          /> 

           <div>
            <label>Bebida:</label>
            <Checkbox label="Bebida" checked={bebida} onChange={(e) => setBebida(e.target.checked)} />
          
            <label>Pago:</label>
            <Checkbox type="checkbox" checked={pago} onChange={(e) => setPago(e.target.checked)} />
          </div>
            <TextField
              className='input'
              id='multiline'
              placeholder='OBS do participante'
              value={obs} onChange={(e) => setObs(e.target.value)} /> */}

          <Button variant="outlined" type="submit">Adicionar Churrasco</Button>
        </form>
      </div>

    </>


  )
}