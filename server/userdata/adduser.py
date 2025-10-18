# from flask import request, jsonify
# from server import db 
# from server.models import User
# from flask import Blueprint

# userdata_bp = Blueprint('userdata', __name__)

# @userdata_bp.route('/users', methods=['GET'])
# def get_user():
#     users = User.query.all()
#     return jsonify([{'id': user.id, 'username': user.username, 'email': user.email} for user in users])

# @userdata_bp.route('/register', methods=['POST'])
# def add_user():
#     data = request.get_json()
#     new_user = User(username=data['username'], password=data['password'])
#     db.session.add(new_user)
#     db.session.commit()
#     return jsonify({'message': 'User added successfully'}), 201

# @userdata_bp.route('/login', methods=['POST'])
# def login_user():
#     data = request.get_json()
#     username = data.get('username')
#     password = data.get('password')

#     user = User.query.filter_by(username=username, password=password).first()
    
#     if user:
#         return jsonify({'message': 'Login successful', 'username': user.username}), 200
#     else:
#         return jsonify({'message': 'Invalid credentials'}), 401