
import numpy as np

import matplotlib.pyplot as plt


def error_classification(y,y_predict):
    
    accuracy=0
    
    accuracy_classe_0=0
    accuracy_classe_1=0
    accuracy_classe_2=0
    accuracy_classe_3=0
    accuracy_classe_4=0

    accuracy_classe_0_true=0
    accuracy_classe_1_true=0
    accuracy_classe_2_true=0
    accuracy_classe_3_true=0
    accuracy_classe_4_true=0

    print(len(y))
    for i in range(len(y)):
        if (y[i][0]==1):
            accuracy_classe_0+=1
            if (y_predict[i][0]):
                accuracy_classe_0_true+=1

        if (y[i][1]==1):
            accuracy_classe_1+=1
            if (y_predict[i][1]):
                accuracy_classe_1_true+=1
                
        if (y[i][2]==1):
            accuracy_classe_2+=1
            if (y_predict[i][2]):
                accuracy_classe_2_true+=1
                
        if (y[i][3]==1):
            accuracy_classe_3+=1
            if (y_predict[i][3]):
                accuracy_classe_3_true+=1
        
        if (y[i][4]==1):
            accuracy_classe_4+=1
            if (y_predict[i][4]):
                accuracy_classe_4_true+=1
        
                
    print("accuracy forte droite = ", accuracy_classe_0_true/accuracy_classe_0)
    print("accuracy droite = ", accuracy_classe_1_true/accuracy_classe_1)
    print("accuracy tout droit = ", accuracy_classe_2_true/accuracy_classe_2)
    print("accuracy gauche = ", accuracy_classe_3_true/accuracy_classe_3)
    print("accuracy forte gauche = ", accuracy_classe_4_true/accuracy_classe_4)
   
    number_true=0
    for i in range(len(y_predict)):
        if str(y[i])==str(y_predict[i]):
                number_true=number_true+1
    accuracy=number_true/len(y_predict)
    print("Accuracy =", accuracy)

    gauche=0
    gaucheTrue=0
    toutDroit=0
    toutDroitTrue=0
    droite=0
    droiteTrue=0

    for i in range(len(y)):
        if (y[i][0]==1 or y[i][1]==1):
            gauche+=1
            if (y_predict[i][0]==1 or y_predict[i][1]==1):
                gaucheTrue+=1
        if (y[i][3]==1 or y[i][4]==1):
            droite+=1
            if (y_predict[i][3]==1 or y_predict[i][4]==1):
                droiteTrue+=1    
        if (y[i][2]==1):
            toutDroit+=1
            if (y_predict[i][2]==1):
                toutDroitTrue+=1 
    print("Droite = ", gaucheTrue/gauche)
    print("Gauche = ", droiteTrue/droite)
    print("Tout Droit = ", toutDroitTrue/toutDroit)
   
    
    #Erreur difference
    S=0
    for i in range(len(y_predict)):
        test=y[i][0]*0+y[i][1]*1+y[i][2]*2+y[i][3]*3+y[i][4]*4
        pred=y_predict[i][0]*0+y_predict[i][1]*1+y_predict[i][2]*2+y_predict[i][3]*3+y_predict[i][4]*4
        S+=np.abs(test-pred)

    print("Somme erreur", S)
    print("Erreur moyenne lors erreur ",S/(len(y)-number_true))
    print("Erreur moyenne",S/(len(y)))
    
    
def error_regression(Y_test,Y_pred):
    erreur_relative=180*np.abs(Y_test-Y_pred)
    print("En général :")
    print("L'erreur relative moyenne est de ", np.mean(erreur_relative))
    print("La standard deviation moyenne est de ", np.std(erreur_relative))


    
    angles=[0,30,80,100,150,180]
    box=['forte droite', 'droite', 'tout droit', 'gauche', 'forte Gauche']
    
    for i in range(len(angles)-1):
        test=[]
        pred=[]

        print(box[i])
        test=Y_test[(Y_test>angles[i]/180) & (Y_test<=angles[i+1]/180)]
        pred=Y_pred[(Y_test>angles[i]/180) & (Y_test<=angles[i+1]/180)]
        ecart_relatif=180*(np.abs(test-pred))
        print("La moyenne des ecarts est de ", np.mean(ecart_relatif))
        print("La standard deviation est de ", np.std(ecart_relatif))
    
