import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButtonsGroup() {
  const [value, setValue] = React.useState('representative');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
        <FormLabel component="legend" color="grey">Access Level</FormLabel>
        <RadioGroup row color="grey" aria-label="access-level" name="access-level-1" value={value} onChange={handleChange}>
          <FormControlLabel value="representative" control={<Radio color="primary" />} label="Representative" labelPlacement="end"/>
          <FormControlLabel value="admin" control={<Radio color="primary" />} label="Administrator" labelPlacement="end" />
        </RadioGroup>
    </FormControl>
  );
}
