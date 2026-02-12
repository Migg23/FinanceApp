from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from server.config import Config
from pymongo import MongoClient
from userdata import creds

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, resource={r"/*": {"origins": {"http://localhost:3000"}}})
    db.init_app(app)

    mongo_client = MongoClient(creds.MONGODB_URI)
    mongo_db = mongo_client[creds.MONGODB_DB]

    with app.app_context():
        print(mongo_db.list_collection_names())

    from server.userdata.userdata import userdata_bp
    app.register_blueprint(userdata_bp)

    with app.app_context():
        db.create_all()

    return app