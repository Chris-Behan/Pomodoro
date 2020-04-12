import moment from "moment";
/**
 * Represents a Pomodoro Ratio, which has focus minutes, break minutes,
 * and a state (focusing).
 */
class PomodoroRatio {
  constructor(focusMins, breakMins) {
    this.focusMinutes = focusMins;
    this.breakMinutes = breakMins;
    this.focusing = true;
  }

  /**
   * Set focus minutes.
   * @param {number} mins 
   */
  setFocusMinutes(mins) {
    this.focusMinutes = mins;
  }

  /**
   * Set break minutes.
   * @param {number} mins 
   */
  setBreakMinutes(mins) {
    this.breakMinutes = mins;
  }

  /**
   * Get focus minutes.
   * @return {number} Focus minutes.
   */
  getFocusMinutes() {
    return this.focusMinutes;
  }

  /**
   * Get break minutes.
   * @return {number} Break minutes.
   */
  getBreakMinutes() {
    return this.breakMinutes;
  }

  /**
   * Get a new moment object whose time is set using the focus minutes.
   * @return {moment} moment object representing focus time.
   */
  getFocusTime() {
    return new moment({ hour: 0 }).minutes(this.focusMinutes);
  }

  /**
   * Get a new moment object whose time is set using the break minutes.
   * @return {moment} moment object representing break time.
   */
  getBreakTime() {
    return new moment({ hour: 0 }).minutes(this.breakMinutes);
  }

  /**
   * Set the focus state of the PomodoroRatio object.
   * @param {boolean} val 
   */
  setFocus(val) {
    this.focusing = val;
  }

  /**
   * Get whether or not the PomodoroRatio object is in a focused state.
   * @return {boolean}
   */
  getFocus() {
    return this.focusing;
  }

  /**
   * Get a string representation of the focus state.
   * @return {string} Focus. or Break.
   */
  getStatus() {
    return this.focusing ? "Focus." : "Break.";
  }
}

export default PomodoroRatio;
