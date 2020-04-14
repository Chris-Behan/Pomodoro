import React, { useState, useEffect } from "react";
import useInterval from "./useInterval";
import PomodoroRatio from "./PomodoroRatio";
import "./App.css";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import { Howl, Howler } from "howler";
import alarm from "./assets/alarm.mp3";
import TimeEditor from "./TimeEditer";
import ls from "local-storage";
import AlarmOffIcon from "@material-ui/icons/AlarmOff";
import Zoom from '@material-ui/core/Zoom';

/**
 * React component for the Timer.
 */
function Timer() {
  const hhmmssFormat = "H:mm:ss";
  const mmssFormat = "mm:ss";
  const [editing, setEdit] = useState(false);
  const [ratio, setRatio] = useState(new PomodoroRatio(25, 5));
  const [count, setCount] = useState(0);
  const [speed, setSpeed] = useState(null);
  const [time, setTime] = useState(ratio.getFocusTime());
  const [counter, setCounter] = useState(0);

  let sound = new Howl({
    src: [alarm],
    volume: 0.5,
  });

  // Effect called once upon loading the website.
  useEffect(() => {
    let savedFocusMins = ls.get("focusMins");
    let savedBreakMins = ls.get("breakMins");
    if (savedFocusMins !== null && savedBreakMins !== null) {
      setRatio(new PomodoroRatio(savedFocusMins, savedBreakMins));
    }
  }, []);

  // Effect used to trigger the timer when it reaches 0 and handle the state change.
  useEffect(() => {
    document.title = formatTime(time);
    // When timer reaches 0, switch focus state and reset timer.
    if (time.hours() === 0 && time.minutes() === 0 && time.seconds() === 0) {
      if (ratio.focusing) {
        setTime(ratio.getBreakTime());
        ratio.setFocus(false);
        setRatio(ratio);
        setCounter(counter + 1);
      } else {
        setTime(ratio.getFocusTime());
        ratio.setFocus(true);
        setRatio(ratio);
        setSpeed(null);
      }
      sound.play();
    }
  });

  // Effect used set the timer when it is not running.
  useEffect(() => {
    if (speed === null) {
      if (ratio.focusing) {
        setTime(ratio.getFocusTime());
      } else {
        setTime(ratio.getBreakTime());
      }
    }
  }, [ratio]);

  // Effect used to count down the timer.
  useInterval(() => {
    setTime(time.subtract(1, "seconds"));
    setCount(count + 1);
  }, speed);

  /**
   * Starts the timer.
   * @param {event} e
   */
  function startTimer(e) {
    e.preventDefault();
    setSpeed(1000);
  }

  /**
   * Stops the timer.
   * @param {event} e
   */
  function stopTimer(e) {
    e.preventDefault();
    setSpeed(null);
  }

  /**
   * Resets the timer.
   * @param {event} e
   */
  function resetTimer(e) {
    e.preventDefault();
    if (ratio.focusing) {
      setTime(ratio.getFocusTime());
    } else {
      setTime(ratio.getBreakTime());
    }
  }

  /**
   * Format's the moment object to a time string.
   * @param {moment} t
   * @return {string} string representation of the moment object.
   */
  function formatTime(t) {
    return t.hours() < 1 ? t.format(mmssFormat) : t.format(hhmmssFormat);
  }

  /**
   * Handles whether or not we are in an editing state.
   * @param {event} e
   */
  function handleEdit(e) {
    setEdit(!editing);
  }

  return (
    <div className="Container">
      <div className="TimerContainer">
        <div>{ratio.getStatus()}</div>
        <div>{formatTime(time)}</div>
        <div id="counter">Pomodoros: {counter}</div>
        <div className="TimerButtons">
          <Button size="large" color="primary" onClick={startTimer}>
            Start
          </Button>
          <Button size="large" color="secondary" onClick={stopTimer}>
            Stop
          </Button>
          <Button size="large" color="inherit" onClick={resetTimer}>
            Reset
          </Button>
        </div>
      </div>
      <Fab id="edit" color="secondary" aria-label="edit" onClick={handleEdit}>
        <EditIcon />
      </Fab>
      <Modal
        open={editing}
        onClose={handleEdit}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <TimeEditor
          editing={editing}
          focusing={ratio.focusing}
          setEdit={setEdit}
          pomodoroRatio={ratio}
          setRatio={setRatio}
        />
      </Modal>
    </div>
  );
}

export default Timer;
