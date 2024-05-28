from flask import Flask, request, jsonify
import os
import json

app = Flask(__name__)

@app.route('/members')
def members():
    return {"members": ["member 1", "member 2"]}

@app.route('/get_schools')
def get_schools():

    with open('data/schools.json', 'r') as fp:
        schools = json.load(fp)
    
    year = request.args.get('year')
    
    return schools[year]
    



if __name__ == '__main__':
    app.run(debug=True, port=8001)