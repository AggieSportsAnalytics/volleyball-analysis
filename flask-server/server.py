from flask import Flask

app = Flask(__name__)

@app.route('/members')
def members():
    return {"members": ["member 1", "member 2"]}

if __name__ == '__main__':
    app.run(debug=True, port=8001)