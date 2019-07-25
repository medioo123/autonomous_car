# -*- coding: utf-8 -*-
"""
Created on Mon May 13 16:38:29 2019

@author: mehdi.bennanismires
"""

import cv2
import my_cv
import numpy as np

import matplotlib.pyplot as plt

train=np.load('C:/Users/mehdi.bennanismires/Desktop/OpenCV try/Datasets/axionable_data/X_train_axio.npy')
label=np.load('C:/Users/mehdi.bennanismires/Desktop/OpenCV try/Datasets/axionable_data/Y_train_axio.npy')

plt.imshow(train[0])

def abass():
    
    img_rows , img_cols = 80, 80
    
    img = cv2.imread('image.jpg',0)
    
    
    obs = cv2.resize(img, (img_rows, img_cols))
    
    edges = my_cv.detect_edges(obs, low_threshold=50, high_threshold=150)
    
    
    rho = 0.8
    theta = np.pi/180
    threshold = 25
    min_line_len = 5
    max_line_gap = 10
    
    hough_lines = my_cv.hough_lines(edges, rho, theta, threshold, min_line_len, max_line_gap)
    
    left_lines, right_lines = my_cv.separate_lines(hough_lines)
    
    filtered_right, filtered_left = [],[]
    if len(left_lines):
        filtered_left = my_cv.reject_outliers(left_lines, cutoff=(-30.0, -0.1), lane='left')
    if len(right_lines):
        filtered_right = my_cv.reject_outliers(right_lines,  cutoff=(0.1, 30.0), lane='right')
    lines = []
    if len(filtered_left) and len(filtered_right):
        lines = np.expand_dims(np.vstack((np.array(filtered_left),np.array(filtered_right))),axis=0).tolist()
    elif len(filtered_left):
        lines = np.expand_dims(np.expand_dims(np.array(filtered_left),axis=0),axis=0).tolist()
    elif len(filtered_right):
        lines = np.expand_dims(np.expand_dims(np.array(filtered_right),axis=0),axis=0).tolist()
    
    ret_img = np.zeros((80,80))
    
    if len(lines):
                    try:
                        my_cv.draw_lines(ret_img, lines, thickness=1)
                    except:
                        pass
                    
    cv2.imshow("image 2", ret_img)
