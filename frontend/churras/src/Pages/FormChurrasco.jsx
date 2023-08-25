import React, { useEffect } from 'react'
import Header from '../components/Header'
import { useState } from 'react';
import { Button, TextField, } from '@mui/material';
import './form.css'
import http from '../http';
import { useParams } from 'react-router-dom';
import { format, utcToZonedTime } from 'date-fns-tz';


export default function FormChurrasco({ isAtualizacao }) {

  const titulo = isAtualizacao ? "Atualizar Churrasco" : "Novo Churrasco"
  const botao = isAtualizacao ? "Atualizar Churrasco" : "Adicionar Churrasco"

  const [evento, setEvento] = useState([])
  const parametros = useParams();
  const [data, setData] = useState('');
  const [obsChurras, setObsChurras] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valorSugerido, setValorSugerido] = useState('');

  useEffect(() => {
    if (isAtualizacao) {
      async function fetchChurrascosByID() {
        try {
          const response = await http.get(`${parametros.id}`)
          const churrasco = await response.data
          setEvento(churrasco)
          return
        } catch (error) {
          console.log('Erro ao encontrar churrasco')
        }
      }
      fetchChurrascosByID()
    }

  }, [])

  useEffect(() => {
    evento.map((e) => {
      const d = formatarData(e.data)
      setData(d)
      const des = evento.map((e) => e.descricao)
      setDescricao(des[0])
      const obs = evento.map((e) => e.obsChurras)
      setObsChurras(obs[0])
      const valor = evento.map((e) => e.valorSugerido)
      setValorSugerido(valor[0])
    })

    console.log(evento); // Aqui você verá o valor atualizado do estado após o fetch
  }, [evento]);



  const handleSubmit = async (event) => {
    event.preventDefault();

    const Churrasco = {
      data,
      descricao,
      obsChurras,
      valorSugerido,
    };
    if (parametros.id) {
      try {
        const atualizarChurras = await http.put(`/${parametros.id}`, Churrasco)
        console.log('Resposta do servidor:', atualizarChurras.data);
        setData('')
        setDescricao('')
        setObsChurras('')
        setValorSugerido('')

      } catch (error) {
        console.error('Erro ao enviar requisição:', error);
      }
    } else {

      try {
        const response = await http.post(`/novo`, Churrasco);
        console.log('Resposta do servidor:', response.data);

        setData('')
        setDescricao('')
        setObsChurras('')
        setValorSugerido('')

      } catch (error) {
        console.error('Erro ao enviar requisição:', error);
      }
    };
  }

  function formatarData(data) {
    const dataFormatada = format(utcToZonedTime(new Date(data), 'UTC'), "yyyy-MM-dd", { timeZone: 'UTC' })

    return dataFormatada
  }
  return (
    <>
      <Header />
      <div className='wrapper'>

        <form className='form_wrap' onSubmit={handleSubmit}>
          <h1>{titulo}</h1>
          <div className="input_date">
            <h4>Quando?</h4>
            <input className="input_date" type='date'
              label="escolha a data do churrasco"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>

          <TextField
            className='input'
            variant="standard"
            label="Novo do Evento"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required />

          <TextField
            className='input'
            placeholder='Descricao do churrasco'
            id='multiline'
            value={obsChurras}
            onChange={(e) => setObsChurras(e.target.value)}
          />

          <TextField className='input'
            variant='standard'
            placeholder='Escolha valor sugerido com e sem bebida'
            label="Valor Sugerido"
            value={valorSugerido}
            onChange={(e) => setValorSugerido(e.target.value)}
            required
          />
          <Button variant="outlined" type="submit">{botao}</Button>
        </form>
      </div>
    </>
  )
}