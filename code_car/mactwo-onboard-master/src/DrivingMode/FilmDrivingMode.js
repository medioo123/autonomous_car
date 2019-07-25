import React, { Component } from 'react'
import 'babel-polyfill'
import NippleJs from 'nipplejs'
import './JoystickDrivingMode.css';
import { MoveJoystick } from './DriveClientWebSocket'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import DiscreteSliderAvant from '../Slider/sliderAvant';

import { saveImage } from './DriveClientWebSocket'
import { stopSaveImage } from './DriveClientWebSocket'
var DriveClient = require('./DriveClientWebSocket');
var forwardDistance = DriveClient.forwardDistance;


const style = {
  margin: 12,
};



class FilmDrivingMode extends Component {

  componentWillMount() {
    this.setState({
      start: {},
      end: {},
      move: {},
      pressure: {},
    })
  }
  
  componentDidMount() {
    this.options = this.props.options
    this.options.zone = document.querySelector('.react-joystick')
    this.joystick = NippleJs.create(this.props.options)
    this.joystick
    .on('start', (evt, data) => {
      this.setState({
        start: data,
      })
	console.log(" Demarrage")
    })
    .on('end', (evt, data) => {
      this.setState({
          end: data,
      })
  MoveJoystick(270,0);
	console.log("C'est fini");

    })
    .on('move', (evt, data) => {
      this.setState({
        move: data,
      })
//	console.log(data);
	 forwardDistance = MoveJoystick(this.state.move.angle.degree, this.state.move.distance);

    })
    // a quoi cela sert-il d'appeler l'événement "pressure". (doc du joystick : "is triggered when the pressure of the joystick is changed")
    .on('pressure', (evt, data) => {
      this.setState({
        pressure: data,
      }) 
//	console.log("Pressure");
//	console.log(evt);
//	console.log(data);
    })
  }
 
  getRenderDebug() {
    this.renderDebug = false
    if (this.props.debug) {
      window.console.log(this.state)
    }
    return this.renderDebug
  }
  

      
  render() {
    return (
    <div>
      <div className="container">
        <div className="react-joystick" />
        { this.getRenderDebug() }
         
      </div>
      <MuiThemeProvider>
        <div className="start">
          <RaisedButton label="Demarrer l'Enregistrement des Images" primary={true} style={style} onClick={() => saveImage()} />
          <RaisedButton label="Arreter l'Enregistrement" secondary={true} style={style} onClick={() => stopSaveImage()}/>
        </div>
        <DiscreteSliderAvant />
        </MuiThemeProvider>
      </div>
      
    )
  }
}

FilmDrivingMode.defaultProps = {
  options: {
    zone: '',
    size: 100,
    threshold: 0.1,
    color: 'blue',
     fadeTime: 250,
     dataOnly: false,
     restOpacity: 0.5,
     multitouch: true,
     maxNumberOfNipples: 1,
     position: {
      left: '50%',
      top: '50%',
     },
    mode: 'static',
    catchDistance: 1.0,
  },
  debug: false,
}
export default FilmDrivingMode;
