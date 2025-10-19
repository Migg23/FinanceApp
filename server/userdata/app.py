from flask import Flask, request, jsonify, redirect, url_for
from flask_cors import CORS
import mysql.connector
import requests
import creds


app = Flask(__name__)
CORS(app)

# --- MySQL connection setup ---
db_config_user = {
    "host": "localhost",
    "user": "root",          # your MySQL username (default is root)
    "password": "",          # your MySQL password (often empty in XAMPP)
    "database": "finance_user"
}

db_config_info = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "finance_info"
}

#region user login/register
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    try:
        conn = mysql.connector.connect(**db_config_user)
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


@app.route("/register", methods=['POST'])
def register():
    data = request.request_json()
    username = data.get("username")
    password = data.get("password")
    confirmpassword = data.get("confirmpasswoord")

    if password != confirmpassword:
        return jsonify({"status": "Passwords do not match"})

    try:
        conn = mysql.connector.connect(**db_config_user)
        cursor = conn.cursor(dictionary=True)

        cursor.execute("INSERT INTO user_information (username, password) VALUES (%s, %s)",
                    (username, password))
        mysql.connection.commit()

        return redirect(url_for('login'))

    finally:
            cursor.close()
            conn.close()
#endregion

@app.route("/user/data", methods=['POST'])
def get_user_info():
    data = request.request_json()
    username = data.get("username")

    try:
        conn = mysql.connector.connect(**db_config_info)
        cursor = conn.cursor(dictionary=True)

        cursor.excute("SELECT FROM * user_information WHERE username = %s", username)
        user = cursor.fetchone()

        return jsonify(user), 200
    
    finally:
        cursor.close()
        conn.close()


@app.route("/calculate", methods=['POST'])
def calculate():
    data = request.request_json()
    username = data.get("username")
    salary = float(data.get("salary"))
    rent = float(data.get("rent"))
    monthlyPay = float(data.get("monthlyPay"))

    monthlySalary = float(salary / 12)
    savings = float(salary * .10)
    food = float(salary * .12)
    fun = float(salary * .05)
    leftover = (monthlySalary - rent - monthlyPay - savings - food - fun)

    try:
        conn = mysql.connector.connect(**db_config_info)
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            UPDATE user_data
            SET monthlySalary = %s,
                       rent = %s,
                       monthlyPay = %s,
                       savings = %s,
                       food = %s,
                       fun = %s,
                       leftover = %s
            WHERE username = %s
        """, (salary, rent, monthlyPay, savings, food, fun, leftover, username))
        conn.commit()

    finally:
        cursor.close()
        conn.close()

@app.route("/user/recipes", methods=['POST'])
def get_recipes():
    data = request.get_json()
    query = data.get("query", "")      # e.g., "chicken pasta"
    ingredients = data.get("ingredients", "")  # optional: "chicken, cheese"

    recipes = search_recipes(query=query, ingredients=ingredients)
    return jsonify(recipes)

def search_recipes(query):
    url = f'https://api.spoonacular.com/recipes/complexsearch'
    params = {
        'apiKey': creds.api_key,
        'query': query,
        'number': 10,
        'instructionsRequred': True,
        'addRecipeInformation': True,
        'fillInIngredients': True
    }

    response = requests.get(url, params=params)

    if response.status_code == 200:
        return response.json().get('results', [])
    else:
        print(f"API error: {response.status_code}, {response.text}")
        return []


if __name__ == "__main__":
    app.run(debug=True)
