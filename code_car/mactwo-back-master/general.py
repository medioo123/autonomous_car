#import inputJoystickData
import macTwoTeleguide
import socketio
from aiohttp import web
from threadCar import mainCar
from threadAutonome import mainAutonome

class informations:
  def __init__(self, angle,vitesse):
        self.angle=angle
        self.vitesse=vitesse
        self.listAngles=[]

class parameters:
  def __init__(self, pwmAvant,pwmArriere,speedMode):
        self.pwmAvant=pwmAvant
        self.pwmArriere=pwmArriere
        self.speedMode=speedMode
        self.autopilot=False
        self.rec=False

vitesse =0
angle=90
info=informations(angle,vitesse)
param=parameters(310,285,'constante')

threadSendCar=mainCar(info,param)
threadSendCar.daemon = True

threadAutonome=mainAutonome(info,param)
threadAutonome.daemon = True

threadSendCar.start()
threadAutonome.start()

print(5)

sio = socketio.AsyncServer()
app=web.Application()
sio.attach(app)

@sio.on('connection')
async def connection(sid,message):
    print("New Connection from socketID ", sid)
    print("the message is : ",message)


@sio.on('disconnection')
async def disconnection(sid, message):
    print("socket ID :",sid)
    print("Disconnected")

@sio.on('joystickData')
async def changeDirectionValue(sid,joystickData):
    info.angle=joystickData[0]
    info.vitesse=joystickData[1]
    print(info.angle)
    print(info.vitesse)
    if param.speedMode!='constante':
      param.speedMode='constante'
      
@sio.on('startAutopilot')
async def startAutopilot(sid):
    param.autopilot=True    
    info.vitesse=10
    info.angle=90
    print('start Autopilot')
    
@sio.on('stopAutopilot')
async def stopAutopilot(sid):
    param.autopilot=False
    info.vitesse=0
    info.angle=90
    info.listAngles=[]
    print('stopAutopilot')
    
@sio.on('pwmAvant')
async def changePwmAvant(sid,pwm):
    
    param.pwmAvant=pwm    
    print('PwmAvant change', pwm)
    
@sio.on('pwmArriere')
async def changePwmArriere(sid,pwm):
    param.pwmArriere=pwm 
    print(param.pwmArriere)
    print('PwmArriere change', pwm)
    
@sio.on('speedMode')
async def changeSpeedMode(sid,mode):

    param.speedMode=mode 
    print('Change Speed Mode ',mode)
    
    
@sio.on('saveImage')
async def changeRec(sid):
    param.rec=True
    print('SaveImage ',True)

@sio.on('stopSaveImage')
async def changeRec2(sid):
    param.rec=False
    print('Save Image ',False)      
      
web.run_app(app)
