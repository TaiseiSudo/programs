# 死ぬほど大事
# PyBluezのraspipico側

import bluetooth
import random
import struct
import time
import machine
import ubinascii
from ble_advertising import advertising_payload
from micropython import const
from machine import Pin

_IRQ_CENTRAL_CONNECT = const(1)
_IRQ_CENTRAL_DISCONNECT = const(2)
_IRQ_GATTS_INDICATE_DONE = const(20)

_FLAG_READ = const(0x0002)
_FLAG_NOTIFY = const(0x0010)
_FLAG_INDICATE = const(0x0020)

# 温度情報サービスのUUIDの定義です
_ENV_SENSE_UUID = bluetooth.UUID(0x181A)

#
# 特徴(Characteristic)を設定するタプルです。
#　TypeのUUIDと、Permissionのフラグを設定しています
#
_TEMP_CHAR = (
	bluetooth.UUID(0x2A6E),
	_FLAG_READ | _FLAG_NOTIFY | _FLAG_INDICATE,
)

#
# サービスを設定するタプルです
# サービスの定義(Declaration)のTypeに設定するUUIDと
# 上記で作成した特徴(Characteristic)をセットしています。
#
_ENV_SENSE_SERVICE = (
	_ENV_SENSE_UUID,
	(_TEMP_CHAR,),
)

#
# ペリフェラルの分類を示す定数です、温度センサの値である768を使用します。
#
_ADV_APPEARANCE_GENERIC_THERMOMETER = const(768)

#
# Picoの温度情報を配信するペリフェラルのクラスです
#
class BLETemperature:
	def __init__(self, ble, name=""):
		# 温度センサに使うピンを設定します。
		self._sensor_temp = machine.ADC(4)

		# 呼び出し元から渡された、BLE用のオブジェクトをクラス内部にセットし、
		# BLEを有効化します。
		self._ble = ble
		self._ble.active(True)

		# ライブラリから呼び出してもらう関数をセットします。
		self._ble.irq(self._irq)

		# ライブラリにサービスをセットします。
		# 戻り値のうち、_TEMP_CHARへのハンドルのみをメンバ変数に取得しています。
		((self._handle,),) = self._ble.gatts_register_services((_ENV_SENSE_SERVICE,))

		# 配列をset関数で初期化します
		self._connections = set()

		# サービスの名前が指定されていない場合は、MACアドレスの名前を使用します。
		if len(name) == 0:
				name = 'Pico %s' % ubinascii.hexlify( self._ble.config('mac')[1],':').decode().upper()

		print('Sensor name %s' % name)

		# サービスの名前とオブジェクトを指定して、
		# アドバタイズするデータ(ペイロード)を作成します
		self._payload = advertising_payload(
				name=name, services=[_ENV_SENSE_UUID]
		)

		# アドバタイズを行います
		self._advertise()

	#
	# ライブラリから呼び出してもらう関数の定義です
	#
	def _irq(self, event, data):
		# セントラルからの接続時は、その接続ハンドルを自身のリストに追加します
		if event == _IRQ_CENTRAL_CONNECT:
			conn_handle, _, _ = data
			self._connections.add(conn_handle)

		# セントラルからの切断時は、自身のリストから接続ハンドルを削除し、
		# 停止していたアドバタイズを再開します。
		elif event == _IRQ_CENTRAL_DISCONNECT:
			conn_handle, _, _ = data
			self._connections.remove(conn_handle)
			self._advertise()

		# Indicateの完了を受け取った時は、接続状態、値のハンドル、ステータスのハンドルを取得します。
		elif event == _IRQ_GATTS_INDICATE_DONE:
			conn_handle, value_handle, status = data


	#
	# 温度センサの値を更新して、notify/indicateを行う関数です
	#
	def update_temperature(self, notify=False, indicate=False):
		# 温度センサから温度を取得・表示します
		temp_deg_c = self._get_temp()
		print("write temp %.2f degc" % temp_deg_c)

		# キャラクタリスティック内の温度情報を更新します。
		self._ble.gatts_write(self._handle, struct.pack("<h", int(temp_deg_c * 100)))
		print("temp "+ str(int(temp_deg_c * 100)))

		# 自身で保持している全ての接続ハンドル(セントラル)に対して、notify/indicateを行います
		if notify or indicate:
			for conn_handle in self._connections:
				if notify:
					self._ble.gatts_notify(conn_handle, self._handle)

				if indicate:
					self._ble.gatts_indicate(conn_handle, self._handle)


	# 自身で保持しているペイロードをセットしてアドバタイズする関数です
	def _advertise(self, interval_us=500000):
		self._ble.gap_advertise(interval_us, adv_data=self._payload)

	# pico W本体の温度センサの値を取得して、電圧->温度に変換する関数です
	def _get_temp(self):
		conversion_factor = 3.3 / (65535)
		reading = self._sensor_temp.read_u16() * conversion_factor
		return 27 - (reading - 0.706) / 0.001721

# メインの処理です
def demo():
	# bleライブラリのオブジェクト(変数)を作成します
	ble = bluetooth.BLE()

	# ペリフェラルのオブジェクト(変数)を作成します
	temp = BLETemperature(ble,name="PicoBoard")

	# Pico本体のLEDのピンを取得します
	counter = 0
	led = Pin('LED', Pin.OUT)

	# 10秒に1回、温度センサの値を取得して、notifyします
	# LEDは1秒ごとにON/OFFを繰り返します.
	while True:
		if counter % 10 == 0:
			temp.update_temperature(notify=True, indicate=False)
		led.toggle()
		time.sleep_ms(1000)
		counter += 1

if __name__ == "__main__":
	demo()