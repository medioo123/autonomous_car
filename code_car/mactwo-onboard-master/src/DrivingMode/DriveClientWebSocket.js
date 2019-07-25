//import openSocket from 'socket.io-client';
const openSocket = require ('socket.io-client');
//import { isNumber } from 'util';
const  socket = openSocket('http://192.168.43.210:8080');
var forwardDistance = 20;


//MoveJoystick()
function MoveJoystick(degree, distance) {
	var joystickData = [degree,distance];

	socket.emit('joystickData',joystickData);
	
	//socket.emit('joystickData', 'up');
	console.log('Joystick :', joystickData);

	
}

function startAutopilot() {
	socket.emit('startAutopilot');
	console.log('startAutopilot');

	
}

function stopAutopilot() {
	socket.emit('stopAutopilot');
	console.log('stopAutopilot');

	
}

function pwmAvant(pwm) {
	socket.emit('pwmAvant',pwm);
  
	console.log('changePwmAvant');
  console.log(pwm)

	
}

function pwmArriere(pwm) {
	socket.emit('pwmArriere',pwm);
	console.log('changePwmArriere');

	
}


	
 
function changeSpeedMode(mode) {
  console.log(mode)

	socket.emit('speedMode',mode);
	console.log('ChangeSpeedMode');

	
}

function saveImage() {
	socket.emit('saveImage');
	console.log('save Image True');
}
function stopSaveImage() {
	socket.emit('stopSaveImage');
	console.log('stop saving image');
}

function MoveAccelerometer(x, y, counter) {
	var joystickData = "";
	if (counter < 50)
		return counter + 1;
	
	if (x > -2 && x < 2 && y > -2 && y < 2) {
		//STOP
			joystickData = "STOP";
		}else if (x > 2 && y > - 2 && y < 2){
			//Rotate RIGHT
			joystickData = "ROTATE RIGHT";
		} else if (x > 2 && y > 2) {
			//Move UP RIGHT
			joystickData = "MOVE UP RIGHT";		
		} else if (x > -2 && x < 2 && y > 2) {
			//Move UP
			joystickData = "MOVE UP";		
		} else if (x < -2 && y > 2) {
			//Move UP LEFT
			joystickData = "MOVE UP LEFT";		
		} else if (x < -2 && y > -2 && y < 2) {
			// Rotate LEFT
			joystickData = "ROTATE LEFT";		
		} else if (x < -2 && y < -2) {
			// Move DOWN LEFT 
			joystickData = "MOVE DOWN LEFT";		
		} else if (x > -2 && x < 2 && y < -2) {
			// Move DOWN
			joystickData = "MOVE DOWN";		
		} else if (x > 2 && y < -2) {
			//Move DOWN RIGHT
			joystickData = "MOVE DOWN RIGHT";		
		}
		var speed = x;
		socket.emit(joystickData, speed);
		return 0;
}

function Stop() {
    socket.emit('STOP');
}

function AutoPilot() {
    socket.emit('AUTO PILOT');
}

function setAutoPilotThreshold() {
	socket.emit('SET AUTO PILOT THRESHOLD');
//	socket.on('environmentType', function(envType) {environmentType = envType;});
//	return environmentType;
}


export { MoveJoystick };

export { MoveAccelerometer };
export { stopAutopilot };
export { startAutopilot };
export { forwardDistance };
export { setAutoPilotThreshold };
export { pwmArriere };
export { pwmAvant };
export { changeSpeedMode };
export { saveImage };
export { stopSaveImage };

//export { environmentType };

