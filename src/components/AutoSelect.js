import React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import teams from '../constants/teams'

const AutoSelect = (props) => {
  return (
    <Autocomplete
      disablePortal
      id='team autoselct'
      options={teams}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={props.name} />}
      onChange={(e, v) => props.onChange(v)}
    />
  )
}

export default AutoSelect
