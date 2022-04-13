import os
from flask import Flask, request
app = Flask(__name__)
import time
import random

@app.route("/v1/broadcast",methods=["GET"])
def broadcast():
    args = request.args
    current_channel = args.get("current")
    n = random.randint(0,99)
    print("x: "+ str(n/100))
    y = random.randint(0,3)
    print("Y: "+ str(y/3))
    time.sleep((n/100)+(y/3))
    if (current_channel == "dogs"):
        return {"broadcast": "cats"}
    return {"broadcast": "dogs"}


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))