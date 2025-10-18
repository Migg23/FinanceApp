from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import json

app = Flask(__name__)
CORS(app)

# --- MySQL connection setup ---
db_config = {
    "host": "localhost",
    "user": "root",          # your MySQL username (default is root)
    "password": "",          # your MySQL password (often empty in XAMPP)
    "database": "finance_user"
}


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT username, password FROM user_information WHERE username = %s", (username,))
        user = cursor.fetchone()

        if not user:
            return jsonify({"status": "user not found"}), 404

        # plain-text password check for now
        if user["password"] == password:
            return jsonify({"status": "login successful", "user": {"username": username}}), 200
        else:
            return jsonify({"status": "invalid credentials"}), 401

    finally:
        cursor.close()
        conn.close()


if __name__ == "__main__":
    app.run(debug=True)
