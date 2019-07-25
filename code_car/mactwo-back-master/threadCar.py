from threading import Thread
import time
#import inputJoystickData
import macTwoTeleguide
import scipy.stats
import numpy as np

MacTwo = macTwoTeleguide.MacTwo_Teleguide()
  
#Toutes les fonctions utiles :
def angleToPwm(angle):
 if angle<=180:
   dx=180
   dy=-80
   return int((dy/dx)*angle)+330
 else:
     dx=180
     dy=80
     return int((dy/dx)*angle)+170


def angleToVitesse(info):
 mean=90
 std=15
 return 1300*scipy.stats.norm.pdf(info.angle,mean,std)+15

def vitesseToPwm(info,parameters):   
     if parameters.speedMode=='constante':
       #Marche Avant
       if info.angle<=180:
         return int(((info.vitesse*10)/50)+parameters.pwmAvant)
         
       #Marche arriere
       else:

         return int(parameters.pwmArriere -((info.vitesse*10)/50))
     else:
       return int(((angleToVitesse(info)*10)/50)+parameters.pwmAvant)   
       
       
class mainCar(Thread):
      
       def __init__(self, info,param):
        Thread.__init__(self)
        self.information = info
        self.parameters = param
       
       
              
              
       #L'execution du code   
       def run(self):
            print('Thread Car lance')
            i=0
            while True :
              print('SendCar')
              if self.information.vitesse==0 or i>0:
                MacTwo.Deplacement(290,angleToPwm(self.information.angle))
                if i>0:
                  i=i-1
              else:
                MacTwo.Deplacement(vitesseToPwm(self.information,self.parameters),angleToPwm(self.information.angle))
              
              if self.parameters.speedMode=='variableEtFrein':
                if np.mean(self.information.listAngles[-5:])>75 and  np.mean(self.information.listAngles[-5:])<105 and np.std(self.information.listAngles[-3:])>20:
                  MacTwo.Deplacement(290,angleToPwm(self.information.angle))
                  print("FREINAGE!!!!!!")
                  i=int(np.std(self.information.listAngles[-2:])/5)
                  
              time.sleep(1/15)

                
                        
            MacTwo.Deplacement(290,angleToPwm(90))  