from flask import Flask, request, jsonify
import json
import matplotlib.pyplot as plt
import pandas as pd
import pickle

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

@app.route('/get_win_prediction')
def get_win_prediction():
    with open('data/team_stats.json', 'r') as f:
        team_stats = json.load(f)
    
    with open('models/win-predictor.pkl', 'rb') as f:
        win_predictor = pickle.load(f)

    year_a = request.args.get('year_a')
    team_a = request.args.get('team_a')
    year_b = request.args.get('year_b')
    team_b = request.args.get('team_b')

    keys = list(team_stats[year_a][team_a].keys())

    model_input = []

    for key in keys:
        model_input.append(team_stats[year_a][team_a][key])
        model_input.append(team_stats[year_b][team_b][key])
    
    pred = str(win_predictor.predict([model_input])[0])

    score = 0

    if pred == '1':
        for key in keys:
            score += abs((float(team_stats[year_a][team_a][key]) - float(team_stats[year_b][team_b][key])))

            if float(team_stats[year_a][team_a][key]) != 0:
                score /= float(team_stats[year_a][team_a][key])
            else:
                score /= 10
    
    score /= len(keys)

    
    return jsonify({'win-prediction': pred, 'score': str(round(100*score, 1))})

@app.route('/get_discrete_var_prediction')
def get_discrete_var_prediction():
    with open('data/team_stats.json', 'r') as f:
        team_stats = json.load(f)
    
    with open('models/discrete-var-model.pkl', 'rb') as f:
        model = pickle.load(f)

    year_a = request.args.get('year_a')
    team_a = request.args.get('team_a')
    year_b = request.args.get('year_b')
    team_b = request.args.get('team_b')
    
    keys = list(team_stats[year_a][team_a].keys())

    model_input = []

    for key in keys:
        model_input.append(team_stats[year_a][team_a][key])
        model_input.append(team_stats[year_b][team_b][key])
    
    pred = model.predict([model_input])[0]
    params = ['Sets', 'Kills','Assists', 'Digs', 'Block Solos']
    output = {}

    for i in range(len(pred)):
        output[params[i]] = pred[i]

    
    return jsonify({'prediction': output})

@app.route('/get_error_prediction')
def get_error_prediction():
    with open('data/team_stats.json', 'r') as f:
        team_stats = json.load(f)
    
    with open('models/error-model.pkl', 'rb') as f:
        model = pickle.load(f)

    year_a = request.args.get('year_a')
    team_a = request.args.get('team_a')
    year_b = request.args.get('year_b')
    team_b = request.args.get('team_b')

    keys = list(team_stats[year_a][team_a].keys())

    model_input = []

    for key in keys:
        model_input.append(team_stats[year_a][team_a][key])
        model_input.append(team_stats[year_b][team_b][key])
    
    return jsonify({'win-prediction': str(model.predict([model_input])[0])})

if __name__ == '__main__':
    app.run(debug=True, port=8001)