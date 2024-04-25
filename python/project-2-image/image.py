import cv2
import numpy as np

img1 = np.full((200, 300, 3), 255, np.uint8)

cv2.imshow("win1",img1)
cv2.waitKey(1)

x = 0

try:
  while True:
    img1 = np.full((500, 500, 3), 255, dtype=np.uint8)
    cv2.circle(img1,(x,250),10,0,thickness=1)
    cv2.imshow("win1",img1)
    cv2.waitKey(10)
    x += 1
except KeyboardInterrupt:
  print("exit")


# cv2.waitKey(3000)
# cv2.destroyAllWindows()

# print(img1[100][100])