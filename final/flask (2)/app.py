from flask import Flask, render_template, request, redirect, url_for, jsonify, make_response, send_from_directory
import settings
import json
import os, sys

app = Flask(__name__)
app.config.from_object(settings)


@app.route('/')
def index():
    return render_template("index.html")

@app.route('/loadFile', methods = ["GET","POST"])
def loadFile():
    # 获取 GET 请求参数
    directory = os.getcwd()
    fileName = request.args.get("fileName")
    response = make_response(send_from_directory(directory, fileName, as_attachment=True))
    
    return response

if __name__ == '__main__':
    app.run()
