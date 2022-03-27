import os
import json
import sys
import requests
from bs4 import BeautifulSoup

# congress number, senate/house, bill number
def get_summary(congress, sorhstring, number):
    url = "https://www.congress.gov/bill/"+str(congress)+"th-congress/"+sorhstring+"-bill/"+str(number)
    req = requests.get(url)
    sums = BeautifulSoup(req.text, 'lxml')
    summ = sums.find("div", {"id": "bill-summary"})
    text = sums.select("div#bill-summary")
    result = ""
    for i, x in enumerate(text):
        result += str(x.get_text())
        if i != len(text)-1:
            result += '\n'
    return result[result.find("This bill"):-1]
