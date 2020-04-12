import React, { useState, useEffect } from "react";
import PomodoroRatio from "./PomodoroRatio";
import "./App.css";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ls from "local-storage";
/**
 * React component for editing focus and break times.
 * @param {*} props
 */
function TimeEditor(props) {
  let ratio = props.pomodoroRatio;
  const focusing = props.focusing;
  const editing = props.editing;
  const setEdit = props.setEdit;
  const setRatio = props.setRatio;
  const [focusMins, setFocusMins] = useState(ratio.getFocusMinutes());
  const [breakMins, setBreakMins] = useState(ratio.getBreakMinutes());
  const [focusError, setFocusError] = useState(false);
  const [breakError, setBreakError] = useState(false);
  const [focusErrMsg, setFocusErrMsg] = useState("");
  const [breakErrMsg, setBreakErrMsg] = useState("");

  useEffect(() => {
    if (focusMins < 1 || focusMins > 1439) {
      setFocusError(true);
      setFocusErrMsg("Invalid Input");
    }
    if (breakMins < 1 || breakMins > 1439) {
      setBreakError(true);
      setBreakErrMsg("Invalid Input");
    }
    if (focusMins >= 1 && focusMins <= 1439) {
      setFocusError(false);
      setFocusErrMsg("");
    }
    if (breakMins >= 1 && breakMins <= 1439) {
      setBreakError(false);
      setBreakErrMsg("");
    }
  }, [focusMins, breakMins]);

  function handleFocusMinuteChange(e) {
    setFocusMins(e.target.value);
  }

  function handleBreakMinuteChange(e) {
    setBreakMins(e.target.value);
  }

  function handleEdit(e) {
    if (focusError || breakError) {
      return;
    }
    ratio = new PomodoroRatio(focusMins, breakMins);
    ratio.setFocus(focusing);
    setRatio(ratio);
    ls.set("focusMins", focusMins);
    ls.set("breakMins", breakMins);
    setEdit(!editing);
  }

  return (
    <Fade in={editing}>
      <Paper id="paper">
        <TextField
          error={focusError}
          helperText={focusErrMsg}
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
          error={breakError}
          helperText={breakErrMsg}
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
