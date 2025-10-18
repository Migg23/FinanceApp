import os
import sys
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))  # Adds FinanceApp/ to path
from server.config import Config

# Absolute path to the public folder where index.html lives
template_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..', 'financeapp', 'public'))

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

@userdata.route('/', methods=['GET', 'POST']) #/is just index
def index():
    if request.method == 'POST':
        name = request.form['name']
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']

        if name != '' and username != '' and password != '' and email != '':
            new_user = User(name=name, username=username, password=password, email=email)
            db.session.add(new_user)
            db.session.commit()
            return redirect(url_for('index'))
    users = User.query.all() #as of now allows all info to be pulled to index
    return render_template('index.html', profiles=users)

if __name__ == '__main__':
    userdata.run(debug=True)