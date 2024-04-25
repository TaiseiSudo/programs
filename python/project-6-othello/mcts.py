import numpy as np
import itertools as it
import random
import numpy as np
import copy
import tqdm
import json

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
          print(' ●',end="")
        elif grid == self.BLACK:
          print(' ○',end="")
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

class MCTS:
  def __init__(self,uct_c=np.sqrt(2.0),threshold=50,times=1000,p_color=Othello.BLACK):
    self.N = {}
    self.W = {}
    self.cut_c = uct_c
    self.threshold = threshold
    self.times = times
    self.p_color = p_color

  def get_uct(self,env,state) -> list:
    self.init_state(env,state)
    N = np.sum(self.N[state]["n"])
    uct = []
    for i,n in enumerate(self.N[state]["n"]):
      if n == 0:
        uct.append(np.inf)
      else:
        q = self.W[state][i] / n
        cost = self.cut_c * np.sqrt(np.log(N) / n)
        uct.append(q + cost)

    return uct

  def random_play(self,env):
    done = False
    env.skip()
    if env.isGameOver():
      result = env.searchWinner(self.p_color)

      return result
    while not done:
      env.skip()
      action = env.randomInput()
      board, done, info = env.step(action)
      if done:
        result = 1 if env.searchWinner(self.p_color) else 0

    return result

  def simulation(self,env,depth=0):
    env.skip()
    state = env.board_to_str()
    uct = self.get_uct(env,state)
    # ERROR: uct is empty!! need skip() function!
    index = np.argmax(uct)
    action = self.N[state]["pos"][index]

    if self.N[state]["n"][index] < self.threshold:
      reward = self.random_play(copy.deepcopy(env))
    else:
      board, done, info = env.step(action)
      reward = 1 if env.searchWinner(self.p_color) else 0

      if done:
        pass
      else:
        n_state = env.board_to_str()
        reward = self.simulation(env,depth+1)
    self.N[state]["n"][index] += 1
    self.W[state][index] += reward

    return reward

  def policy(self,env,training=True) -> list:
    state = env.board_to_str()
    self.init_state(env,state)

    if training:
      with tqdm.trange(self.times) as t:
        for i in t:
          self.simulation(copy.deepcopy(env))

    index = np.argmax(self.N[state]["n"])
    action = self.N[state]["pos"][index]

    return action

  def init_state(self,env,state):
    if state not in self.N:
      pos = np.where(env.MovablePos[:,:]==1)
      pos = np.transpose(pos)
      pos = pos.tolist()
      self.N[state] = {}
      self.N[state]["n"] = [0] * len(pos)
      self.N[state]["pos"] = pos
      self.W[state] = [0] * len(pos)

print('threshold(100): ',end='')
threshold = int(input())
print('times(10000): ',end='')
times = int(input())
print('agent_color(-1/WHITE): ',end='')
agent_color = int(input())

env = Othello()
agent_color = Othello.WHITE
mcts = MCTS(threshold=threshold,
            times=times,
            p_color=agent_color)

with open('D:\private\programs\python\project-6-othello\mcts_N.json') as f:
  try:
    mcts.N = json.load(f)
  except:
    pass
with open('D:\private\programs\python\project-6-othello\mcts_W.json') as f:
  try:
    mcts.W = json.load(f)
  except:
    pass

print('study_times: ',end='')
study_times = int(input())

for i in range(study_times):
  env.reset()
  done = False
  while not done:
    env.skip()
    env.display()
    if env.cc == agent_color:
      action = mcts.policy(copy.deepcopy(env),training=True)
    else:
      action = env.randomInput()

      # res = False
      # while not res:
      #   print('enter point:',end='')
      #   action = input()
      #   res, action = env.putNatural(action)
      #   if not res:
      #     print('正しい手を入力してください。例 : a1')
    board, done, info = env.step(action)
    if done:
      env.display()
      if env.searchWinner(Othello.BLACK):
        print('黒の勝ち')
      else:
        print('白の勝ち')

  with open('D:\private\programs\python\project-6-othello\mcts_N.json', 'w') as f:
      json.dump(mcts.N, f, indent=2)
  with open('D:\private\programs\python\project-6-othello\mcts_W.json', 'w') as f:
      json.dump(mcts.W, f, indent=2)