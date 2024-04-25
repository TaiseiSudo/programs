from ble_advertising import advertising_payload
import  bluetooth
import ubinascii

uuid = bluetooth.UUID('b2566e14-63b4-4553-97de-2a2012803017')
ble = bluetooth.BLE()
name = 'Pico %s' % ubinascii.hexlify(ble.config('mac')[1],':').decode().upper()
payload = advertising_payload(name=name,services=[uuid])

ble.gap_advertise(300,adv_data=payload)