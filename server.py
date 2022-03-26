import json
from fastapi import FastAPI

app = FastAPI()

@app.get("/bills")
async def bills():
    with open('popular_bills.json') as f:
        results = json.load(f)
        return {"bills": results}
