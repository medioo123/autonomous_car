import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppHeader from './AppHeader/AppHeader';
import AppNavBar from './AppNavBar/AppNavBar';
import Profile from './Profile/Profile';
import AutoPilotDrivingMode from './DrivingMode/AutoPilotDrivingMode';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppHeader />, document.getElementById('AppHeader'));


ReactDOM.render(<AutoPilotDrivingMode />, document.getElementById('root'));


ReactDOM.render(<AppNavBar />, document.getElementById('AppNavBar'));
registerServiceWorker();
