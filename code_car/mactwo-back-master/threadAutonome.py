from threading import Thread

#import the necessary packages
from picamera.array import PiRGBArray
from picamera import PiCamera

import cv2
from keras.models import load_model
import keras
import numpy as np
from MacTwoAutonome.supervisedCar import my_cv
import time

    
class mainAutonome(Thread):
       print(10)
       def __init__(self, info,param):
        Thread.__init__(self)
        self.information = info
        self.parameters = param
        
       def run(self):
            # initialize the camera and grab a reference to the raw camera capture
            
            #model = load_model('MacTwoAutonome/Models/coulomb.hdf5')
            model = load_model('MacTwoAutonome/Models/coulomb.hdf5')
            
            camera = PiCamera()
            camera.resolution = (250, 90)
            camera.framerate = 64
            rawCapture = PiRGBArray(camera, size=(250, 90))
 
            # allow the camera to warmup
            time.sleep(0.1)
            start=time.time()
            i=0
            X=[]
            Y=[]
            
            # capture frames from the camera
            for frame in camera.capture_continuous(rawCapture, format="bgr", use_video_port=True):
              
              if (self.parameters.autopilot==True):
              
                #print(self.parameters.speedMode)
                i=i+1
                print("Image processed par seconde",1/(time.time()-start))
              	# grab the raw NumPy array representing the image, then initialize the timestamp
              	# and occupied/unoccupied text
                image = frame.array
                image = cv2.resize(image, (250, 90))
                image=cv2.flip(image,-1)
               
                
                image=np.array(image).reshape(1,90,250,3)
                
                #Run the model and get the prediction
                commande=model.predict(image)
                #print(commande)
                self.information.listAngles+=[int(commande[0][0]*180)]
                self.information.angle=(int(commande[0][0]*180))
                rawCapture.truncate(0)
                start=time.time()
                
                
              elif (self.parameters.rec==True):
                #Process image and save it only if Speed!=0
                if self.information.vitesse>0 and self.information.angle<=180:
                    print("Number of images saved",len(X))
                  	# grab the raw NumPy array representing the image, then initialize the timestamp
                  	# and occupied/unoccupied text
                    image = frame.array
                    image = cv2.resize(image, (250, 90))
                    image=cv2.flip(image,-1)
                    
                    X+=[image]
                    Y+=[self.information.angle]
                  
                #Saving Data Set
                if len(X)%3000==0:
                    print('Saving ', len(X), ' pictures..')
                    np.save('X_saved', np.array(X))
                    np.save('Y_saved', np.array(Y))
                    print('DataSet saved of ', len(X), ' pictures')
                    
                rawCapture.truncate(0)
                    
              else:       
                time.sleep(1)
                print('Not autonome')
                rawCapture.truncate(0)