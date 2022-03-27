import json
from fastapi import FastAPI

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
