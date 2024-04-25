from machine import Pin
import bluetooth
from ble_simple_peripheral import BLESimplePeripheral

# Bluetooth Low Energy (BLE) オブジェクトを作成する。
ble = bluetooth.BLE()

# BLE オブジェクトを使用して BLESimplePeripheral クラスのインスタンスを作成。
sp = BLESimplePeripheral(ble)

# オンボード LED の Pin オブジェクトを作成し、出力として設定。
led = Pin("LED", Pin.OUT)

# LED の状態を 0 (オフ) に初期化します。
led_state = 0

# 受信したデータを処理するコールバック関数
def on_rx(data):
    # Bluetoothで受信したデータをコンソールに表示。
    print("Data received: ", data)
    # 受信したデータが「toggle」かどうかを確認。
    if data == b'toggle\r\n':
        # LED の状態を切り替える。( 0 or 1 )
        global led_state
        led.value(not led_state)
        # LED の状態を更新する。
        led_state = 1 - led_state
        # 更新した結果をBluetoothで送信。
        if led_state == 1:
            sp.send("ON\n")
        else:
            sp.send("OFF\n")

# メインループ
while True:
    # BLE 接続が確立されているかどうかを確認。
    if sp.is_connected():
        # データ受信用のコールバック関数を設定。
        sp.on_write(on_rx)