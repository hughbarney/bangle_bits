from ctypes import c_uint, c_ushort

def int_sqrt(number):
  res = c_ushort(0)
  add = c_ushort(0x8000)

  for i in range(0,15):
    temp = (c_ushort)(res | add)
    g2 = (c_unit)(temp * temp)
    if x >= g2:
      res = temp
    add = add >> 1
  return res;

print int_sqrt(64)

