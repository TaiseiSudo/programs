with open("log.txt",mode="a",encoding="utf_8") as file:
  file.write("AAA")

with open("log.txt",mode="r",encoding="utf_8") as file:
  data = file.read()
  print(data)
