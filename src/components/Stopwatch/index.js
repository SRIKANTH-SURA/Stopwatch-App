import {Component} from 'react'
import './index.css'

class StopWatch extends Component {
  state = {minutes: 0, seconds: 0, isStarted: false}

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  onClickResetBtn = () => {
    clearInterval(this.intervalId)
    this.setState({
      minutes: 0,
      seconds: 0,
      isStarted: false,
    })
  }

  onClickStopBtn = () => {
    clearInterval(this.intervalId)
    this.setState({isStarted: false})
  }

  incrementTimerSeconds = () => {
    this.setState(prevState => ({seconds: prevState.seconds + 1}))
  }

  onClickStartBtn = () => {
    const {seconds} = this.state

    if (seconds > 60) {
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
        seconds: 0,
      }))
    }
    this.setState({isStarted: true})
    this.intervalId = setInterval(this.incrementTimerSeconds, 1000)
  }

  getMinutesAndSecondsInTimeFormat = () => {
    const {minutes, seconds} = this.state
    const totalSeconds = minutes * 60 + seconds
    const minutesTimer = Math.floor(totalSeconds / 60)
    const secondsTimer = Math.floor(totalSeconds % 60)

    const stringifiedMinutes =
      minutesTimer > 9 ? minutesTimer : `0${minutesTimer}`
    const stringifiedSeconds =
      secondsTimer > 9 ? secondsTimer : `0${secondsTimer}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isStarted} = this.state

    return (
      <div className="stopwatch-app">
        <h1 className="app-title">Stopwatch</h1>
        <div className="app-content">
          <div className="timer-container">
            <p className="timer-text">
              <img
                className="timer-img"
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
              />
              Timer
            </p>
            <h1 className="timer-count">
              {this.getMinutesAndSecondsInTimeFormat()}
            </h1>
          </div>
          <div className="buttons-container">
            <button
              className="btn start-btn"
              type="button"
              disabled={isStarted}
              onClick={this.onClickStartBtn}
            >
              Start
            </button>
            <button
              className="btn stop-btn"
              type="button"
              onClick={this.onClickStopBtn}
            >
              Stop
            </button>
            <button
              className="btn reset-btn"
              type="button"
              onClick={this.onClickResetBtn}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default StopWatch
