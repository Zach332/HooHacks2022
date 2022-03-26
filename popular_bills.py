import os
import json
import sys
import requests
from bs4 import BeautifulSoup

# req = requests.get("https://www.congress.gov/most-viewed-bills")

soup = BeautifulSoup(open('popular.html').read(), 'lxml')
rows = soup.find_all('tr')

links = []

# congress number, senate/house, bill number
def get_summary(congress, sorhstring, number):
    url = "https://www.congress.gov/bill/"+str(congress)+"th-congress/"+sorhstring+"-bill/"+str(number)
    req = requests.get(url)
    sums = BeautifulSoup(req.text, 'lxml')
    summ = sums.find("div", {"id": "bill-summary"})
    text = sums.select("div#bill-summary p")
    result = ""
    for i, x in enumerate(text):
        result += str(x.get_text())
        if i != len(text)-1:
            result += '\n'
    return result

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
        j['bill_summary'] = get_summary(117, sorh, number)
        # print(id, id_title_dict[id])
        if 'subject' in j:
            print(id, id_title_dict[id], '|', j['subject'])
            popular_bills.append(j)

f = open('popular_bills.json', 'w+')
json.dump(popular_bills, f)
