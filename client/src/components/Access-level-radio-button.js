import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

export default function RadioButtonsGroup(props) {
  const { changeAccess } = props

  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend' color='grey'>
        Access Level
      </FormLabel>
      <RadioGroup
        row
        color='grey'
        aria-label='access-level'
        name='access-level-1'
      >
        <FormControlLabel
          value='representative'
          id='rep'
          control={<Radio color='primary' />}
          label='Representative'
          labelPlacement='end'
          onClick={() => changeAccess(id)}
        />
        <FormControlLabel
          value='administrator'
          id='admin'
          control={<Radio color='primary' />}
          label='Administrator'
          labelPlacement='end'
          onClick={() => changeAccess(id)}
        />
      </RadioGroup>
    </FormControl>
  )
}
