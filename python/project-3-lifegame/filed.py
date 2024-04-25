import numpy as np
import itertools as it
import matplotlib.pyplot as plt
import matplotlib.animation as anim

class Field:
  def __init__(self, x, y):
    self.x = x
    self.y = y
    self.field = np.zeros(shape=(x,y),dtype=int)
    self.pause = False

  def set_life(self, array):
    self.field = np.zeros(shape=(self.x, self.y),dtype=int)
    for (x,y) in array:
      self.field[x,y] = 1

  def step(self):
    for x,y in it.product(range(self.x),range(self.y)):
      x_min = max(x - 1, 0)
      x_max = min(x + 1, self.x)
      y_min = max(y - 1, 0)
      y_max = min(y + 1, self.y)

      around = self.field[x_min:x_max,y_min:y_max]
      lifes = np.sum(around)

      if lifes == 3:
        self.field[x,y] = 1
      elif lifes == 2:
        pass
      else:
        self.field[x,y] = 0
  
  

  def show(self):
    self.step()
    fig, ax = plt.subplots(ncols=1,nrows=1,figsize=(3,3))
    ax.imshow(self.field,cmap="binary")
  
  def play(self):
    fig, ax = plt.subplots(ncols=1,nrows=1,figsize=(3,3))
    fig.canvas.mpl_connect('button_press_event', )

field = Field(17,17)
field.set_life([[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],
                [4,5],[5,5],[6,5],[7,5],[8,5],[9,5],
                [11,4],[11,5],[11,6],[11,7],[11,8],[11,9],
                [12,4],[12,5],[12,6],[12,7],[12,8],[12,9],
                [4,7],[4,8],[4,9],[4,10],[4,11],[4,12],
                [5,7],[5,8],[5,9],[5,10],[5,11],[5,12],
                [7,11],[8,11],[9,11],[10,11],[11,11],[12,11],
                [7,12],[8,12],[9,12],[10,12],[11,12],[12,12]])
field.show()