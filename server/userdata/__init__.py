from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from server.config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, resource={r"/*": {"origins": {"http:localhost:5000", "http://localhost:3000"}}})
    db.init_app(app)

    from server.userdata.userdata import userdata_bp
    app.register_blueprint(userdata_bp)

    with app.app_context():
        db.create_all()

    return app