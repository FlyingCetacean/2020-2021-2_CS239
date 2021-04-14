from flask import Flask, render_template, request, redirect, url_for, jsonify
import settings
import json

app = Flask(__name__)
app.config.from_object(settings)


@app.route('/')
def index():
    return render_template("index.html")

@app.route('/postSort', methods=['POST'])
def postSort():
    # 获取 POST 请求参数
    array = request.get_json()["array"]
    array = sorted(list(map(int, array.split(","))))
    res = {"sorted_array": array}
    return jsonify(res)

@app.route('/getSort', methods = ["GET","POST"])
def getSort():
    # 获取 GET 请求参数
    array = request.args.get("array")
    array = sorted(list(map(int, array.split(","))), reverse=True)
    res = {"sorted_array": array}
    return jsonify(res)

if __name__ == '__main__':
    app.run()
