import React from 'react'
import { format, utcToZonedTime } from 'date-fns-tz'

export default function FormatarData() {
    
    function formatarData(data) {
        const dataFormatada = format(utcToZonedTime(new Date(data), 'UTC'), 'dd/MM/yy', { timeZone: 'UTC' })
        return dataFormatada
    }
  return (
    <div data>
        {formatarData()}
    </div>
  )
}
