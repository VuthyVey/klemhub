import time
from flask import Flask, render_template,send_from_directory,request, jsonify, make_response
# from flask_cors import CORS, cross_origin
# import boto3
# import os

app = Flask(__name__, static_folder='../build', static_url_path='/')    

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/api')
# @cross_origin()
def Welcome():
    return "Welcome to the API!!!"

# @app.route('/api/justpie/')
# @cross_origin()
# def GeneratePie():
#     ....
@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0')   