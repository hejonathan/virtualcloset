from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins='*')

@app.route('api/hello', methods=['GET'])
def hello():
    return jsonify({'message':"hello world"})


if __name__ == '__main__':
    app.run(debug=True, port=8081)