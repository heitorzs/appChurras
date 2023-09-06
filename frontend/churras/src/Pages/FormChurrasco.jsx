import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, TextField, } from '@mui/material';
import './form.css'
import http from '../http';
import { format, utcToZonedTime } from 'date-fns-tz';


export default function FormChurrasco({ isAtualizacao, churrasId}) {
  const titulo = isAtualizacao ? "Atualizar Churrasco" : "Novo Churrasco"
  const botao = isAtualizacao ? "Atualizar Churrasco" : "Adicionar Churrasco"

  const [evento, setEvento] = useState([])
  const [data, setData] = useState('');
  const [obsChurras, setObsChurras] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valorSugerido, setValorSugerido] = useState('');
  

  useEffect(() => {
    
    if (isAtualizacao) {
      async function fetchChurrascosByID() {
        try {
          const response = await http.get(`${churrasId}`)
          const churrasco = await response.data
          setEvento(churrasco)
        } catch (error) {
          console.log('Erro ao encontrar churrasco')
        }
      }
      fetchChurrascosByID()
    }
    
  }, [isAtualizacao, churrasId])

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

  }, [evento]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const Churrasco = {
      data,
      descricao,
      obsChurras,
      valorSugerido,
    };
    if (isAtualizacao) {
      try {
        const atualizarChurras = await http.put(`/${churrasId}`, Churrasco)
        console.log('Resposta do servidor:', atualizarChurras.data);
        alert('Churrasco Atualizado com sucesso')
        setData('')
        setDescricao('')
        setObsChurras('')
        setValorSugerido('')
      } catch (error) {
        alert('Erro ao atualizar churrasco')

        console.error('Erro ao enviar requisição:', error);
      }
    } else {

      try {
        const response = await http.post(`/novo`, Churrasco);
        alert('Churrasco Adicionado com sucesso')

        console.log('Resposta do servidor:', response.data);

        setData('')
        setDescricao('')
        setObsChurras('')
        setValorSugerido('')


      } catch (error) {
        alert('Erro ao salvar churrasco')
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