import serial

ser = serial.Serial('/dev/tty.',9600,timeout=None)
line = ser.readline()
print(line)
ser.close()