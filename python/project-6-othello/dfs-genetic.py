from si_prefix import si_format
import numpy as np
import itertools as it
import random
import copy
import time
import math


class Othello:
  DIRECTIONS = [[0,-1],[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1]]
  IN_ALPHABET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  IN_NUMBER = ['1', '2', '3', '4', '5', '6', '7', '8']
  SIZE = 8
  EMPTY = 0
  WHITE = -1
  BLACK = 1
  WALL = 2
  MAX_TURNS = 60

  def __init__(self):
    self.reset()

  def reset(self):
    self.board = np.zeros((self.SIZE + 2,self.SIZE  + 2), dtype=int)
    self.MovablePos = self.board.copy()
    self.MovableDir = self.board.copy()
    self.board[0,:] = self.WALL
    self.board[:,0] = self.WALL
    self.board[self.SIZE + 1,:] = self.WALL
    self.board[:,self.SIZE + 1] = self.WALL
    self.board[4,4] = self.WHITE
    self.board[5,5] = self.WHITE
    self.board[4,5] = self.BLACK
    self.board[5,4] = self.BLACK
    self.turns = 0
    self.cc = self.BLACK
    self.initMovable()
    self.actionSize = 64

    return self.board

  def putPiece(self, x, y):
    if x < 1 or self.SIZE < x:
      return False
    if y < 1 or self.SIZE < y:
      return False
    if self.MovablePos[x,y] == 0:
      return False

    self.flipPiece(x,y)
    self.turns += 1
    self.cc = - self.cc
    self.initMovable()

    return True

  def flipPiece(self,x,y):
    self.board[x,y] = self.cc

    dir = self.MovableDir[x,y]

    for n, (d_x, d_y) in enumerate(self.DIRECTIONS):
      if dir & 2**n:
        c_x = x + d_x
        c_y = y + d_y

        while self.board[c_x,c_y] == -self.cc:
          self.board[c_x,c_y] = self.cc
          c_x += d_x
          c_y += d_y

  def checkMobility(self, x, y, color):
    dir = 0

    if self.board[x,y] != self.EMPTY:
      return dir

    for n, (d_x, d_y) in enumerate(self.DIRECTIONS):
      if self.board[x + d_x,y + d_y] == -color:
        c_x = x + d_x*2
        c_y = y + d_y*2

        while self.board[c_x,c_y] == -color:
          c_x += d_x
          c_y += d_y
        if self.board[c_x,c_y] == color:
          dir |= 2**n

    return dir

  def initMovable(self):
    self.MovablePos[:, :] = False
    for x, y in it.product(range(1,self.SIZE+1),range(1,self.SIZE+1)):
      dir = self.checkMobility(x,y,self.cc)
      self.MovableDir[x,y] = dir

      if dir != 0:
        self.MovablePos[x,y] = True

  def display(self):
    print(' a b c d e f g h')
    for y in range(1,9):
      print(y,end="")
      for x in range(1,9):
        grid = self.board[x,y]
        if grid == self.EMPTY:
          print('・',end="")
        elif grid == self.WHITE:
          print('●',end="")
        elif grid == self.BLACK:
          print('○',end="")
      print()

  def isGameOver(self):
    if self.turns >= self.MAX_TURNS:
      return True
    if self.MovablePos[:,:].any():
      return False
    for x, y in it.product(range(1,self.SIZE+1),range(1,self.SIZE+1)):
      if self.checkMobility(x,y,-self.cc) != 0:
        return False

    return True

  def skip(self):
    if self.MovablePos[:,:].any():
      return False
    if self.isGameOver():
      return False
    self.cc = -self.cc
    self.initMovable()

    return True

  def randomInput(self):
    if self.skip == True:
      return False

    grids = np.where(self.MovablePos == 1)

    random_chose_index = random.randrange(len(grids[0]))
    x_grid = grids[0][random_chose_index]
    y_grid = grids[1][random_chose_index]

    return [x_grid,y_grid]

  def step(self,inputs):
    x = inputs[0]
    y = inputs[1]

    if not self.putPiece(x,y):
      print("FALSE")
    terminal = self.isGameOver()

    info = [self.MovableDir,self.MovablePos]
    return self.board,terminal,info

  def searchWinner(self,color):
    my_stones = np.count_nonzero(self.board[:, :] == color)
    op_stones = np.count_nonzero(self.board[:, :] == -color)

    if my_stones > op_stones:
      return True
    else:
      return False

  def board_to_str(self):
    res = ""
    for i,(x,y) in enumerate(it.product(range(self.SIZE+2),range(self.SIZE+2))):
      grid = self.board[x,y]
      res += str(grid)

    return res

  def putNatural(self,inputs):
    # [a-h][1-8]の入力処理
    if not(inputs[0] in self.IN_ALPHABET and inputs[1] in self.IN_NUMBER and len(inputs) == 2):
      return False,None

    x = self.IN_ALPHABET.index(inputs[0]) + 1
    y = self.IN_NUMBER.index(inputs[1]) + 1
    return True, [x,y]

class DFS:
  def __init__(self):
    self.d = np.load('D:\private\programs\python\project-6-othello\genetic.npy')
    self.searched = 0
    self.before_output_len = 0
    self.start_time = time.time()
    self.before_time = time.time()
    self.one_second_timer = 0
    self.before_process = 0
    self.one_second_process = 0

  def search(self,env,depth=0,limit_depth=3):
    scores = []
    env.skip()
    pos = np.where(env.MovablePos[:,:]==1)
    pos = np.transpose(pos)

    if depth >= limit_depth:
      score = np.tensordot(env.board[1:-1,1:-1],self.d)
      scores.append(score)
    else:
      for action in pos:
        n_env = copy.deepcopy(env)
        board, done, info = n_env.step(action)
        if done:
          score = np.tensordot(env.board[1:-1,1:-1],self.d)
          scores.append(score)
        else:
          results = self.search(n_env,depth+1,limit_depth)
          scores.append(max(results))

    assert len(scores) != 0

    self.print_progress()

    return scores

  def act(self,env,depth=0,limit_depth=3):
    pos = np.where(env.MovablePos[:,:]==1)
    pos = np.transpose(pos)
    results = self.search(env,depth,limit_depth)

    index = np.argmax(results)
    action = pos[index]

    return action

  def print_progress(self):
    now_time = time.time()
    delta_time = now_time - self.before_time
    self.before_time = now_time
    self.one_second_timer += delta_time
    self.searched += 1

    if self.one_second_timer >= 1:
      self.one_second_timer = 0
      self.one_second_process = self.searched - self.before_process
      self.before_process = self.searched

      elapsed_time = time.time() - self.start_time
      s = str(math.floor(elapsed_time) % 60).zfill(2)
      m = str((math.floor(elapsed_time/60)) % 60).zfill(2)
      h = str((math.floor(elapsed_time/360)) % 24).zfill(2)
      elapsed_time = h + ':' + m + ':' + s
      steps = si_format(self.searched, precision=2)
      o_s_steps = si_format(self.one_second_process, precision=2)
      s = "\b" * self.before_output_len
      print(s,end='')
      s = 'now searched... : ' + str(steps) + ' steps | ' + str(o_s_steps) + ' it/s | ' + elapsed_time + 's'
      self.before_output_len = len(s)
      print(s,end='')

dfs = DFS()
env = Othello()

print(dfs.act(env,limit_depth=60))