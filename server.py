import json
from fastapi import FastAPI
import random

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    legislators = []
    with open('popular_bills.json') as f:
        j = json.load(f)
        for x in j[0]["votes"]:
            if x["state"] == state:
                toadd = {}
                toadd["id"] = x["id"]
                toadd["name"] = x["display_name"]
                toadd["party"] = x["party"]
                legislators.append(toadd)
    return legislators

@app.get("/legislator")
async def get_legislators(lid: str):
    with open('popular_bills.json') as f:
        j = json.load(f)
        for x in j[0]["votes"]:
            if x["id"] == lid:
                return x["display_name"]

@app.get("/get-bill")
async def get_bill_by_id(lid):
    bills = []
    with open('popular_bills.json') as f:
        j = json.load(f)
        for b in j:
            for x in b["votes"]:
                if x["id"] == lid:
                    bills.append(b["bill"])
                    bills[-1]["title"] = b["subject"]
                    bills[-1]["summary"] = b["bill_summary"]
                    c = True
                    break
    toreturn = random.sample(bills, 10)
    return toreturn

@app.get("/get-answer")
async def get_answer_by_id(lid, congress: int, number: int, type):
    with open('popular_bills.json') as f:
        j = json.load(f)
        for b in j:
            if b["bill"]["number"] == number and b["bill"]["congress"] == congress and b["bill"]["type"] == type:
                for x in b["votes"]:
                    if x["id"] == lid and x["vote"] == "Yea":
                        return "Yea"
                    else:
                        return "Nay"
    return "error"
