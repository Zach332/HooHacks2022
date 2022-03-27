import json
import random
import flask
from flask import request, jsonify

# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = flask.Flask(__name__)

@app.route("/bills")
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

@app.route("/legislators")
def get_legislators():
    legislators = []
    with open('popular_bills.json') as f:
        j = json.load(f)
        for x in j[0]["votes"]:
            if x["state"] == request.args["state"]:
                toadd = {}
                toadd["id"] = x["id"]
                toadd["name"] = x["display_name"]
                toadd["party"] = x["party"]
                legislators.append(toadd)
    return jsonify(legislators)

@app.route("/legislator")
def get_legislator():
    with open('popular_bills.json') as f:
        j = json.load(f)
        for x in j[0]["votes"]:
            if x["id"] == request.args["lid"]:
                return x["display_name"]

@app.route("/get-bill")
def get_bill_by_id():
    bills = []
    with open('popular_bills.json') as f:
        j = json.load(f)
        for b in j:
            for x in b["votes"]:
                if x["id"] == request.args["lid"]:
                    bills.append(b["bill"])
                    bills[-1]["title"] = b["subject"]
                    bills[-1]["summary"] = b["bill_summary"]
                    c = True
                    break
    toreturn = random.sample(bills, 10)
    return jsonify(toreturn)

@app.route("/get-answer")
def get_answer_by_id():
    lid = request.args["lid"]
    congress = int(request.args["congress"])
    number = int(request.args["number"])
    type = request.args["type"]
    with open('popular_bills.json') as f:
        j = json.load(f)
        for b in j:
            if b["bill"]["number"] == number and b["bill"]["congress"] == congress and b["bill"]["type"] == type:
                for x in b["votes"]:
                    if x["id"] == lid and x["vote"] == "Yea":
                        return jsonify("Yea")
                    else:
                        return jsonify("Nay")
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
