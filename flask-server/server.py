from flask import Flask, request, jsonify
import os
import json
import matplotlib.pyplot as plt
import pandas as pd

app = Flask(__name__)

@app.route('/members')
def members():
    return {"members": ["member 1", "member 2"]}

@app.route('/get_schools')
def get_schools():
    with open('data/schools.json', 'r') as f:
        schools = json.load(f)
    
    year = request.args.get('year')
    
    return schools[year]

@app.route('/get_rosters')
def get_rosters():
    year_a = request.args.get('year_a')
    team_a = request.args.get('team_a')
    year_b = request.args.get('year_b')
    team_b = request.args.get('team_b')

    with open('data/rosters.json', 'r') as f:
        rosters = json.load(f)
    
    return {'rosters': [rosters[year_a][team_a], rosters[year_b][team_b]]}

@app.route('/get_rankings')
def get_rankings():
    year = request.args.get('year')
    param = request.args.get('param')

    with open('data/rankings.json', 'r') as f:
        rankings = json.load(f)
    
    

    return {'rankings': rankings[year][param][0:10]}

        

if __name__ == '__main__':
    app.run(debug=True, port=8001)