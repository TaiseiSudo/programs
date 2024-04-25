# ���ʂقǑ厖
# PyBluez��raspipico��

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

# ���x���T�[�r�X��UUID�̒�`�ł�
_ENV_SENSE_UUID = bluetooth.UUID(0x181A)

#
# ����(Characteristic)��ݒ肷��^�v���ł��B
#�@Type��UUID�ƁAPermission�̃t���O��ݒ肵�Ă��܂�
#
_TEMP_CHAR = (
	bluetooth.UUID(0x2A6E),
	_FLAG_READ | _FLAG_NOTIFY | _FLAG_INDICATE,
)

#
# �T�[�r�X��ݒ肷��^�v���ł�
# �T�[�r�X�̒�`(Declaration)��Type�ɐݒ肷��UUID��
# ��L�ō쐬��������(Characteristic)���Z�b�g���Ă��܂��B
#
_ENV_SENSE_SERVICE = (
	_ENV_SENSE_UUID,
	(_TEMP_CHAR,),
)

#
# �y���t�F�����̕��ނ������萔�ł��A���x�Z���T�̒l�ł���768���g�p���܂��B
#
_ADV_APPEARANCE_GENERIC_THERMOMETER = const(768)

#
# Pico�̉��x����z�M����y���t�F�����̃N���X�ł�
#
class BLETemperature:
	def __init__(self, ble, name=""):
		# ���x�Z���T�Ɏg���s����ݒ肵�܂��B
		self._sensor_temp = machine.ADC(4)

		# �Ăяo��������n���ꂽ�ABLE�p�̃I�u�W�F�N�g���N���X�����ɃZ�b�g���A
		# BLE��L�������܂��B
		self._ble = ble
		self._ble.active(True)

		# ���C�u��������Ăяo���Ă��炤�֐����Z�b�g���܂��B
		self._ble.irq(self._irq)

		# ���C�u�����ɃT�[�r�X���Z�b�g���܂��B
		# �߂�l�̂����A_TEMP_CHAR�ւ̃n���h���݂̂������o�ϐ��Ɏ擾���Ă��܂��B
		((self._handle,),) = self._ble.gatts_register_services((_ENV_SENSE_SERVICE,))

		# �z���set�֐��ŏ��������܂�
		self._connections = set()

		# �T�[�r�X�̖��O���w�肳��Ă��Ȃ��ꍇ�́AMAC�A�h���X�̖��O���g�p���܂��B
		if len(name) == 0:
				name = 'Pico %s' % ubinascii.hexlify( self._ble.config('mac')[1],':').decode().upper()

		print('Sensor name %s' % name)

		# �T�[�r�X�̖��O�ƃI�u�W�F�N�g���w�肵�āA
		# �A�h�o�^�C�Y����f�[�^(�y�C���[�h)���쐬���܂�
		self._payload = advertising_payload(
				name=name, services=[_ENV_SENSE_UUID]
		)

		# �A�h�o�^�C�Y���s���܂�
		self._advertise()

	#
	# ���C�u��������Ăяo���Ă��炤�֐��̒�`�ł�
	#
	def _irq(self, event, data):
		# �Z���g��������̐ڑ����́A���̐ڑ��n���h�������g�̃��X�g�ɒǉ����܂�
		if event == _IRQ_CENTRAL_CONNECT:
			conn_handle, _, _ = data
			self._connections.add(conn_handle)

		# �Z���g��������̐ؒf���́A���g�̃��X�g����ڑ��n���h�����폜���A
		# ��~���Ă����A�h�o�^�C�Y���ĊJ���܂��B
		elif event == _IRQ_CENTRAL_DISCONNECT:
			conn_handle, _, _ = data
			self._connections.remove(conn_handle)
			self._advertise()

		# Indicate�̊������󂯎�������́A�ڑ���ԁA�l�̃n���h���A�X�e�[�^�X�̃n���h�����擾���܂��B
		elif event == _IRQ_GATTS_INDICATE_DONE:
			conn_handle, value_handle, status = data


	#
	# ���x�Z���T�̒l���X�V���āAnotify/indicate���s���֐��ł�
	#
	def update_temperature(self, notify=False, indicate=False):
		# ���x�Z���T���牷�x���擾�E�\�����܂�
		temp_deg_c = self._get_temp()
		print("write temp %.2f degc" % temp_deg_c)

		# �L�����N�^���X�e�B�b�N���̉��x�����X�V���܂��B
		self._ble.gatts_write(self._handle, struct.pack("<h", int(temp_deg_c * 100)))
		print("temp "+ str(int(temp_deg_c * 100)))

		# ���g�ŕێ����Ă���S�Ă̐ڑ��n���h��(�Z���g����)�ɑ΂��āAnotify/indicate���s���܂�
		if notify or indicate:
			for conn_handle in self._connections:
				if notify:
					self._ble.gatts_notify(conn_handle, self._handle)

				if indicate:
					self._ble.gatts_indicate(conn_handle, self._handle)


	# ���g�ŕێ����Ă���y�C���[�h���Z�b�g���ăA�h�o�^�C�Y����֐��ł�
	def _advertise(self, interval_us=500000):
		self._ble.gap_advertise(interval_us, adv_data=self._payload)

	# pico W�{�̂̉��x�Z���T�̒l���擾���āA�d��->���x�ɕϊ�����֐��ł�
	def _get_temp(self):
		conversion_factor = 3.3 / (65535)
		reading = self._sensor_temp.read_u16() * conversion_factor
		return 27 - (reading - 0.706) / 0.001721

# ���C���̏����ł�
def demo():
	# ble���C�u�����̃I�u�W�F�N�g(�ϐ�)���쐬���܂�
	ble = bluetooth.BLE()

	# �y���t�F�����̃I�u�W�F�N�g(�ϐ�)���쐬���܂�
	temp = BLETemperature(ble,name="PicoBoard")

	# Pico�{�̂�LED�̃s�����擾���܂�
	counter = 0
	led = Pin('LED', Pin.OUT)

	# 10�b��1��A���x�Z���T�̒l���擾���āAnotify���܂�
	# LED��1�b���Ƃ�ON/OFF���J��Ԃ��܂�.
	while True:
		if counter % 10 == 0:
			temp.update_temperature(notify=True, indicate=False)
		led.toggle()
		time.sleep_ms(1000)
		counter += 1

if __name__ == "__main__":
	demo()