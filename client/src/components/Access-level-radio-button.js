import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export default function RadioButtonsGroup(props) {
  const { changeAccess, getAccess } = props;

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">
        Access Level
      </FormLabel>
      <RadioGroup
        row
        color="grey"
        aria-label="access-level"
        name="access-level-1"
      >
        <FormControlLabel
          value="representative"
          id="rep"
          control={<Radio color="primary" />}
          label="Representative"
          labelPlacement="end"
          onClick={(e) => changeAccess(e.target.value)}
          checked={"representative" == getAccess()}
        />
        <FormControlLabel
          value="administrator"
          id="admin"
          control={<Radio color="primary" />}
          label="Administrator"
          labelPlacement="end"
          onClick={(e) => changeAccess(e.target.value)}
          checked={"administrator" == getAccess()}
        />
      </RadioGroup>
    </FormControl>
  );
}
