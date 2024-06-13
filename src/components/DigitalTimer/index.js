import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timerLimitInMinutes: 25,
  timeElapsedInSeconds: 0,
}
class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timerElapsedInSeconds} = this.state
    const isButtonDisabled = timerElapsedInSeconds > 0

    return (
      <div className="increase-decrease-and-paragraph-container">
        <p className="paragraph">Set Timer Limit</p>
        <div className="increase-decrease-container">
          <button
            disabled={isButtonDisabled}
            className="decreaseButton"
            onClick={this.onDecreaseTimerLimitInMinutes}
          >
            -
          </button>
          <div className="set-timer-limit-value-container">
            <p className="timer-minute-value">{timerLimitInMinutes}</p>
          </div>
          <button
            disabled={isButtonDisabled}
            className="decreaseButton"
            onClick={this.onIncreaseTimerLimitInMinutes}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerElapsedInSeconds, timerLimitInMinutes} = this.state
    const isTimerCompleted = timerElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({
        isTimerRunning: false,
      })
    } else {
      this.setState(prevState => ({
        timerElapsedInSeconds: prevState.timerElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timerLimitInMinutes,
      timerElapsedInSeconds,
    } = this.state

    const isTimerCompleted = timerElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({
        timerElapsedInSeconds: 0,
      })
    }

    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.inCreamentTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimeRunning,
    }))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png '
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltValue = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="play-or-pause-buttons-container">
        <button
          className="button"
          type="button"
          onClick={this.onStartOrPauseTimer}
        >
          <img
            src={startOrPauseImageUrl}
            alt={startOrPauseAltValue}
            className="play-or-pause-icon"
          />
          <p className="button-text">{isTimerRunning ? 'Pause' : 'Start'}</p>
        </button>
        <button className="button" onClick={this.onResetTimer} type="button">
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            className="play-or-pause-icon"
            alt="reset icon"
          />
          <p className="button-text">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormate = () => {
    const {timerElapsedInSeconds, timerLimitInMinutes} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timerElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringfiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringfiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringfiedMinutes}:${stringfiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="big-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div>
          <div className="elapsed-container">
            <div className="time-and-labelText-container">
              <h1 className="time-and-seconds">
                {this.getElapsedSecondsInTimeFormate()}
              </h1>
              <p className="label-text">{labelText}</p>
            </div>
          </div>
          <div>
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
