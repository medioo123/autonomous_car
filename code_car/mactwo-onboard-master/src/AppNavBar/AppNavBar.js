import React from 'react';
import ReactDOM from 'react-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DriveIcon from '@material-ui/icons/DriveEta';
//import ProfileIcon from '@material-ui/icons/Face';
import ProfileIcon from '@material-ui/icons/Explore';
//import ParametersIcon from '@material-ui/icons/Build';
import ParametersIcon from '@material-ui/icons/PhotoCamera';

//import Profile from '../Profile/Profile'
import JoystickDrivingMode from '../DrivingMode/JoystickDrivingMode';
import FilmDrivingMode from '../DrivingMode/FilmDrivingMode';
import AutoPilotDrivingMode from '../DrivingMode/AutoPilotDrivingMode';
import DrivingModeButtons from '../DrivingMode/DrivingModeButtons';
//import Parameters from '../Parameters/Parameters';


class AppNavBar extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };


  showProfileModal(){
    ReactDOM.render(<AutoPilotDrivingMode />, document.getElementById('root'));
    //ReactDOM.render(<div />, document.getElementById('DrivingModeButtons'));
  }

  showDrivingModal(){
    ReactDOM.render(<JoystickDrivingMode />, document.getElementById('root'));
    //ReactDOM.render(<DrivingModeButtons />, document.getElementById('DrivingModeButtons'));
  }
  
  showParameterModal(){
    ReactDOM.render(<FilmDrivingMode />, document.getElementById('root'));
    //ReactDOM.render(<Film />, document.getElementById('film'));
    //ReactDOM.render(<div />, document.getElementById('DrivingModeButtons'));
  }

  render() {
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
      >
        <BottomNavigationAction label="Autonomous" icon={<ProfileIcon />} onClick={() => this.showProfileModal()} />
        <BottomNavigationAction label="Drive" icon={<DriveIcon />} onClick={() => this.showDrivingModal()}/>
        <BottomNavigationAction label="Create Data" icon={<ParametersIcon />} onClick={() => this.showParameterModal()}/>
      </BottomNavigation>
    );
  }
}

export default(AppNavBar);