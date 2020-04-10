import React, { useState, useEffect } from "react";
import PomodoroRatio from "./PomodoroRatio";
import "./App.css";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ls from "local-storage";

function TimeEditor(props) {
  let ratio = props.pomodoroRatio;
  const focusing = props.focusing;
  const editing = props.editing;
  const setEdit = props.setEdit;
  const setRatio = props.setRatio;
  const [focusMins, setFocusMins] = useState(ratio.getFocusMinutes());
  const [breakMins, setBreakMins] = useState(ratio.getBreakMinutes());

  function handleFocusMinuteChange(e) {
    if (e.target.value < 1 || e.target.value > 1440) {
      return;
    }
    setFocusMins(e.target.value);
  }

  function handleBreakMinuteChange(e) {
    if (e.target.value < 1 || e.target.value > 1440) {
      return;
    }
    setBreakMins(e.target.value);
  }

  function handleEdit(e) {
    ratio = new PomodoroRatio(focusMins, breakMins);
    ratio.setFocus(focusing);
    setRatio(ratio);
    ls.set('focusMins', focusMins);
    ls.set('breakMins', breakMins);
    setEdit(!editing);
  }

  return (
    <Fade in={editing}>
      <Paper id="paper">
        <TextField
          type="number"
          defaultValue={ratio.getFocusMinutes()}
          value={focusMins}
          onChange={handleFocusMinuteChange}
          label="Focus time"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">Mins</InputAdornment>
            ),
          }}
        ></TextField>
        <TextField
          label="Break time"
          type="number"
          defaultValue={ratio.getBreakMinutes()}
          value={breakMins}
          onChange={handleBreakMinuteChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">Mins</InputAdornment>
            ),
          }}
        ></TextField>
        <Button size="large" color="secondary" onClick={handleEdit}>
          ok
        </Button>
      </Paper>
    </Fade>
  );
}

export default TimeEditor;
