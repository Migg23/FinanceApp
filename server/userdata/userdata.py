import os
import sys
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))  # Adds FinanceApp/ to path
from server.config import Config

# Absolute path to the public folder where index.html lives
template_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..', 'financeapp', 'src'))

userdata = Flask(__name__, template_folder=template_path)
userdata.config.from_object(Config)
db = SQLAlchemy(userdata)

# Define a model for the 'users' table
class User(db.Model):
    __tablename__ = 'user_information'#table name that holds name/username/password/email
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50))
    username = db.Column(db.String(20))
    password = db.Column(db.String(50))
    email = db.Column(db.String(25))

# @userdata.route('/', methods=['GET', 'POST']) #/is just index
# def index():
#     if request.method == 'POST':
#         name = request.form['name']
#         username = request.form['username']
#         password = request.form['password']
#         email = request.form['email']

#         if name != '' and username != '' and password != '' and email != '':
#             new_user = User(name=name, username=username, password=password, email=email)
#             db.session.add(new_user)
#             db.session.commit()
#             return redirect(url_for('index'))
#     users = User.query.all() #as of now allows all info to be pulled to index
#     return render_template('index.html', profiles=users)

@userdata.route('/users', methods=['GET'])
def get_user():
    users = User.query.all()
    return jsonify([{'id': user.id, 'username': user.username, 'email': user.email} for user in users])

@userdata.route('/register', methods=['POST'])
def add_user():
    data = request.get_json()
    new_user = User(username=data['username'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User added successfully'}), 201

@userdata.route('/index', methods=['POST'])
def login_user():
    data = request.get_json()
    us = data.get('Username')
    pw = data.get('Password')

    user = User.query.filter_by(username=us, password=pw).first()
    return jsonify({'message' : 'User did something'})

if __name__ == '__main__':
    userdata.run(debug=True)