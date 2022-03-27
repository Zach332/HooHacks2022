import json
from fastapi import FastAPI
import random
from summary import get_summary

app = FastAPI()

@app.get("/bills")
async def bills(legislator_id=None):
    with open('popular_bills.json') as f:
        results = json.load(f)
        if legislator_id is not None:
            for b in results:
                votes = b["votes"]
                for v in votes:
                    if v['id'] == legislator_id:
                        b['vote'] = v
                        break
                del b['votes']
        return {"bills": results}

@app.get("/legislators")
async def get_legislators(state: str):
    legislators = {}
    with open('popular_bills.json') as f:
        j = json.load(f)
        for x in j[0]["votes"]["Yea"]:
            if x["state"] == state:
                legislators[x["id"]] = x["display_name"]
        for x in j[0]["votes"]["Nay"]:
            if x["state"] == state:
                legislators[x["id"]] = x["display_name"]
        for x in j[0]["votes"]["Not Voting"]:
            if x["state"] == state:
                legislators[x["id"]] = x["display_name"]
    return str(legislators)

@app.get("/get-bill")
async def get_bill_by_id(lid):
    bills = []
    with open('popular_bills.json') as f:
        j = json.load(f)
        for b in j:
            c = False
            for x in b["votes"]["Yea"]:
                if x["id"] == lid:
                    bills.append(b["bill"])
                    bills[-1]["title"] = b["subject"]
                    c = True
                    break
            if c: continue
            for x in b["votes"]["Nay"]:
                if x["id"] == lid:
                    bills.append(b["bill"])
                    break
    for b in bills:
        b["summary"] = get_summary(b["congress"], "house" if b["type"] == "hr" else "senate", b["number"])
    toreturn = random.sample(bills, 10)
    return str(toreturn)

@app.get("/get-answer")
async def get_answer_by_id(lid, congress: int, number: int, type):
    with open('popular_bills.json') as f:
        j = json.load(f)
        for b in j:
            if b["bill"]["number"] == number and b["bill"]["congress"] == congress and b["bill"]["type"] == type:
                for x in b["votes"]["Yea"]:
                    if x["id"] == lid:
                        return "Yea"
                for x in b["votes"]["Nay"]:
                    if x["id"] == lid:
                        return "Nay"
    return "error"