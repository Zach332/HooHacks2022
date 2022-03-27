import os
import json
import sys
import requests
from bs4 import BeautifulSoup

# req = requests.get("https://www.congress.gov/most-viewed-bills")

soup = BeautifulSoup(open('popular.html').read(), 'lxml')
rows = soup.find_all('tr')

links = []

def url_to_bill_directory(url):
    number = url.split('/')[-1]
    try:
        num = int(number)
    except ValueError:
        return None
    # print(url)
    if 'house-bill' in url:
        return 'hr' + number
    if 'senate-bill' in url:
        return 's' + number

id_title_dict = {}
popular_ids = []

for row in rows:
    d = row.find_all('td')
    title = None
    id = None
    for index, data in enumerate(d):
        if index == 1:
            link = data.find('a')
            if link is not None:
                url = url_to_bill_directory(link['href'])
                if url is not None:
                    id = url
                    popular_ids.append(id)
        if index == 2:
            id_title_dict[id] = data.get_text()

available_ids = os.listdir('data')

popular_bills = []

for id in popular_ids:
    if id + '.json' in available_ids:
        f = open('data/' + id + '.json')
        j = json.load(f)
        sorh = None
        if id[0] == 's':
            sorh = 'senate'
        if id[0] == 'h':
            sorh = 'house'
        i = 0
        while id[i] not in '0123456789':
            i += 1
        number = int(id[i:])
        j['bill_summary'] = get_summary(j['bill']['congress'], sorh, number)
        all_votes = []
        for nay in j['votes']['Nay']:
            nay['vote'] = 'nay'
            all_votes.append(nay)
        for yea in j['votes']['Yea']:
            yea['vote'] = 'yea'
            all_votes.append(yea)
        j['votes'] = all_votes
        # print(id, id_title_dict[id])
        if 'subject' in j:
            print(id, id_title_dict[id], '|', j['subject'])
            popular_bills.append(j)

f = open('popular_bills.json', 'w+')
json.dump(popular_bills, f)
