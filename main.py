import json
import random
import flask
from flask import jsonify

# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = flask.Flask(__name__)

@app.get("/bills")
def bills(legislator_id=None):
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
        return jsonify({"bills": results})

@app.get("/legislators")
def get_legislators(state: str):
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
    return jsonify(legislators)

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
    return jsonify(toreturn)

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
    return jsonify("error")

@app.after_request
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    return response

if __name__ == "__main__":
    # Used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    app.run(host="localhost", port=8080, debug=True)
