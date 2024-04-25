import numpy as np
import math
from matplotlib import pyplot as plt

class Field:
  def __init__(self,n,m):
    self.field = np.zeros((n,m))
    self.n = n
    self.m = m
    self.fr = 0.1
    for i in range(100):
      # x = math.rand()
      pass
    self.field[5][8] = 1

  def step(self):
    field = self.field.copy()
    direction = [
      [-1,-1],
      [-1,0],
      [-1,1],
      [0,-1],
      [0,1],
      [1,-1],
      [1,0],
      [1,1]]

    for i in range(self.n):
      for j in range(self.m):
        n = 0
        for dir in direction:
          offset = [i + dir[0], j + dir[1]]
          if 0 <= offset[0] < self.n and 0 <= offset[1] < self.m:
            n += self.field[offset[0]][offset[1]]
        if self.field[i][j] == 0:
          if n == 3:
            field[i][j] = 1
        if self.field[i][j] == 1:
          if n <= 1:
            field[i][j] = 0
          elif n >= 4:
            field[i][j] = 0
          else:
            field[i][j] = 1
    self.field = field

  def show(self):
    plt.clf()
    plt.imshow(self.field,cmap="Greys",vmin=0,vmax=1)
    plt.pause(self.fr)

  def pause(self):
    plt.clf()
    plt.imshow(self.field,cmap="Greys",vmin=0,vmax=1)
    plt.pause(self.fr)

  def make_life(self,e):
    if (e.xdata is None) or (e.ydata is None) or not is_pause:
      return

    if e.button == 1:
      self.field[math.floor(e.ydata + 0.5)][math.floor(e.xdata + 0.5)] = 1

is_pause = False

def on_key(e):
  global is_pause
  if e.key == " ":
    is_pause = not is_pause
    print(is_pause)

def main():
  stage = Field(100,100)
  plt.connect("key_press_event",on_key)
  plt.connect("button_press_event",stage.make_life)
  try:
    while True:
      if is_pause:
        stage.pause()
      else:
        stage.step()
        stage.show()
  except KeyboardInterrupt:
    pass

if __name__ == "__main__":
  main()


"""
show > thread
step > thread



--when pause
>click to atache field
>press to unpause
--when unpause
>throw to step
>press to pause


"""