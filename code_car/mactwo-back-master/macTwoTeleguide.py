import Adafruit_PCA9685
import time
from adafruit_servokit import ServoKit
kit = ServoKit(channels=16)
servo=Adafruit_PCA9685.PCA9685()
servo.set_pwm_freq(50)

class MacTwo_Teleguide():

    def __init__(self):
        pass

    def Deplacement (self,Toffs,Toffr): 
        # sens directe ==> vitesse min : Toffs = 348 , vitesse max : à définir
        # sens inverse ==> vitesse min : Toffs = 305 , vitesse max : à définir
        # Angle milieu : Toffr = 312
        # Angle max à droite : Toffr = 355
        # Angle max à gauche : Toffr = 260
        
        servo.set_pwm(2,0,Toffs) 
        servo.set_pwm(1,0,Toffr)
        #time.sleep(0.2)
        #servo.set_pwm(2,0,0)








###########################################################################################################################################   
    #def MoveDown  (Toffs): 

        #servo.set_pwm(2,0,Toffs) #( 207,310 ( à vérifier))

    #def MoveUp_Right (Toffs, Toffr ):

        #servo.set_pwm(2,0,Toffs) #( 310,330 ( à vérifier))

        #servo.set_pwm(1,0,Toffr) # ( 312 , 355 (à vérifier))


    #def MoveUp_Left (Toffs, Toffr):

        #servo.set_pwm(2,0,Toffs) #( 310,330 ( à vérifier))

        #servo.set_pwm(1,0,Toffr) # ( 312 , 260 (à vérifier))

    #def MoveDown_Right (Toffs, Toffr):

        #servo.set_pwm(2,0,Toffs) #( 207,310 ( à vérifier))
        #servo.set_pwm(1,0,Toffr) # ( 312 , 260 (à vérifier))

    #def MoveDown_Left (Toffs, Toffr):

        #servo.set_pwm(2,0,Toffs) #( 207,310 ( à vérifier))
        #servo.set_pwm(1,0,Toffr) # ( 312 , 355 (à vérifier))

