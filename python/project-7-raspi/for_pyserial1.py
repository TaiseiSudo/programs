# import bluetooth

# Bluetoothポート番号
# port = 1

# # Bluetoothソケットを作成して接続を待機
# sock = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
# sock.bind(("", port))
# sock.listen(1)
# client_sock, client_info = sock.accept()
# print("Accepted connection from", client_info)

# # データを受信
# data = client_sock.recv(1024)
# print("Received:", data)

# # ソケットをクローズ
# client_sock.close()
# sock.close()

import asyncio

from bleak import discover

async def run():
  devices = await discover()
  for d in devices:
    print(d.address,d.name)
#     print("""
# data:{}
# name:{}
# addr:{}
# dtls:{}
# rssi:{}
# meta:{}
# """.format(d,d.name,d.address,d.details,d.rssi,d.metadata))

loop = asyncio.get_event_loop()
loop.run_until_complete(run())