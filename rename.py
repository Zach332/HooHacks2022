import os
import sys
import requests
import json

d = os.getenv('US_CONGRESS_DIR')

things = os.listdir(d)
for thing in things:
    if thing[0] == '.':
        continue
    p = d + '/' + thing + '/data.json'
    f = open(p)
    text = f.read()
    j = json.loads(text)
    if 'bill' in j and j['category'] == 'passage':
        t = j['bill']['type']
        n = j['bill']['number']
        print(t, n)
        tn = t + str(n)
        dest = open('data/' + tn + '.json', 'w+')
        dest.write(text)

