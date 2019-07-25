import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { startAutopilot } from './DriveClientWebSocket'
import { changeSpeedMode } from './DriveClientWebSocket'
import { stopAutopilot } from './DriveClientWebSocket'
import { setAutoPilotThreshold } from './DriveClientWebSocket'
import DiscreteSliderAvant from '../Slider/sliderAvant';

const style = {
  margin: 12,
};

class SpeedMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'constante'};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    console.log(event.target.value)
    changeSpeedMode(event.target.value);
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Choose your Speed Mode   : &nbsp;&nbsp;
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="constante">Constante</option>
            <option value="variable">Variable</option>
            <option value="variableEtFrein">Variable et Frein</option>
          </select>
        </label>
      </form>
    );
  }
}

class AutoPilotDrivingMode extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="container">
          <RaisedButton label="Start AutoPilot" primary={true} style={style} onClick={() => startAutopilot()} />
          <RaisedButton label="Stop" secondary={true} style={style} onClick={() => stopAutopilot()}/>
          <SpeedMode />
          <DiscreteSliderAvant />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default AutoPilotDrivingMode;
