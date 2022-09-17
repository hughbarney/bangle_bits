import csv
import math

# Python program to get average of a list
def Average(lst):
    return sum(lst) / len(lst)
    
file = open('./data/HughB-static-0.csv')
csv_reader = csv.reader(file)
next(csv_reader)

raw_list = []

for row in csv_reader:
    #print(row)
    x = float(row[1]) / 8192
    y = float(row[2]) / 8192
    z = float(row[3]) / 8192
    #print x,y,z
    m = math.sqrt(x*x + y*y + z*z)
    #print m
    v = int(math.floor(((m-1)*8192) / 32 ))
    #print v
    raw_list.append(v)

av = Average(raw_list)
print av
