import React, { useState, useEffect } from "react";
import useInterval from "./useInterval";
import PomodoroRatio from "./PomodoroRatio";
import "./App.css";
import Button from '@material-ui/core/Button';
import {Howl, Howler} from 'howler';
import alarm from './assets/alarm.mp3';

function Timer() {
  const hhmmssFormat = "HH:mm:ss";
  const mmssFormat = "mm:ss";
  const [ratio, setRatio] = useState(new PomodoroRatio(25, 5));
  const [count, setCount] = useState(0);
  const [speed, setSpeed] = useState(null);
  const [time, setTime] = useState(ratio.getFocusTime());

  let sound = new Howl({
    src: [alarm],
    volume: .5,
  })

  useEffect(() => {
    document.title = formatTime(time);
    // When timer reaches 0, switch focus state and reset timer.
    if (time.hours() === 0 && time.minutes() === 0 && time.seconds() === 0) {
      if (ratio.focusing) {
        setTime(ratio.getBreakTime());
        ratio.setFocus(false);
        setRatio(ratio);
      } else {
        setTime(ratio.getFocusTime());
        ratio.setFocus(true);
        setRatio(ratio);
      }
      sound.play();
    }
  });

  useInterval(() => {
    setTime(time.subtract(1, "seconds"));
    setCount(count + 1);
  }, speed);

  function startTimer(e) {
    e.preventDefault();
    setSpeed(1000);
  }

  function stopTimer(e) {
    e.preventDefault();
    setSpeed(null);
  }

  function resetTimer(e) {
    e.preventDefault();
    setTime(ratio.getFocusTime());
  }

  function formatTime(t) {
    return t.hours() < 1 ? t.format(mmssFormat) : t.format(hhmmssFormat);
  }

  return (
    <div className="TimerContainer">
      <div>{ratio.getStatus()}</div>
      <div>{formatTime(time)}</div>
      <div className="TimerButtons">
        <Button size="large" color="primary" onClick={startTimer}>Start</Button>
        <Button size="large" color="secondary" onClick={stopTimer}>Stop</Button>
        <Button size="large" color="inherit" onClick={resetTimer}>Reset</Button>
      </div>
    </div>
  );
}

export default Timer;
