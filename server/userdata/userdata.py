import os
import sys
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))  # Adds FinanceApp/ to path
from server.config import Config
from ..database import User

userdata = Flask(__name__)
userdata.config.from_object(Config)
db = SQLAlchemy(userdata)
CORS(userdata)

@userdata.route('/users', methods=['GET'])
def get_user():
    users = User.query.all()
    return jsonify([{'id': user.id, 'username': user.username} for user in users])

@userdata.route('/register', methods=['POST'])
def add_user():
    data = request.get_json()
    new_user = User(username=data['username'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User added successfully'}), 201

# @userdata.route('/login', methods=['GET'])
# def login_page():
#     return jsonify({"message": "Login page (GET) is working"})

@userdata.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username, password=password).first()
    return jsonify({'message': f'Logged in as {username}'})

if __name__ == '__main__':
    userdata.run(debug=True)