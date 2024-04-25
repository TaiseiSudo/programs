from machine import Pin
import bluetooth
from ble_simple_peripheral import BLESimplePeripheral

# Bluetooth Low Energy (BLE) �I�u�W�F�N�g���쐬����B
ble = bluetooth.BLE()

# BLE �I�u�W�F�N�g���g�p���� BLESimplePeripheral �N���X�̃C���X�^���X���쐬�B
sp = BLESimplePeripheral(ble)

# �I���{�[�h LED �� Pin �I�u�W�F�N�g���쐬���A�o�͂Ƃ��Đݒ�B
led = Pin("LED", Pin.OUT)

# LED �̏�Ԃ� 0 (�I�t) �ɏ��������܂��B
led_state = 0

# ��M�����f�[�^����������R�[���o�b�N�֐�
def on_rx(data):
    # Bluetooth�Ŏ�M�����f�[�^���R���\�[���ɕ\���B
    print("Data received: ", data)
    # ��M�����f�[�^���utoggle�v���ǂ������m�F�B
    if data == b'toggle\r\n':
        # LED �̏�Ԃ�؂�ւ���B( 0 or 1 )
        global led_state
        led.value(not led_state)
        # LED �̏�Ԃ��X�V����B
        led_state = 1 - led_state
        # �X�V�������ʂ�Bluetooth�ő��M�B
        if led_state == 1:
            sp.send("ON\n")
        else:
            sp.send("OFF\n")

# ���C�����[�v
while True:
    # BLE �ڑ����m������Ă��邩�ǂ������m�F�B
    if sp.is_connected():
        # �f�[�^��M�p�̃R�[���o�b�N�֐���ݒ�B
        sp.on_write(on_rx)