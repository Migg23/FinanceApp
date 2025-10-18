import os
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from config import Config

# Absolute path to the public folder where index.html lives
template_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'financeapp', 'public'))

userdata = Flask(__name__, template_folder=template_path)
userdata.config.from_object(Config)

db = SQLAlchemy(userdata)

# Define a model for the 'users' table
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100))
    email = db.Column(db.String(100))

@userdata.route('/') #/is just index
def index():
    users = User.query.all() #as of now allows all info to be pulled to index
    return render_template('index.html', data=users)

if __name__ == '__main__':
    userdata.run(debug=True)