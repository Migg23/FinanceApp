from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    name = db.Column(db.String(50), unique=False, nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(50), unique=False, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username