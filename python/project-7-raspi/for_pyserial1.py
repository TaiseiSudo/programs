# import bluetooth

# Bluetooth�|�[�g�ԍ�
# port = 1

# # Bluetooth�\�P�b�g���쐬���Đڑ���ҋ@
# sock = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
# sock.bind(("", port))
# sock.listen(1)
# client_sock, client_info = sock.accept()
# print("Accepted connection from", client_info)

# # �f�[�^����M
# data = client_sock.recv(1024)
# print("Received:", data)

# # �\�P�b�g���N���[�Y
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