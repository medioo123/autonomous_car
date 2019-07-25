import React, { Component } from 'react'
import 'babel-polyfill'
import NippleJs from 'nipplejs'
import './JoystickDrivingMode.css';
import { MoveJoystick } from './DriveClientWebSocket'
import DiscreteSliderAvant from '../Slider/sliderAvant';
import DiscreteSliderArriere from '../Slider/sliderArriere';


var DriveClient = require('./DriveClientWebSocket');
var forwardDistance = DriveClient.forwardDistance;

class JoystickDrivingMode extends Component {

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
  MoveJoystick(90,0);
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
      <DiscreteSliderAvant />
      <DiscreteSliderArriere />
        </div>
   
    )
  }

}


JoystickDrivingMode.defaultProps = {
  options: {
    zone: '',
    size: 100,
    threshold: 0.1,
    color: 'purple',
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

export default JoystickDrivingMode;
