import React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import { isNilorEmpty } from '../utils/common'

const AutoSelect = (props) => {
  const err = isNilorEmpty(props.name)
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} error>
      <Autocomplete
        disablePortal
        id='team autoselct'
        options={props.teams}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={props.label} />}
        onChange={(e, v) => props.onChange(v)}
      />
      {err && <FormHelperText>Select {props.label}</FormHelperText>}
    </FormControl>
  )
}

export default AutoSelect
