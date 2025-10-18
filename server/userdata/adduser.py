from flask import request, redirect, url_for
from server import db 
from server.models import User
from flask import Blueprint

userdata_bp = Blueprint('userdata', __name__)

@userdata_bp.route('/add', methods=['GET','POST'])
def add_user():
    if name != '' and username != '' and password != '' and email != '':
        name = request.form['name']
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']

        new_user = User(name=name, username=username, password=password, email=email)

        db.session.add(new_user)
        db.session.commit()

    return redirect(url_for('index'))