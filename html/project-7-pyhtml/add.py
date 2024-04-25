text_list = []

with open(file="index.html",mode="r",encoding="utf_8") as file:
  #global text_list
  text_list = file.readlines()

marker_index = [i for i, x in enumerate(text_list) if x.strip() == "<!--marker-->"]
flat_list = text_list[0:marker_index[0]+1] + text_list[marker_index[1]:]

add_text = input()

marker_index = [i for i, x in enumerate(flat_list) if x.strip() == "<!--marker-->"]

new_list = flat_list[0:marker_index[0]] + [add_text] + flat_list[marker_index[1]:]

with open(file="index.html",mode="w",encoding="utf_8") as file:
  file.writelines(new_list)