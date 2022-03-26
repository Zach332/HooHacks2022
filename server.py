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
