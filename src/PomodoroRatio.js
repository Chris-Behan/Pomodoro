import moment from "moment";

class PomodoroRatio{
  constructor(focusMins, breakMins){
    this.focusMinutes = focusMins;
    this.breakMinutes = breakMins;
    this.focusing = true;
  }

  setFocusMinutes(mins){
    this.focusMinutes = mins;
  }

  setBreakMinutes(mins){
    this.breakMinutes = mins; 
  }

  getFocusMinutes(){
    return this.focusMinutes;
  }

  getBreakMinutes(){
    return this.breakMinutes;
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

  getFocus(){
    return this.focusing;
  }

  getStatus(){
    return this.focusing ? "Focus." : "Break.";
  }

}

export default PomodoroRatio;