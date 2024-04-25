import glob
import csv
import matplotlib.pylab as plt

def syusi_category_all(data):
  label = data.pop(0)
  category = {"syu":{},"si":{}}
  syu_index = label.index("収入")
  si_index = label.index("支出")
  category_index = label.index("カテゴリ")
  category_detail_index = label.index("カテゴリの内訳")

  for elm in data:
    category_name = elm[category_index] + " - " + elm[category_detail_index]
    if category_name not in category["syu"]:
      category["syu"][category_name] = 0
    if category_name not in category["si"]:
      category["si"][category_name] = 0
    category["syu"][category_name] += int(elm[syu_index])
    category["si"][category_name] += int(elm[si_index])

  syu_x = []
  syu_y = []
  si_x = []
  si_y = []

  for x,y in category["syu"].items():
    if y != 0:
      syu_x.append(x)
      syu_y.append(y)
  for x,y in category["si"].items():
    if y != 0:
      si_x.append(x)
      si_y.append(y)

  fig, axes = plt.subplots(nrows=2, ncols=1, sharex=False)
  plt.rcParams["font.family"] = "MS Gothic"
  # plt.xticks(rotation=90)
  # plt.bar(syu_x,syu_y)
  # plt.bar(si_x,si_y)
  # plt.pie(x=syu_y,labels=syu_x)
  axes[0].pie(x=syu_y,labels=syu_x,autopct='%1.1f%%')
  axes[1].pie(x=si_y,labels=si_x,autopct='%1.1f%%')
  plt.tight_layout()
  plt.show()

def syusi_day(data):
  label = data.pop(0)
  syu = {}
  si = {}
  syu_index = label.index("収入")
  si_index = label.index("支出")
  day_index = label.index("日付")
  for elm in data:
    date = elm[day_index].split("-")
    y = date[0]
    m = date[1]
    d = date[2]
    if y not in syu:
      syu[y] = {}
    if y not in si:
      si[y] = {}
    if m not in syu[y]:
      syu[y][m] = {}
    if m not in si[y]:
      si[y][m] = {}
    if d not in syu[y][m]:
      syu[y][m][d] = 0
    if d not in si[y][m]:
      si[y][m][d] = 0
    syu[y][m][d] += int(elm[syu_index])
    si[y][m][d] += int(elm[si_index])

  syu_x = []
  syu_y = []
  si_x = []
  si_y = []

  for year in syu.values():
    for k,month in year.items():
      for d,v in month.items():
        syu_x.append(k+d)
        syu_y.append(v)

  for year in si.values():
    for k,month in year.items():
      for d,v in month.items():
        si_x.append(k+d)
        si_y.append(v)

  fig = plt.figure()
  plt.xticks(rotation=90)
  fig.set_figwidth(15)
  plt.plot(syu_x,syu_y)
  plt.plot(si_x,si_y)
  # plt.bar(syu_x,syu_y,align="center")
  # plt.bar(si_x,si_y,bottom=syu_y,align="center")
  plt.show()

  return {"syu":syu,"si":si}

def syusi_month(data):
  label = data.pop(0)
  syu = {}
  si = {}
  syu_index = label.index("収入")
  si_index = label.index("支出")
  day_index = label.index("日付")
  for elm in data:
    date = elm[day_index].split("-")
    y = date[0]
    m = date[1]
    if y not in syu:
      syu[y] = {}
    if y not in si:
      si[y] = {}
    if m not in syu[y]:
      syu[y][m] = 0
    if m not in si[y]:
      si[y][m] = 0
    syu[y][m] += int(elm[syu_index])
    si[y][m] += int(elm[si_index])

  syu_x = []
  syu_y = []
  si_x = []
  si_y = []

  for year in syu.values():
    for m,v in year.items():
      syu_x.append(m)
      syu_y.append(v)

  for year in si.values():
    for m,v in year.items():
      si_x.append(m)
      si_y.append(v)

  plt.plot(syu_x,syu_y)
  plt.plot(si_x,si_y)
  # plt.bar(syu_x,syu_y,align="center")
  # plt.bar(si_x,si_y,bottom=syu_y,align="center")
  plt.show()

  return {"syu":syu,"si":si}

def main():
  name = glob.glob("./*.csv")
  file = open(name[0],mode="r",encoding="shift_jis")
  data = list(csv.reader(file))
  print(syusi_category_all(data))

if __name__ == '__main__':
  main()


# ['日付', '方法', 'カテゴリ', 'カテゴリの内訳', '支払元', '入金先', '品目', 'メモ', 'お店', '通貨', '収入', '支出', '振替', '残高調整', '通貨変換前の金額', '集計の設定']