import moment from "moment";

class PomodoroRatio{
  constructor(focusMins, breakMins){
    this.focusMinutes = focusMins;
    this.breakMinutes = breakMins;
    this.focusing = true;
  }

  setFocusMinutes(time){
    this.focusMinutes = time;
  }

  setBreakMinutes(time){
    this.breakMinutes = time; 
  }

  getFocusTime(){
    return new moment({minute: this.focusMinutes});
  }

  getBreakTime(){
    return new moment({minute: this.breakMinutes})
  }

  setFocus(val){
    this.focusing = val;
  }

  getStatus(){
    return this.focusing ? "Focus." : "Break.";
  }

}

export default PomodoroRatio;