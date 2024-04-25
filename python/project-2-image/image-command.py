import cv2
import numpy as np

img = cv2.imread("test.jpg")
img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

printer = [" ", "-", "*", "#"]

for i in img:
  for j in i:
    print(printer[j // 64] + " ",end="")
  print()