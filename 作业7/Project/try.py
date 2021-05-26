from flask import Flask, current_app, redirect, url_for, request
import json

# 实例化app
app = Flask(import_name=__name__)

# 通过methods设置POST请求
@app.route('/json', methods=["POST"])
def json_request():

    # 接收处理json数据请求
    data = json.loads(request.data) # 将json字符串转为dict
    user_name = data['user_name']
    user_age = data['user_age']

    return "user_name = %s, user_age = %s" % (user_name,user_age)

if __name__ == '__main__':
    app.run(debug=True)