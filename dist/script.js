const Timer = props => {
  return (
    React.createElement("div", { id: "timer" },
    React.createElement("div", { id: "timer-label", className: "label" }, props.label),
    React.createElement("div", { id: "time-left" }, props.timeLeft()),
    React.createElement("div", { id: "buttons" },
    React.createElement("div", { id: "start_stop", onClick: props.handleStart }, React.createElement("i", { className: "fa fa-play" })),
    React.createElement("div", { id: "reset", onClick: props.handleReset }, React.createElement("i", { className: "fa fa-refresh" })))));



};


const Session = props => {
  return (
    React.createElement("div", { id: "control" },
    React.createElement("div", { id: "session-label" }, props.label),
    React.createElement("div", { id: "increasedecrease" },
    React.createElement("div", { id: "session-increment", onClick: () => props.handleClick('session-increment') }, React.createElement("i", { className: "fa fa-plus" })),
    React.createElement("div", { id: "session-length" }, props.target),
    React.createElement("div", { id: "session-decrement", onClick: () => props.handleClick("session-decrement") }, React.createElement("i", { className: "fa fa-minus" })))));



};

const Break = props => {
  return (
    React.createElement("div", { id: "control" },
    React.createElement("div", { id: "break-label" }, props.label),
    React.createElement("div", { id: "increasedecrease" },
    React.createElement("div", { id: "break-increment", onClick: () => props.handleClick('break-increment') }, React.createElement("i", { className: "fa fa-plus" })),
    React.createElement("div", { id: "break-length" }, props.target),
    React.createElement("div", { id: "break-decrement", onClick: () => props.handleClick('break-decrement') },
    React.createElement("i", { className: "fa fa-minus" })))));



};

class Clock extends React.Component {
  constructor() {
    super();
    this.state = {
      break: 5,
      session: 25,
      minutesLeft: 25,
      secondsLeft: 0,
      isPaused: true,
      isBreak: false };


    this.handleSetup = this.handleSetup.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.counting = this.counting.bind(this);
    this.timeLeft = this.timeLeft.bind(this);

  }


  increment(value) {
    return value === 60 ? value : value + 1;
  }

  decrement(value) {
    return value === 1 ? value : value - 1;
  }


  handleSetup(id) {
    if (this.state.isPaused) {
      this.setState(prevState => {
        const prevBreak = prevState.break;
        const prevSession = prevState.session;
        return id === 'break-decrement' ? { break: this.decrement(prevBreak) } :
        id === 'break-increment' ? { break: this.increment(prevBreak) } :
        id === 'session-decrement' ? { session: this.decrement(prevSession), minutesLeft: this.decrement(prevSession) } :
        id === 'session-increment' ? { session: this.increment(prevSession), minutesLeft: this.increment(prevSession) } : console.log(id);
      });
    }
  }

  handleReset() {
    clearInterval(this.TimerID);
    document.getElementById('beep').pause();
    document.getElementById('beep').load();
    this.setState({
      break: 5,
      session: 25,
      minutesLeft: 25,
      secondsLeft: 0,
      isPaused: true,
      isBreak: false });

  }


  handleStart() {
    this.setState(prevState => {
      if (prevState.isPaused) {
        this.TimerID = setInterval(() => this.counting(), 1000);} else
      {clearInterval(this.TimerID);}
      return { isPaused: !prevState.isPaused };
    });
  }

  counting() {
    this.setState(prevState => {
      let newMinutes, newSeconds;
      const target = prevState.isBreak ?
      prevState.break :
      prevState.session;
      if (prevState.minutesLeft > 0) {
        if (prevState.secondsLeft === 0) {
          newMinutes = prevState.minutesLeft - 1;
          newSeconds = 59;
          return { minutesLeft: newMinutes,
            secondsLeft: newSeconds };
        } else
        {
          newSeconds = prevState.secondsLeft - 1;
          return {
            secondsLeft: newSeconds };

        }
      } else
      {
        if (prevState.secondsLeft === 0) {
          document.getElementById('beep').play();
          return {
            isBreak: !prevState.isBreak,
            minutesLeft: prevState.isBreak ? prevState.session : prevState.break,
            secondsLeft: 0 };

        } else {
          newSeconds = prevState.secondsLeft - 1;
          return { secondsLeft: newSeconds };
        }
      }
    });
  }

  timeLeft() {
    const minutes = this.state.minutesLeft < 10 ?
    '0' + this.state.minutesLeft :
    this.state.minutesLeft;
    const seconds = this.state.secondsLeft < 10 ?
    '0' + this.state.secondsLeft :
    this.state.secondsLeft;
    const timeLeft = minutes + ':' + seconds;
    return timeLeft;
  }

  render() {
    return (
      React.createElement("div", null,
      React.createElement(Timer, {
        label: this.state.isBreak ? 'Break' : 'Session',
        timeLeft: this.timeLeft,
        handleStart: this.handleStart,
        handleReset: this.handleReset }),
      React.createElement(Session, {
        label: "Session Duration",
        target: this.state.session,
        handleClick: this.handleSetup }),

      React.createElement(Break, {
        label: "Break Duration",
        target: this.state.break,
        handleClick: this.handleSetup }),

      React.createElement("audio", { id: "beep", src: "https://res.cloudinary.com/andrescaroc/video/upload/v1583273538/Warning-beeping-sound_mlnouw.mp3" })));


  }}


ReactDOM.render(React.createElement(Clock, null), View);