# check if M value from accel matches sqrt(x*x, y*y, z*z)

import csv
import math

file = open('./data/HughB-check-m-0.csv')
csv_reader = csv.reader(file)
next(csv_reader)

raw_list = []

for row in csv_reader:
    #print(row)
    m = float(row[1]) / 8192
    x = float(row[2]) / 8192
    y = float(row[3]) / 8192
    z = float(row[4]) / 8192
    #print m,x,y,z
    m2 = math.sqrt(x*x + y*y + z*z)
    print m,m2, (100*m2)/m
